const Router = require('express-promise-router')
const {
	check,
	validationResult
} = require('express-validator/check')
const Argon2 = require('argon2')
const DB = require('../../db')
const expRtr = new Router()

const tbl = 'USERS'

expRtr.route('/')
	//*	done
	.get([], async (req, res) => {
		res.status(403).send('Not Supported')
	})
	//*	done
	.post([
		check('login').isLength({
			min: 3
		}).trim().escape(),
		check('password').isLength({
			min: 8
		}).trim().escape(),
	], async (req, res) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			const {
				login,
				password
			} = req.body
			sql = `SELECT password FROM ${tbl} WHERE username = '${login}' OR email = '${login}'`
			const {
				rowCount,
				rows
			} = await DB.query(sql)
			console.dir(rowCount)
			for (const row in rows) {
				const tmp = rows[row].password.toString('utf-8')
				Argon2.verify(tmp, password)
					.then(success => {
						console.log('then rt')
						console.log(success)
						if (success) {
							res.status(200).json({
								data: 'Auth Successful'
							})
						} else {
							res.status(201).json({
								data: 'Auth Failed'
							})
						}

					})
					.catch(err => {
						console.log('catch rt')
						console.log(err)
						res.status(400).json({
							data: 'Auth Error',
							err
						})
					})
			}
		} else {
			console.log('error')
			return res.status(422).json({
				errors: errors.array()
			})
		}
	})
	//*	done
	.put([], async (req, res) => {
		res.status(403).send('Not Supported')
	})

// EXPORT ROUTES
module.exports = expRtr