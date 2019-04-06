const Argon2 = require('argon2')
const {
	findTokenInfo,
	deleteToken,
} = require('../core/db')
const {
	genToken,
	prepToken,
} = require('../core/crypt')
const {
	makeDateStamp,
	// cError,
	latob,
} = require('../core/funcs')
const {
	validationResult
} = require('express-validator/check')

// INTERNAL FUNCTIONS

// END INTERNAL

// EXPORTED FUNCTIONS
async function checkToken(req, res, next) {

	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })


	// if (/auth/.test(req.path)) next()
	const { authorization = '' } = req.headers
	const authArray = authorization.split(' ')
	if (authArray[0] != 'Bearer') {
		return res.status(401).send('Authorization Required')
	} 
	const decoded = latob(authArray[1]).split('.')
	console.log(decoded)
	if (!decoded[0] || !decoded[1] || !decoded[2]) {
		return res.status(401).send('Authentication Failed1')
	// 0 == user, 1 == r, 2 == s
	}
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
		console.dir(rows[i])
		console.dir(rows[i].session_token)
		console.dir(decoded[2])
		const session_token = rows[i].session_token.toString('utf8')
		const refresh_token = rows[i].refresh_token.toString('utf8')
		console.dir(session_token)
		sucStat = await Argon2.verify(session_token, decoded[2])
			.catch(err => {
				console.dir(err)
				throw new Error('Auth Error')
			})
		refStat = await Argon2.verify(refresh_token, decoded[1])
			.catch(err => {throw new Error('Auth Error')})
		if (sucStat && refStat) break
	}
	if (sucStat && refStat) {
		console.log(typeof rows[index].session_expires)
		console.log(typeof stamp)
		if (rows[index].session_expires > stamp) return next()
		if (rows[index].refresh_expires > stamp) {
			const replacementToken = genToken()
			replacementToken.user_id = parseInt(decoded[0])
			deleteToken(rows[index].session_token)
			.catch(err => {throw new Error(err)})
			return await prepToken(replacementToken)
			.then(out => {
				req.headers = req.headers || {}
				req.headers.authorization = out
				// res.set({
				// 	authorization: out
				// })
				return next()
			})
			.catch(err => {throw new Error(err)})
		}
		deleteToken(rows[index].session_token)
			.catch(err => {throw new Error(err)})
		return res.status(401).send('Authentication Failed2')
	}
	return res.status(401).send('Authentication Failed3')
}
// END EXPORT

module.exports = {
	checkToken
}