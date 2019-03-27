const Argon2 = require('argon2')
const Crypto = require('crypto')
const { makeDateStamp, cError, lbtoa } = require('./funcs')
const { saveToken } = require('./db')
const { refreshLifespan, tokenLifespan } = require('./config')

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

async function prepToken(tkn) {
	const { refresh_token, session_token } = tkn
	tkn.refresh_token = encryptString(refresh_token)
	tkn.session_token = encryptString(session_token)
	const _ = await saveToken(tkn)
	.catch(err => {throw new Error(err)})
	const authString = `${tkn.user_id}.${refresh_token}.${session_token}`
	return `Bearer ${lbtoa(authString)}`
}

async function verifyLogin(against = '', toCheck = '') {
	verifyValues(against, toCheck)
	.then(res => {
		if (res) {
			return genToken()
		} else {
			return cError('Validation Failed')
		}
	})
	.catch(err => cError('Validation Error', err))
}

function genToken(bytes = 48) {
	const cryptoCfg = { bytes }
	return {
		refresh_token: genCrypto(cryptoCfg),
		refresh_expires: makeDateStamp(refreshLifespan),
		session_token: genCrypto(cryptoCfg),
		session_expires: makeDateStamp(tokenLifespan),
	}
}
// END EXPORTED

module.exports = {
	genToken,
	verifyLogin,
	prepToken,
	encryptString,
	prepToken,
}