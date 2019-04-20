const Argon2 = require('argon2')
const { findTokenInfo, deleteToken } = require('../core/db')
const { genToken, prepToken } = require('../core/crypt')
const { makeDateStamp, latob } = require('../core/funcs')
const { validationResult } = require('express-validator/check')

// INTERNAL FUNCTIONS

// END INTERNAL

// EXPORTED FUNCTIONS
async function checkToken(req, res, next) {

	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

	console.dir(req.signedCookies.ghSession)
	res.cookie('ghSession', 'testing', { signed: true })


	// if (/auth/.test(req.path)) next()
	const { ghSession = '' } = req.signedCookies
	// const authArray = ghSession.split(' ')
	if (!ghSession) return res.status(401).json({ errors: 'Authorization Required' })
	const decoded = latob(ghSession).split('.')
	// console.log(decoded)
	if (decoded[0].length != 3) return res.status(401).json({ errors: 'Invalid Auth Token' })
	const stamp = makeDateStamp()

	const searchObject = {
		user: decoded[0],
		type: 'refresh_expires',
		cols: [
			'user_id',
			'refresh_token',
			'refresh_expires',
			'session_token',
			'session_expires'
		],
		stamp
	}

	const { rows = [] } = await findTokenInfo(searchObject)
	.catch(err => {throw new Error(err)})

	let sucStat, refStat, index
	for (let i = 0; i < rows.length; i++) {
		index = i
		// console.dir(rows[i])
		// console.dir(rows[i].session_token)
		// console.dir(decoded[2])
		const session_token = rows[i].session_token.toString('utf8')
		const refresh_token = rows[i].refresh_token.toString('utf8')
		// console.dir(session_token)
		sucStat = await Argon2.verify(session_token, decoded[2])
			.catch(err => {
				// console.dir(err)
				throw new Error('Auth Error')
			})
		refStat = await Argon2.verify(refresh_token, decoded[1])
			.catch(err => {throw new Error('Auth Error')})
		if (sucStat && refStat) break
	}
	if (sucStat && refStat) {
		// console.log(typeof rows[index].session_expires)
		// console.log(typeof stamp)
		if (rows[index].session_expires > stamp) return next()
		if (rows[index].refresh_expires > stamp) {
			const replacementToken = genToken()
			replacementToken.user_id = parseInt(decoded[0])
			deleteToken(rows[index].session_token)
			.catch(err => {throw new Error(err)})
			return await prepToken(replacementToken)
			.then(out => {
				res.cookie('ghSession', out, { signed: true })
				// req.headers = req.headers || {}
				// req.headers.authorization = out

				return next()
			})
			.catch(err => {throw new Error(err)})
		}
		deleteToken(rows[index].session_token)
			.catch(err => {throw new Error(err)})
		return res.status(401).send({ errors: 'Expired Token' })
	}
	return res.status(401).send({ errors: 'Authentication Failed' })
}
// END EXPORT

module.exports = {
	checkToken
}