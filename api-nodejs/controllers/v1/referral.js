const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')
const { makeOptionals } = require('../../core/funcs')

const cols = [
	'referal_id',
	'referer_id',
	'creator_id',
	'referee_id',
	'is_eligiable',
	'date_of_referal',
	'referral_notes',
	'fulfillment_status',
	]
const tbl = 'REFERRALS'

const rootGet = {}
const rrGet = {}
const rrPost = {}
const reGet = {}
const ridGet = {}
const ridPut = {}

rootGet.func = async (req, res) => {
	const {
		rows
	} = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({
		data: rows
	})
}

rrGet.validate = [
	param('orgid').isInt(),
]

rrGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			rows
		} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE referer_id = '${req.params.orgid}'`)
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

rrPost.validate = [
	param('orgid').isInt(),
	check('creator_id').isInt(),
	check('referee_id').isInt(),
	check('is_eligiable').isBoolean(),
	check('date_of_referal').isInt(),
	check('referral_notes').optional().trim().escape(),
	check('fulfillment_status').optional().trim().escape(),
]

rrPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { creator_id, referee_id, is_eligiable, date_of_referal, referral_notes, fulfillment_status} = req.body
		const {
			rows
		} = await DB.query({test:`INSERT INTO ${tbl} (referer_id, creator_id, referee_id, is_eligiable, date_of_referal, referral_notes, fulfillment_status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, values:[
			req.params.orgid,
			creator_id,
			referee_id,
			is_eligiable,
			date_of_referal,
			referral_notes,
			fulfillment_status
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

reGet.validate = [
	param('orgid').isInt(),
]

reGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			rows
		} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE referee_id = '${req.params.orgid}'`)
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

ridGet.validate = [
	param('rid').isInt(),
]

ridGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			rows
		} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE referal_id = ${req.params.rid}`)
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



ridPut.validate = [
	param('rid').isInt(),
	check('is_eligiable').optional().isBoolean(),
	check('referral_notes').optional().trim().escape(),
	check('fulfillment_status').optional().trim().escape(),
]

ridPut.func = async (req, res)=> {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			is_eligiable,
			referral_notes,
			fulfillment_status,
		} = req.body
		const toUpdate = makeOptionals([
			['bool','is_eligiable',is_eligiable],
			['str','referral_notes',referral_notes],
			['str','fulfillment_status',fulfillment_status],
		])
		const {
			rows
		} = await DB.query(`UPDATE ${tbl} SET ${toUpdate} WHERE referal_id = ${req.params.rid} RETURNING *`)
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
	rrGet,
	rrPost,
	reGet,
	ridGet,
	ridPut,
}