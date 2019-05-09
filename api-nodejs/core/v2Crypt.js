const Argon2 = require('argon2')
const Crypto = require('crypto')
const { makeDateStamp } = require('./funcs')
const { refreshLifespan, tokenLifespan } = require('./config')

// INTERNAL FUNCTIONS
function genCrypto({ base = 'hex', bytes = 16 } = {}) {
	return Crypto.randomBytes(bytes).toString(base)
}
// END INTERNAL

// EXPORTED FUNCTIONS
async function encryptString(rawpw = '') {
	return await Argon2.hash(rawpw)
		.catch(err => {
			console.dir(err)
			return err
		})
}
function genToken(bytes = 48) {
	const newToken = {
		refresh_expires: makeDateStamp(refreshLifespan),
		session_expires: makeDateStamp(tokenLifespan),
	}
	await encryptString(genCrypto())
	.then(res => newToken.refresh_token = res)
	.catch(err => {throw new Error(err)})
	await encryptString(genCrypto())
	.then(res => newToken.session_token = res)
	.catch(err => {throw new Error(err)})

	return newToken
}
// END EXPORTED

module.exports = {
	genToken,
	encryptString,
}