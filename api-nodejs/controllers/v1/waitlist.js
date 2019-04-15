const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')
const { sanitize, makeUpdates } = require('../../core/funcs')

const cols = [
	'waitlist_id',
	'provider_id',
	'creator_id',
	'date_of_waitlist',
	'eligiable_for',
	'waitlist_status',
	]
const tbl = 'WAITLIST'

const saniValues = [
	'waitlist_id',
	'provider_id',
	'creator_id',
	'date_of_waitlist',
	'eligiable_for',
	'waitlist_status',
]

const rootGet = {}
const wlidGet = {}
const wlidPut = {}
const orgidGet = {}
const orgidPost = {}

rootGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({ data: rows })
}

wlidGet.validate = [
	param('waitid').isInt(),
]

wlidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE waitlist_id = ${req.params.waitid}`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

wlidPut.validate = [
	param('waitid').isInt(),
	check('provider_id').optional().isInt(),
	check('creator_id').optional().isEmpty(),
	check('date_of_waitlist').optional().isInt(),
	check('eligiable_for').optional().trim().escape(),
	check('waitlist_status').optional().trim().escape(),
]

wlidPut.func = async (req, res)=> {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const D = sanitize(req.body, saniValues)
		const toUpdate = makeUpdates(D)
		const { rows = [] } = await DB.query(`UPDATE ${tbl} SET ${toUpdate} WHERE class_id = ${req.params.cid} RETURNING *`)
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
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = ${req.params.orgid}`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

orgidPost.validate = [
	param('orgid').isInt(),
	check('creator_id').isInt(),
	check('date_of_waitlist').isInt(),
	check('eligiable_for').trim().escape(),
	check('waitlist_status').optional().isEmpty(),
]

orgidPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const D = sanitize(req.body, saniValues)
		D.provider_id = req.params.orgid
		const sql = { tbl, data: D }
		const { rows = [] } = await DB.doInsert(sql)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}


// FUNCTIONS

// EXPORT ROUTES
module.exports = {
	rootGet,
	wlidGet,
	wlidPut,
	orgidGet,
	orgidPost,
}