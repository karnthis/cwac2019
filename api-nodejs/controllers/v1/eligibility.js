const {
	check,
	param,
	oneOf,
	validationResult
} = require('express-validator/check')
const DB = require('../../core/db')
const { makeUpdates, sanitize, array2Object } = require('../../core/funcs')

const gTbl = 'ELIGIBILITY_GROUP'
const iTbl = 'ELIGIBILITY_ITEM'

const iColsS = [
	'elig_item_id',
	'elig_group_id',
	'elig_item_type_code',
	'elig_item_type_label',
	'elig_item_value',
]

const saniValues = [
	'elig_item_type_code',
	'elig_item_type_label',
	'elig_item_value',
]

const rootGet = {}
const uniGet = {}
const iidGet = {}
const iidPut = {}
const grpidGet = {}
const grpidPost = {}
const grpidPut = {}
const orgidGet = {}
const orgidPost = {}
const orgidPut = {}

rootGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(`SELECT provider_id, ${iColsS} FROM ${iTbl} JOIN ${gTbl} using(elig_group_id)`)
	const ret = array2Object(rows, 'provider_id')
	res.status(200).json({ data: ret })
}

uniGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(`SELECT DISTINCT elig_item_type_code, elig_item_type_label FROM ${iTbl}`)
	// const ret = array2Object(rows, 'provider_id')
	res.status(200).json({ data: rows })
}

iidGet.validate = [
	param('iid').isInt(),
]

iidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${iColsS} FROM ${iTbl} WHERE elig_item_id = ${res.params.iid}`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

iidPut.validate = [
	param('iid').isInt(),
	check('elig_item_type_code').optional().isInt(),
	check('elig_item_type_label').optional().trim().escape(),
	check('elig_item_value').optional().trim().escape(),
]

iidPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const D = sanitize(req.body, saniValues)
		const toUpdate = makeUpdates(D)
		const { rows = [] } = await DB.query(`UPDATE ${iTbl} SET ${toUpdate} WHERE elig_item_id = ${req.params.iid} Returning *`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

grpidGet.validate = [
	param('grpid').isInt(),
]

grpidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { rows = [] } = await DB.query(`SELECT ${iColsS} FROM ${iTbl} WHERE elig_group_id = ${res.params.grpid}`)
		const ret = array2Object(rows, 'elig_group_id')
		res.status(200).json({ data: ret })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}


grpidPost.validate = [
	param('grpid').isInt(),
	// oneOf([
	// 	check('group_members').isJSON(),
	// 	check('group_members').isArray(),
	// ], 'group_members must be JSON or an Array'),
	// check('group_members[*].elig_item_type_code').optional().isInt(),
	// check('group_members[*].elig_item_type_label').trim().escape(),
	// check('group_members[*].elig_item_value').trim().escape(),
	check('elig_item_type_code').optional().isInt(),
	check('elig_item_type_label').trim().escape(),
	check('elig_item_value').trim().escape(),
]

grpidPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const ret = []
		for (const i in req.body.group_members) {
			const curr = req.body.group_members[i]
			const D = sanitize(curr, saniValues)
			D.elig_group_id = req.params.grpid
			const sql = {
				iTbl,
				data: D
			}
			const { rows = [] } = await DB.doInsert(sql, 'elig_item_id')
			ret.push(...rows)
		}
		res.status(200).json({ data: ret })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

grpidPut.validate = [
	param('grpid').isInt(),
	oneOf([
		check('group_members').isJSON(),
		check('group_members').isArray(),
	], 'group_members must be JSON or an Array'),
	check('group_members[*].elig_item_type_code').optional().isInt(),
	check('group_members[*].elig_item_type_label').trim().escape(),
	check('group_members[*].elig_item_value').trim().escape(),
]

grpidPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		let _ = await DB.query(`DELETE FROM ${iTbl} WHERE elig_group_id = ${req.params.grpid}`)
		const ret = []
		for (const i in req.body.group_members) {
			const curr = req.body.group_members[i]
			const D = sanitize(curr, saniValues)
			D.elig_group_id = req.params.grpid
			const sql = {
				iTbl,
				data: D
			}
			const { rows = [] } = await DB.doInsert(sql, 'elig_item_id')
			ret.push(...rows)
		}
		res.status(200).json({ data: ret })
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
		const { rows = [] } = await DB.query(`SELECT provider_id, ${iColsS} FROM ${iTbl} JOIN ${gTbl} using(elig_group_id) WHERE provider_id = ${req.params.orgid}`)
		const ret = array2Object(rows, 'elig_group_id')
		res.status(200).json({ data: ret })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

orgidPost.validate = [
	param('orgid').isInt(),
	oneOf([
		check('eligibility').isJSON(),
		check('eligibility').isArray(),
	], 'eligibility must be JSON or Array'),
	oneOf([
		check('eligibility[*]').isJSON(),
		check('eligibility[*]').isArray(),
	], 'eligibility[*] must be JSON or Array'),
	check('eligibility[*][*].elig_item_type_code').optional().isInt(),
	check('eligibility[*][*].elig_item_type_label').trim().escape(),
	check('eligibility[*][*].elig_item_value').trim().escape(),
]

orgidPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const ret = []
		const elig = req.body.eligibility
		for (const i in elig) {
			let { rows = [] } = await DB.query(`INSERT INTO ${gTbl} (provider_id) VALUES (${req.params.orgid}) RETURNING elig_group_id`)

			const link = rows[0]
			const round = elig[i]
			for (const j in round) {

				const D = sanitize(round[j], saniValues)
				D.elig_group_id = link
				const sql = {
					iTbl,
					data: D
				}
				let { rows = [] } = await DB.doInsert(sql, 'elig_item_id')
				ret.push(...rows)
			}
		}
		res.status(200).json({ data: ret })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

orgidPut.validate = [
	param('orgid').isInt(),
	oneOf([
		check('eligibility').isJSON(),
		check('eligibility').isArray(),
	], 'eligibility must be JSON or Array'),
	oneOf([
		check('eligibility[*]').isJSON(),
		check('eligibility[*]').isArray(),
	], 'eligibility[*] must be JSON or Array'),
	check('eligibility[*][*].elig_item_type_code').optional().isInt(),
	check('eligibility[*][*].elig_item_type_label').trim().escape(),
	check('eligibility[*][*].elig_item_value').trim().escape(),
]

orgidPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const ret = []

		const b = await DB.query('begin')

		const dela = await DB.query(`DELETE FROM ${iTbl} WHERE elig_group_id IN (SELECT DISTINCT elig_group_id FROM ${gTbl} WHERE provider_id = ${orgid})`)
		const delb = await DB.query(`DELETE FROM ${gTbl} WHERE provider_id = ${orgid}`)

		const elig = req.body.eligibility
		for (const i in elig) {
			let { rows = [] } = await DB.query(`INSERT INTO ${gTbl} (provider_id) VALUES (${req.params.orgid}) RETURNING elig_group_id`)

			const link = rows[0]
			const round = elig[i]
			for (const j in round) {

				const D = sanitize(round[j], saniValues)
				D.elig_group_id = link
				const sql = {
					iTbl,
					data: D
				}
				let { rows = [] } = await DB.doInsert(sql, 'elig_item_id')
				ret.push(...rows)
			}
		}
		const end = await DB.query('end')
		res.status(200).json({ data: ret })
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
}

// EXPORT ROUTES
module.exports = {
	rootGet,
	uniGet,
	iidGet,
	iidPut,
	grpidGet,
	grpidPost,
	grpidPut,
	orgidGet,
	orgidPost,
	orgidPut,
}