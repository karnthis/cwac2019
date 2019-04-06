const { check, param, validationResult } = require('express-validator/check')
const { encryptString } = require('../../core/crypt')
const DB = require('../../core/db')
const { minPWLength } = require('../../core/config')

const cols = [
	'user_id',
	'full_name',
	'member_of',
	'email',
]
const tbl = 'USERS'

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
	console.log(sql)
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
	console.log(sql)
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
	console.dir(req.body.password)
	encryptString(req.body.password)
		.then(res => {
			req.body.password = res
			console.dir(req.body.password)
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
		const {
			username,
			password,
			full_name,
			email,
		} = req.body
		const sql = {
			tbl,
			data: {
				member_of: req.params.orgid,
				username,
				password,
				full_name,
				email,
			}
		}
		const {
			rows
		} = await DB.doInsert(sql)
		res.status(200).json({
			rows: rows
		})
		// res.status(200).json({ rows: 'hit' })
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