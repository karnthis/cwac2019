const {
	findTokenInfo,
	saveToken,
	deleteToken,
} = require('../core/db')
const {
	genToken,
} = require('../core/crypt')
const {
	makeDateStamp,
	lbtoa,
	latob,
} = require('../core/funcs')

// INTERNAL FUNCTIONS
async function prepToken(tkn) {
	const _ = await saveToken(tkn)
	.catch(err => {throw new Error(err)})
	const authString = `${tkn.user_id}.${tkn.refresh_token}.${tkn.session_token}`
	return `Bearer ${lbtoa(authString)}`
}
// END INTERNAL

// EXPORTED FUNCTIONS
async function checkToken(req, res, next) {
	if (/auth/.test(req.path)) next()
	const { authorization = '' } = req.headers
	const authArray = authorization.split(' ')
	if (authArray[0] != 'Bearer') res.status(401).send('Authorization Required')
	const decoded = latob(authArray[1]).split('.')
	// 0 == user, 1 == r, 2 == s
	
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

	const { rows } = await findTokenInfo(searchObject)

	let sucStat, refStat
	for (const i = 0; i < rows.length; i++) {
		sucStat = await Argon2.verify(rows[i].session_token, decoded[2])
			.catch(err => {throw new Error('Auth Error')})
			refStat = await Argon2.verify(rows[i].refresh_token, decoded[1])
			.catch(err => {throw new Error('Auth Error')})
		if (sucStat && refStat) break
	}
	if (sucStat && refStat) {
		if (rows[i].session_expires > stamp) next()
		if (rows[i].refresh_expires > stamp) {
			const replacementToken = genToken()
			replacementToken.user_id = decoded[0]
			deleteToken(rows[i].session_token)
			.catch(err => {throw new Error(err)})
			prepToken(replacementToken)
			.then(out => {
				req.headers.authorization = out
				next()
			})
			.catch(err => {throw new Error(err)})
		}
		res.status(401).send('Authentication Failed')
	}
	res.status(401).send('Authentication Failed')
}
// END EXPORT

module.exports = {
	checkToken
}