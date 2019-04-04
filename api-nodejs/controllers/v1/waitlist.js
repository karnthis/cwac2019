const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')

const cols = [
	'waitlist_id',
	'provider_id',
	'creator_id',
	'date_of_waitlist',
	'eligiable_for',
	]
const tbl = 'WAITLIST'

const rootGet = {}
const pidGet = {}
const pidPost = {}
const pidPut = {}

rootGet.func = async (req, res) => {
	const {
		rows
	} = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	res.status(200).json({
		data: rows
	})
}

pidGet.validate = [
	param('orgid').isInt(),
]

pidGet.func = async (req, res) => {
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

pidPost.validate = [
	param('orgid').isInt(),
	check('creator_id').isInt(),
	check('date_of_waitlist').isInt(),
	check('eligiable_for').trim().escape(),
]

pidPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { creator_id, date_of_waitlist, eligiable_for} = req.body
		const {
			rows
		} = await DB.query(`INSERT INTO ${tbl} (provider_id, creator_id, date_of_waitlist, eligiable_for) VALUES ($1,$2,$3,$4)`, [
			req.params.orgid,
			creator_id,
			date_of_waitlist,
			eligiable_for
		])
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

pidPut.validate = [
	param('waitid').isInt(),
	check('eligiable_for').optional().trim().escape(),
	check('waitlist_status').optional().trim().escape(),
]

pidPut.func = async (req, res)=> {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			eligiable_for,
			waitlist_status,
		} = req.body
		const toUpdate = []
		if (eligiable_for) toUpdate.push(`eligiable_for = '${eligiable_for}'`)
		if (waitlist_status) toUpdate.push(`waitlist_status = '${waitlist_status}'`)
		toUpdate.join(', ')
		const {
			rows
		} = await DB.query(`UPDATE ${tbl} SET ${toUpdate} WHERE waitlist_id = ${req.params.waitid}`)
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
	pidGet,
	pidPost,
	pidPut,
}