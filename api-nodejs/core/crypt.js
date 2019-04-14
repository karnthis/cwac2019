const Argon2 = require('argon2')
const Crypto = require('crypto')
const { makeDateStamp, cError, lbtoa } = require('./funcs')
const { saveToken } = require('./db')
const { refreshLifespan, tokenLifespan } = require('./config')

// INTERNAL FUNCTIONS
function genCrypto({ base = 'hex', bytes = 16 } = {}) {
	return Crypto.randomBytes(bytes).toString(base)
}

async function verifyValues(against = '', toCheck = '') {
	if (!toCheck.length || !against.length) {
		throw cError('2 Arguments Required')
	} else {
		return await Argon2.verify(against, toCheck)
			.then(successStatus => {
				console.log('verify res:', successStatus)
				return successStatus
			})
			.catch(err => { 
				console.dir(err)
				throw cError('Auth Error', err)
			})
	}
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

async function prepToken(tkn) {
	const { refresh_token, session_token } = tkn
	await encryptString(refresh_token)
	.then(res => tkn.refresh_token = res)
	await encryptString(session_token)
	.then(res => tkn.session_token = res)
	const _ = await saveToken(tkn)
	.catch(err => {throw new Error(err)})

	return lbtoa(`${tkn.user_id}.${refresh_token}.${session_token}`)

	// const authString = `${tkn.user_id}.${refresh_token}.${session_token}`
	// return `Bearer ${lbtoa(authString)}`
}

async function verifyLogin(against = '', toCheck = '') {
	return await verifyValues(against, toCheck)
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
	// const cryptoCfg = { bytes }
	return {
		refresh_token: genCrypto(),
		refresh_expires: makeDateStamp(refreshLifespan),
		session_token: genCrypto(),
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