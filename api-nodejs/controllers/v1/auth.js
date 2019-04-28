const {
	check,
	validationResult
} = require('express-validator/check')
const { query, saveToken } = require('../../core/db')
const { minPWLength } = require('../../core/config')
const { verifyLogin, prepToken } = require('../../core/crypt')

const rootPost = {}

rootPost.validate = [
	check('username').isLength({
		min: 3
	}).trim().escape(),
	check('password').isLength({
		min: minPWLength
	}).trim().escape(),
]

rootPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { username, password } = req.body
		console.dir(username)
		sql = `SELECT user_id, password FROM USERS WHERE username = '${username}'`
		const { rows = [] } = await query(sql)
		// console.dir(rows)
		if (!rows.length) return res.status(401).json({ errors: 'Auth Error 7' })

		const tmp = rows[0].password.toString('utf-8')
		const tkn = await verifyLogin(tmp, password)
		.catch(err => {throw new Error(err)})
		// console.dir(tkn)
		tkn.user_id = rows[0].user_id
		const authToken = await prepToken(tkn)
		.catch(err => {throw new Error(err)})

		res.cookie('ghSession', authToken, { signed: true });
		// res.set({
		// 	authorization: authHeader
		// })

		res.status(200).json({data: [rows[0].user_id], msg: 'Authentication Successful'})
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