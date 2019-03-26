const Argon2 = require('argon2')
const Crypto = require('crypto')
const DB = require('../core/db')
const { makeDateStamp } = require('../core/funcs')

// INTERAL FUNCTIONS
function cError(txt = '', err = null) {
	return new Error({msg: txt, err})
}

function genCrypto({ base = 'base64', bytes = 48 } = {}) {
	return Crypto.randomBytes(48).toString('hex')
}



	function generateToken({ stringBase = 'base64', byteLength = 48 } = {}) {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(byteLength, (err, buffer) => {
				if (err) {
					reject(err);
				} else {
					resolve(buffer.toString(stringBase));
				}
			});
		});
	}
	
}

function issueToken() {
	//todo
	DB.saveToken({
		refresh_token: genCrypto(),
		refresh_expires: makeDateStamp(36),
		session_token: genCrypto(),
		session_expires: makeDateStamp(1),
	})
	return ret
}



// EXPORTED FUNCTIONS

async function verifyToken(tkn = '', uid = 0, uName = '') {
	const sql = {
		tkn
	}

	const { rows } = await DB.findToken(sql)
	if (!rows.length) {
		throw new Error('Invalid Token')
	} else {
		for (const i in rows) {

		}
	}
}

async function encryptString(rawpw = '') {
	return await Argon2.hash(rawpw)
}

async function verifyLogin(against = '', toCheck = '') {
	if (!toCheck.length || !against.length) {
		throw cError('2 Arguments Required')
	} else {
		Argon2.verify(against, toCheck)
			.then(success => {
				if (success) {
					const tkn = issueToken()
					return {msg: 'Auth Sucessful', tkn}
				} else {
					throw cError('Auth Failed')
				}
			})
			.catch(err => { 
				throw cError('Auth Error', err)
			})
	}
}

module.exports = {
	generateToken,
	verifyLogin,
	encryptString,
}