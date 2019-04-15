const { check, param, validationResult } = require('express-validator/check')
const { encryptString } = require('../../core/crypt')
const DB = require('../../core/db')
const { minPWLength } = require('../../core/config')
const { sanitize } = require('../../core/funcs')

const cols = [
	'user_id',
	'full_name',
	'member_of',
	'email',
]
const tbl = 'USERS'

const saniValues = [
	'member_of',
	'username',
	'password',
	'full_name',
	'email'
]

//TODO verify everything works

const rootGet = {}
const useridGet = {}
const useridPut = {}
const orgidGet = {}
const orgidPost = {}

rootGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({ data: rows })
}

useridGet.validate = [
	param('userid').isInt(),
]

useridGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { userid } = req.params
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE user_id = ${userid}`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

useridPut.validate = [
	param('userid').isInt(),
	check('member_of').optional().isInt(),
	check('username').optional().isLength({
		min: 3
	}).trim().escape(),
	check('password').optional().isLength({
		min: minPWLength
	}).trim().escape(),
	check('cpassword').optional().custom((val, {
		req
	}) => {
		if (val !== req.body.password) {
			throw new Error('Password fields do not match')
		} else {
			return true
		}
	}).escape(),
	check('full_name').optional().isLength({
		min: 4
	}).trim().escape(),
	check('email').optional().isEmail().normalizeEmail()
]

useridPut.argon = (req, res, next) => {
	if (req.body.password) {
		encryptString(req.body.password)
		.then(res => {
			req.body.password = res
			return next()
		})
		.catch(err => {
			console.dir(err)
			res.status(403).send(JSON.stringify(err))
		})
	} else {
		return next()
	}
}

useridPut.func = async (req, res) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			const D = sanitize(req.body, saniValues)
			const toUpdate = makeUpdates(D)
			const { rows = [] } = await DB.query(`UPDATE ${tbl} SET ${toUpdate} WHERE user_id = ${req.params.userid} RETURNING *`)
			res.status(200).json({ data: rows[0] })
		} else {
			console.log('error')
			return res.status(422).json({
				errors: errors.array()
			})
		}
}

orgidGet.validate = [
	param('orgid').isInt(),
]

orgidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE member_of = ${req.params.orgid}`)
		res.status(200).json({ data: rows })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

orgidPost.validate = [
	param('orgid').isInt(), //.toInt(),
	check('username').isLength({
		min: 3
	}).trim().escape(),
	check('password').isLength({
		min: minPWLength
	}).trim().escape(),
	check('cpassword').custom((val, {
		req
	}) => {
		if (val !== req.body.password) {
			throw new Error('Password fields do not match')
		} else {
			return true
		}
	}).escape(),
	check('full_name').isLength({
		min: 4
	}).trim().escape(),
	check('email').isEmail().normalizeEmail(),
]

orgidPost.argon = (req, res, next) => {
	encryptString(req.body.password)
		.then(res => {
			req.body.password = res
			return next()
		})
		.catch(err => {
			console.dir(err)
			res.status(403).send(JSON.stringify(err))
		})
}

orgidPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		console.log('pass')
		const D = sanitize(req.body, saniValues) 
		D.member_of = req.params.orgid
		const sql = {
			tbl,
			data: D
		}
		const { rows = [] } = await DB.doInsert(sql)
		res.status(200).json({ data: rows })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

// FUNCTIONS


// EXPORT ROUTES
module.exports = {
	rootGet,
	useridGet,
	useridPut,
	orgidGet,
	orgidPost,
}