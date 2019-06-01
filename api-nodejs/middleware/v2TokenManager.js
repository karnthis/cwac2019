const Argon2 = require('argon2')
const { selectQuery, openQuery, insertQuery } = require('../core/v2DB')
const { genFinalToken, compareToCrypto } = require('../core/v2Crypt')
const { makeDateStamp, latob, lbtoa } = require('../core/funcs')

// INTERNAL FUNCTIONS

// END INTERNAL

// EXPORTED FUNCTIONS
async function userFromToken(req, res, next) {
	req.myId = parseInt(latob(req.signedCookies.ghSession).split('.')[0])
	next()
}
async function orgFromUser(req, res, next) {
	selectQuery({
		columns: 'member_of',
		tbl: `USERS`,
		where: `WHERE user_id = '${req.myId}'`
	})
	.then(({rows}) => {
		if (rows.length) {
			req.myOrg = parseInt(rows[0].member_of)
		}
		next()
	})
}
async function checkToken(req, res, next) {
	// console.dir(req.signedCookies.ghSession)
	const { ghSession } = req.signedCookies

	if (!ghSession) {
		return res.status(401).json({ errors: 'Authorization Required' })
	}
	const decodedSplitSession = latob(ghSession).split('.')
	if (decodedSplitSession.length != 3) {
		return res.status(401).json({ errors: 'Invalid Token' })
	}
	const [uID, refreshTkn, sessionTkn] = decodedSplitSession
	const dateStamp = makeDateStamp()

	const tokenUser = (isNaN(parseInt(uID))) ? -1 : parseInt(uID)
	console.dir(tokenUser)
	const tokenCheck = {
		tbl: 'USER_SESSIONS',
		where: `WHERE user_id = '${tokenUser}' AND refresh_expires > '${dateStamp}'`
	}
	const { rows } = await selectQuery(tokenCheck)
	.catch(err => {console.dir(err)})
	// console.dir(resp)

	if (!rows.length) return res.status(401).json({ errors: 'Invalid Token' })


	for (const row of rows) {
		const { session_token, session_expires, refresh_token, refresh_expires } = row
		if (session_expires > dateStamp) {
			const isGoodSession = await compareToCrypto(session_token.toString('utf8'), sessionTkn)
			.catch(err => {throw new Error(err)})
			
			if (isGoodSession) {
				req.myUser_id = uID
				return next()
			}
		} else {
			const isGoodRefresh = await Argon2.verify(refresh_token.toString('utf8'), refreshTkn)
			.catch(err => {throw new Error(err)})

			if (isGoodRefresh) {
				const tokenSet = genFinalToken(uID)
				openQuery(`DELETE FROM USER_SESSIONS WHERE refresh_token = ${refreshTkn}`)
				.catch(err => {throw new Error(err)})

				const _ = await insertQuery({
					tbl: 'USER_SESSIONS',
					data: tokenSet.forDB
				})
				.catch(err => {throw new Error(err)})

				res.cookie('ghSession', tokenSet.token, { signed: true })
				req.myUser_id = uID
				return next()
			}
		}
	}
	return res.status(403).json({
		errors: 'No Match Found'
	})
}
// END EXPORT

module.exports = {
	checkToken,
	userFromToken,
	orgFromUser
}