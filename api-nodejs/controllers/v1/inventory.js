const {
	check,
	param,
	validationResult
} = require('express-validator/check')
const DB = require('../../core/db')
const { sanitize, makeUpdates } = require('../../core/funcs')

//*	done
const cols = [
	'inv_id',
	'provider_id',
	'inv_count',
	'inv_type',
]

const tbl = 'INVENTORY'

const saniValues = [
	'provider_id',
	'inv_count',
	'inv_type',
]

const rootGet = {}
const rootPost = {}
const dispense = {}
const inv_idGet = {}
const inv_idPut = {}
const orgidGet = {}
const orgidPut = {}

rootGet.func = async (req, res) => {
	const {
		rows
	} = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({ data: rows })
}

rootPost.validate = [
	check('provider_id').isInt(),
	check('inv_count').isInt(),
	check('inv_type').optional().trim().escape(),
]

rootPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const D = sanitize(req.body, saniValues)
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

dispense.validate = [
	param('inv_id').isInt(),
]

dispense.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		let sql = `UPDATE ${tbl} SET inv_count = inv_count - 1 WHERE inv_id = ${req.params.inv_id} RETURNING *`
		const { rows = [] } = await DB.query(sql)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

inv_idGet.validate = [
	param('inv_id').isInt(),
]

inv_idGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			rows
		} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE inv_id = ${req.params.inv_id}`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

inv_idPut.validate = [
	param('inv_id').isInt(),
	check('inv_count').isInt({
		min: 0,
		max: 99
	}),
]

inv_idPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		let sql = `UPDATE ${tbl} SET inv_count = ${req.body.inv_count} WHERE inv_id = ${req.params.inv_id} RETURNING *`
		const { rows = [] } = await DB.query(sql)
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
		const {
			rows
		} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = ${req.params.orgid}`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

orgidPut.validate = [
	param('orgid').isInt(),
	check('inv_count').isInt({
		min: 0,
		max: 99
	}),
]

orgidPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		let sql = `UPDATE ${tbl} SET inv_count = ${req.body.inv_count} WHERE provider_id = ${req.params.orgid} RETURNING *`
		const { rows = [] } = await DB.query(sql)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}


// EXPORT ROUTES
module.exports = {
	rootGet,
	rootPost,
	dispense,
	inv_idGet,
	inv_idPut,
	orgidGet,
	orgidPut,
}