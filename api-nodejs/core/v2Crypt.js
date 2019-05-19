const Argon2 = require('argon2')
const Crypto = require('crypto')
const { makeDateStamp, lbtoa } = require('./funcs')
const { refreshLifespan, tokenLifespan } = require('./config')

// INTERNAL FUNCTIONS
function genCrypto({ base = 'hex', bytes = 16 } = {}) {
	return Crypto.randomBytes(bytes).toString(base)
}
async function genRawToken(bytes = 48) {
	const newToken = {
		refresh_expires: makeDateStamp(refreshLifespan),
		session_expires: makeDateStamp(tokenLifespan),
	}
	const src = {
		rTkn: genCrypto(),
		sTkn: genCrypto()
	}
	await encryptString(src.rTkn)
	.then(res => newToken.refresh_token = res)
	.catch(err => {throw new Error(err)})
	await encryptString(src.sTkn)
	.then(res => newToken.session_token = res)
	.catch(err => {throw new Error(err)})

	return {
		source: src,
		newToken
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
async function compareToCrypto(against = '', toCheck = '') {
	return await Argon2.verify(against, toCheck)
	.then(successStatus => {
		console.log('verify res:', successStatus)
		return successStatus
	})
	.catch(err => { 
		console.dir(err)
		throw new Error('CryptoError-01')
	})
}
function genFinalToken(id) {
	return genRawToken()
	.then(({source,newToken}) => {
		newToken.user_id = id
		return {
			forDB: newToken,
			token: lbtoa(`${id}.${source.rTkn}.${source.sTkn}`)
		}
	})
	.catch(err => console.dir(err))
}
// END EXPORTED

module.exports = {
	genFinalToken,
	encryptString,
	compareToCrypto,
}