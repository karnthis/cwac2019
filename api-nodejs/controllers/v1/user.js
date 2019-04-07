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
const orgidPut = {}

rootGet.func = async (req, res) => {
	const {
		rows
	} = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({
		data: rows
	})
}

useridGet.validate = [
	param('userid').isInt(),
]

useridGet.func = async (req, res) => {
	//TODO
	const {
		userid,
	} = req.params
	const sql = {
		cols,
		tbl,
		data: {
			user_id: userid
		}
	}
	const {
		rows
	} = await DB.doSelect(sql)
	res.status(200).json({
		data: rows
	})
}

useridPut.validate = [
	param('userid').isInt()
]

useridPut.func = async (req, res) => {
	//TODO
	res.status(403).send('Under Construction')
}

orgidGet.validate = [
	param('orgid').isInt(),
]

orgidGet.func = async (req, res) => {
	//TODO	confirm done
	const {
		orgid,
		userid
	} = req.params
	const sql = {
		cols,
		tbl,
		data: {
			member_of: orgid
		}
	}
	const {
		rows
	} = await DB.doSelect(sql)
	res.status(200).json({
		data: rows
	})
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
		const { rows } = await DB.doInsert(sql)
		res.status(200).json({ data: rows })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

orgidPut.validate = [
	param('userid').isInt()
]

orgidPut.func = async (req, res) => {
	//TODO
	res.status(403).send('Under Construction')
}

// FUNCTIONS


// EXPORT ROUTES
module.exports = {
	rootGet,
	useridGet,
	useridPut,
	orgidGet,
	orgidPost,
	orgidPut,
}