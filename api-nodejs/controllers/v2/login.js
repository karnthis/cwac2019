const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/v2DB')
const { minPWLength } = require('../../core/config')
const { sanitize, makeUpdates } = require('../../core/funcs')
const { compareToCrypto, genFinalToken } = require('../../core/v2Crypt')

// FUNCTIONS

const validate = [
	check('username').isLength({
		min: 3
	}).trim().escape(),
	check('password').isLength({
		min: minPWLength
	}).trim().escape(),
]

function routeFunction(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { username, password } = req.body
		DB.selectQuery({
			columns: 'user_id, password',
			tbl: `USERS`,
			where: `WHERE username = '${username}'`
		})
		.then(resp => {
			const { rows } = resp
			if (rows && rows.length) {
				if ((rows[0].password && rows[0].password.length)||(rows[0].user_id && rows[0].user_id.length)) {
					const pulledPassword = rows[0].password.toString('utf-8')
					compareToCrypto(pulledPassword, password)
					.then(val => {
						if (val) {
							genFinalToken(rows[0].user_id)
							.then(async ({token, forDB}) => {
								const inserted = await DB.insertQuery({
									data: forDB,
									tbl: 'USER_SESSIONS'
								})
								res.cookie('ghSession', token, { signed: true })
								res.status(200).json({data: [rows[0].user_id], msg: 'Authentication Successful'})
							})
						} else {
							console.log('Error-04')
							return res.status(401).json({ errors: 'Invalid Login' })
						}
					})
				} else {
					console.log('Error-03')
					// no password or no user_id returned
				}
			} else {
				return res.status(401).json({ errors: 'Error-02' })
			}
		})
		// console.dir(rows)
		
	} else {
		console.log('Error-01')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

// EXPORT
module.exports = {
	rootPost: {
		validate,
		routeFunction
	}
}