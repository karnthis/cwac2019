const {
	check,
	param,
	validationResult
} = require('express-validator/check')
const DB = require('../../core/db')
const {
	makeTimestamp
} = require('../../core/funcs')

//todo
const cols = [
	'provider_id',
	'public_assistance',
	'mother_17_or_younger',
	'is_client',
	'client_of_other',
	'trimester',
	'residency_requirement',
	'must_meet_all_criteria',
]
const tbl = 'ELIGIBILITY_REQUIREMENTS'

const rootGet = {}
const rootPost = {}
const orgidGet = {}
const orgidPut = {}

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
	check('public_assistance').isBoolean(),
	check('mother_17_or_younger').isBoolean(),
	check('is_client').isBoolean(),
	check('client_of_other').trim().escape(),
	check('trimester').isInt(),
	check('residency_requirement').trim().escape(),
	check('must_meet_all_criteria').isBoolean(),
]

rootPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		console.log('pass')
		const {
			provider_id,
			public_assistance,
			mother_17_or_younger,
			is_client,
			client_of_other,
			trimester,
			residency_requirement,
			must_meet_all_criteria,
		} = req.body
		const sql = {
			tbl,
			data: {
				provider_id,
				public_assistance,
				mother_17_or_younger,
				is_client,
				client_of_other,
				trimester,
				residency_requirement,
				must_meet_all_criteria,
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

orgidGet.validate = [
	param('orgid').isInt(),
]

orgidGet.func = async (req, res) => {
	const {
		rows
	} = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.orgid}'`)
	res.status(200).json({
		data: rows
	})
}

orgidPut.validate = [
	param('orgid').isInt(),
	check('provider_name').trim().escape(),
	check('phone').trim().escape(),
	check('hours').trim().escape(),
]

orgidPut.func = async (req, res) => {
	//todo
	const {
		body
	} = req
	const {
		orgid,
		userid
	} = req.params
	let sql = `SELECT ${cols} FROM USERS WHERE ${userMakeWhere(orgid, userid)}`
	const {
		rows
	} = await DB.query(sql)
	// handleRes(res, {data: rows})
}

// EXPORT ROUTES
module.exports = {
	rootGet,
	rootPost,
	orgidGet,
	orgidPut,
}