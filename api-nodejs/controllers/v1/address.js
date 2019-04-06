const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')
const { makeOptionals } = require('../../core/funcs')

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

const rootGet = {}
const orgGet = {}
const orgPost = {}
const aidGet = {}
const aidPut = {}

rootGet.func = async (req, res) => {
	const {
		rows
	} = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({
		data: rows
	})
}

orgGet.validate = [
	param('orgid').isInt(),
]

orgGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			rows
		} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.orgid}'`)
		res.status(200).json({
			data: rows
		})
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
	check('location_type').trim().escape(),
	check('location_name').trim().escape(),
	check('street').trim().escape(),
	check('line_2').optional().trim().escape(),
	check('city').trim().escape(),
	check('state').isLength({
	min: 2,
	max: 2
}).trim().escape(),
	check('zip_base5').isLength({
	min: 5,
	max: 5
}).trim().escape(),
	check('zip_plus4').optional().isLength({
	min: 4,
	max: 4
}).trim().escape(),
]

orgPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { primary_site, location_type, location_name, street, line_2, city, state, zip_base5, zip_plus4 = 'xxxx' } = req.body
		const {
			rows
		} = await DB.query({text:`INSERT INTO ${tbl} (provider_id, primary_site, location_type, location_name, street, line_2, city, state, zip_code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`, values:[
			req.params.orgid,
			primary_site,
			location_type,
			location_name,
			street,
			line_2,
			city,
			state,
			`${zip_base5}-${zip_plus4}`
		]})
		res.status(200).json({
			rows
		})
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
		const {
			rows
		} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE address_id = '${req.params.aid}'`)
		res.status(200).json({
			data: rows
		})
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
		const { primary_site, location_type, location_name, street, line_2, city, state, zip_base5, zip_plus4 = 'xxxx' } = req.body

		const toUpdate = makeOptionals([
			['bool','primary_site',primary_site],
			['str','location_type',location_type],
			['str','location_name',location_name],
			['str','street',street],
			['str','line_2',line_2],
			['str','city',city],
			['str','state',state],
			['str','zip_code',`${zip_base5}-${zip_plus4}`],
		])

		const {
			rows
		} = await DB.query(`INSERT INTO ${tbl} SET ${toUpdate} WHERE address_id = ${aid} RETURNING *`)
		res.status(200).json({
			rows
		})
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