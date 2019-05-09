const Argon2 = require('argon2')
const { selectQuery, openQuery, insertQuery } = require('../core/db')
const { genToken } = require('../core/crypt')
const { makeDateStamp, latob, lbtoa } = require('../core/funcs')

// INTERNAL FUNCTIONS

// END INTERNAL

// EXPORTED FUNCTIONS
async function checkToken(req, res, next) {
	console.dir(req.signedCookies.ghSession)
	const { ghSession = '' } = req.signedCookies

	if (!ghSession) {
		return res.status(401).json({ errors: 'Authorization Required' })
	}
	const decodedSplitSession = latob(ghSession).split('.')
	if (decodedSplitSession.length != 3) {
		return res.status(401).json({ errors: 'Invalid Token' })
	}
	const dateStamp = makeDateStamp()

	const tokenCheck = {
		tbl: 'USER_SESSIONS',
		where: 	[
			'WHERE user_id =',
			decodedSplitSession[0],
			'AND refresh_expires >',
			dateStamp
		].join(' ')
	}
	const { rows = [] } = await selectQuery(tokenCheck)
	.catch(err => {throw new Error(err)})
	if (rows.length == 0) return res.status(401).json({ errors: 'Invalid Token' })

	const [uID, refreshTkn, sessionTkn] = decodedSplitSession

	if (rows.length == 1) {
		const { session_token, session_expires, refresh_token } = rows[0]
		if (session_expires > dateStamp) {
			const isGoodSession = await Argon2.verify(session_token.toString('utf8'), sessionTkn)
			.catch(err => {throw new Error(err)})
			
			if (isGoodSession) return next()
		} else {
			const isGoodRefresh = await Argon2.verify(refresh_token.toString('utf8'), refreshTkn)
			.catch(err => {throw new Error(err)})

			if (isGoodRefresh) {
				const {refresh_token, refresh_expires, session_token,session_expires} = genToken()
				const newToken = lbtoa(`${uID}.${refresh_token}.${session_token}`)

				openQuery(`DELETE FROM USER_SESSIONS WHERE refresh_token = ${refreshTkn}`)
				.catch(err => {throw new Error(err)})

				const _ = await insertQuery({
					tbl: 'USER_SESSIONS',
					data: {
						user_id: uID,
						refresh_token,
						refresh_expires,
						session_token,
						session_expires,
					}
				})
				.catch(err => {throw new Error(err)})

				res.cookie('ghSession', newToken, { signed: true })
				return next()
			}
		}
	} else {
		return res.status(403).json({
			errors: 'Multiple Sessions Not Supported'
		})
	}
}
// END EXPORT

module.exports = {
	checkToken
}