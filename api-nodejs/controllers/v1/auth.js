const {
	check,
	validationResult
} = require('express-validator/check')
const { query, saveToken } = require('../../core/db')
const { minPWLength } = require('../../core/config')
const { verifyLogin, prepToken } = require('../../core/crypt')

const rootPost = {}

rootPost.validate = [
	check('login').isLength({
		min: 3
	}).trim().escape(),
	check('password').isLength({
		min: minPWLength
	}).trim().escape(),
]

rootPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			login,
			password
		} = req.body
		console.dir(login)
		sql = `SELECT user_id, password FROM USERS WHERE username = '${login}'`
		const {
			rows
		} = await query(sql)
		// console.dir(rows)
		const tmp = rows[0].password.toString('utf-8')
		const tkn = await verifyLogin(tmp, password)
		.catch(err => {throw new Error(err)})
		// console.dir(tkn)
		tkn.user_id = rows[0].user_id
		const authHeader = await prepToken(tkn)
		.catch(err => {throw new Error(err)})

		res.set({
			authorization: authHeader
		})

		// res.headers.authorization = authHeader
		res.status(200).send('Authentication Successful')
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}}

// EXPORT ROUTES
module.exports = {
	rootPost
}