const Argon2 = require('argon2')
const Crypto = require('crypto')
const { makeDateStamp, cError } = require('./funcs')

// INTERNAL FUNCTIONS
function genCrypto({ base = 'hex', bytes = 48 } = {}) {
	return Crypto.randomBytes(bytes).toString(base)
}

async function verifyValues(against = '', toCheck = '') {
	if (!toCheck.length || !against.length) {
		throw cError('2 Arguments Required')
	} else {
		return await Argon2.verify(against, toCheck)
			.then(successStatus => {
				return successStatus
			})
			.catch(err => { 
				throw cError('Auth Error', err)
			})
	}
}
// END INTERNAL

// EXPORTED FUNCTIONS
async function encryptString(rawpw = '') {
	return await Argon2.hash(rawpw)
}

async function verifyLogin(against = '', toCheck = '') {
	verifyValues(against, toCheck)
	.then(res => {
		if (res) {
			return issueToken()
		} else {
			return cError('Validation Failed')
		}
	})
	.catch(err = err)
}

function genToken(bytes = 48) {
	const cryptoCfg = { bytes }
	return {
		refresh_token: genCrypto(cryptoCfg),
		refresh_expires: makeDateStamp(36),
		session_token: genCrypto(cryptoCfg),
		session_expires: makeDateStamp(1),
	}
}
// END EXPORTED

module.exports = {
	genToken,
	verifyLogin,
	// verifyToken,
	encryptString,
}