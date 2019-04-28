const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')
const { makeDateStamp, sanitize, makeUpdates } = require('../../core/funcs')

const cols = [
	'class_id',
	'provider_id',
	'creator_id',
	'class_name',
	'class_description',
	'address_id',
	'date_of_class',
	'time_of_class',
	'current_attendee_count',
	'max_attendees',
	'class_status',
]
const tbl = 'CLASSES'

const saniValues = [
	'creator_id',
	'provider_id',
	'address_id',
	'class_name',
	'class_description',
	'date_of_class',
	'time_of_class',
	'current_attendee_count',
	'max_attendees',
	'class_status',
]

const rootGet = {}
const statusGet = {}
const cidGet = {}
const cidPut = {}
const aidGet = {}
const orgidGet = {}
const orgidPost = {}

rootGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({ data: rows })
}

statusGet.validate = [
	param('stat').isInt(),
]

statusGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE class_status = "${req.param.stat}"`)
	res.status(200).json({ data: rows })
}

//	TODO	clean this shit up
// BASE FUNC
orgidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}
// END BASE FUNC

cidGet.validate = [
	param('cid').isInt(),
]

cidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE class_id = '${req.params.cid}'`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

cidPut.validate = [
	param('cid').isInt(),
	check('creator_id').optional().isEmpty(),
	check('provider_id').optional().isInt(),
	check('address_id').optional().isInt(),
	check('class_name').optional().trim().escape(),
	check('class_description').optional().trim().escape(),
	check('date_of_class').optional().isInt(),
	check('time_of_class').optional().trim().escape(),
	check('current_attendee_count').optional().isInt({ min: 0, max: 99 }),
	check('max_attendees').optional().isInt({ min: 1, max: 99 }),
	check('class_status').optional().trim().escape()
]

cidPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const D = sanitize(req.body, saniValues)
		const toUpdate = makeUpdates(D)
		const { rows = [] } = await DB.query(`UPDATE ${tbl} SET ${toUpdate} WHERE class_id = ${req.params.cid} RETURNING *`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

aidGet.validate = [
	param('aid').isInt(),
]

aidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE address_id = '${req.params.aid}'`)
		res.status(200).json({ data: rows })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

orgidGet.validate = [
	param('orgid').isInt(),
]

orgidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.orgid}'`)
		res.status(200).json({ data: rows })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

orgidPost.validate = [
	param('cid').isInt(),
	check('creator_id').isInt(),
	check('provider_id').isInt(),
	check('address_id').isInt(),
	check('class_name').trim().escape(),
	check('class_description').optional().trim().escape(),
	check('date_of_class').isInt(),
	check('time_of_class').trim().escape(),
	check('current_attendee_count').optional().isInt({ min: 0, max: 99 }),
	check('max_attendees').optional().isInt({ min: 1, max: 99 }),
	check('class_status').trim().escape()
]

orgidPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const D = sanitize(req.body, saniValues)
		D.provider_id = req.params.orgid
		const sql = {
			tbl,
			data: D
		}
		const { rows = [] } = await DB.doInsert(sql)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

// EXPORT ROUTES
module.exports = {
	rootGet,
	statusGet,
	cidGet,
	cidPut,
	aidGet,
	orgidGet,
	orgidPost,
}