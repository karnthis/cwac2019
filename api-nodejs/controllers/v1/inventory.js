const {
	check,
	param,
	validationResult
} = require('express-validator/check')
const DB = require('../../core/db')

//*	done
const cols = [
	'inv_id',
	'provider_id',
	'inv_count',
	'inv_type',
]

const tbl = 'INVENTORY'

const rootGet = {}
const rootPost = {}
const inv_idGet = {}
const inv_idPut = {}

rootGet.func = async (req, res) => {
	const {
		rows
	} = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({
		data: rows
	})
}

rootPost.validate = [
	check('provider_id').isInt(),
	check('inv_count').isInt(),
	//*	NOT REQUIRED
	check('inv_type').trim().escape(),
]

rootPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		console.log('pass')
		const {
			provider_id,
			inv_count,
			inv_type,
		} = req.body
		const sql = {
			tbl,
			data: {
				provider_id,
				inv_count,
				inv_type,
			}
		}
		const {
			rows
		} = await DB.doInsert(sql)
		res.status(200).json({
			rows: rows
		})
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
		} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.inv_id}'`)
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

inv_idPut.validate = [
	param('inv_id').isInt(),
	check('inv_count').isInt({
		min: 0,
		max: 99
	}).optional(),
	check('isDispense').isBoolean(),
]

inv_idPut.func = async (req, res) => {
	//todo
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			inv_count,
			isDispense
		} = req.body
		let sql = `UPDATE ${tbl} SET inv_count = ${isDispense ? 'inv_count - 1' : inv_count} WHERE inv_id = ${req.params.inv_id}`
		const {
			rows
		} = await DB.query(sql)
		res.status(200).json({
			rows: rows
		})
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
	const {
		inv_id,
		userid
	} = req.params

	// handleRes(res, {data: rows})
}

// EXPORT ROUTES
module.exports = {
	rootGet,
	rootPost,
	inv_idGet,
	inv_idPut,
}