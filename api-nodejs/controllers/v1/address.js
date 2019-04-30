const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')
const { sanitize, makeUpdates } = require('../../core/funcs')

const cols = [
	'address_id',
	'provider_id',
	'primary_site',
	'location_type',
	'location_name',
	'street',
	'line_2',
	'city',
	'state',
	'zip_code',
	]
const tbl = 'ADDRESSES'

const saniValues = [
	'primary_site',
	'location_type',
	'location_name',
	'street',
	'line_2',
	'city',
	'state',
]

const rootGet = {}
const orgGet = {}
const orgPost = {}
const aidGet = {}
const aidPut = {}

rootGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({ data: rows })
}

orgGet.validate = [
	param('orgid').isInt(),
]

orgGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.orgid}'`)
		res.status(200).json({ data: rows })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

orgPost.validate = [
	param('orgid').isInt(),
	check('primary_site').isBoolean(),
	check('location_type').optional().trim().escape(),
	check('location_name').optional().trim().escape(),
	check('street').trim().escape(),
	check('line_2').optional().trim().escape(),
	check('city').trim().escape(),
	check('state').optional().isLength({
	min: 2,
	max: 2
}).trim().escape(),
	check('zip_base5').isInt().isLength({
	min: 5,
	max: 5
}),
	check('zip_plus4').optional().isInt().isLength({
	min: 4,
	max: 4
})
]

orgPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { zip_base5, zip_plus4 = 'xxxx' } = req.body
		const D = sanitize(req.body, saniValues)
		D.zip_code = `${zip_base5}-${zip_plus4}`
		D.provider_id = req.params.orgid
		const sql = {
			tbl,
			data: D
		}
		const { rows = [] } = await DB.doInsert(sql)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

aidGet.validate = [
	param('aid').isInt(),
]

aidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE address_id = ${req.params.aid}`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

aidPut.validate = [
	param('aid').isInt(),
	check('primary_site').optional().isBoolean(),
	check('location_type').optional().trim().escape(),
	check('location_name').optional().trim().escape(),
	check('street').optional().trim().escape(),
	check('line_2').optional().trim().escape(),
	check('city').optional().trim().escape(),
	check('state').optional().isLength({
	min: 2,
	max: 2
}).trim().escape(),
	check('zip_base5').optional().isLength({
	min: 5,
	max: 5
}).trim().escape(),
	check('zip_plus4').optional().isLength({
	min: 4,
	max: 4
}).trim().escape(),
]

aidPut.func = async (req, res)=> {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

		const { zip_base5, zip_plus4 = 'xxxx' } = req.body
		const D = sanitize(req.body, saniValues)
		if (zip_base5) D.zip_code = `${zip_base5}-${zip_plus4}`
		const toUpdate = makeUpdates(D)

		const { rows = [] } = await DB.query(`UPDATE ${tbl} SET ${toUpdate} WHERE address_id = ${req.params.aid} RETURNING *`)
		res.status(200).json({ data: rows[0] })
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
	orgGet,
	orgPost,
	aidGet,
	aidPut,
}