const {
	check,
	param,
	validationResult
} = require('express-validator/check')
const DB = require('../../core/db')

const tbl = "ELIGIBILITY_JSON"

const cols = [
	'provider_id',
	'elig_json'
]

const rootGet = {}
const rootPost = {}
const orgidGet = {}
const orgidPut = {}

rootGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	// const ret = array2Object(rows, 'provider_id')
	res.status(200).json({ data: rows })
}

rootPost.validate = [
	param('orgid').isInt(),
	check('eligibility').isJSON(),
]

rootPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		req.body.eligibility
		const sql = {
			tbl,
			data: {
				provider_id: req.params.orgid,
				elig_json: req.body.eligibility
			}
		}
		const { rows = [] } = await DB.doInsert(sql)
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
		const { rows = [] } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = ${req.params.orgid}`)
		res.status(200).json({ data: rows })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

orgidPut.validate = [
	param('orgid').isInt(),
	check('eligibility').isJSON(),
]

orgidPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`UPDATE ${tbl} SET elig_json = ${req.body.eligibility} WHERE provider_id = ${req.params.orgid} RETURNING *`)
		res.status(200).json({ data: rows })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

// EXPORT ROUTES
module.exports = {
	rootGet,
	rootPost,
	orgidGet,
	orgidPut,
}