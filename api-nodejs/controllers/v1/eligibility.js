const {
	check,
	param,
	validationResult
} = require('express-validator/check')
const DB = require('../../core/db')
const {
	makeDateStamp
} = require('../../core/funcs')

//todo
const gCols = [
	'elig_group_id',
	'provider_id',
]
const gTbl = 'ELIGIBILITY_GROUP'

const iColsS = [
	'elig_item_id',
	'elig_group_id',
	'elig_item_type_code',
	'elig_item_type_label',
	'elig_item_value',
]
const iColsI = [
	'elig_group_id',
	'elig_item_type_code',
	'elig_item_type_label',
	'elig_item_value',
]
const iTbl = 'ELIGIBILITY_ITEM'

const rootGet = {}
const orgidGet = {}
const orgidPost = {}
const gidPost = {}
const gidPut = {}
rootGet.func = async (req, res) => {
	const {
		rows
	} = await DB.query(`SELECT provider_id, ${iColsS} FROM ${iTbl} LEFT JOIN ${gTbl} using(elig_group_id)`)
	const ret = {}
	rows.forEach(el => {
		const pid = el.provider_id
		if (!ret[pid]) ret[pid] = []
		ret[pid].push(el)
	})
	res.status(200).json(ret)
}

orgidGet.validate = [
	param('orgid').isInt(),
]

orgidGet.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			rows
		} = await DB.query(`SELECT provider_id, ${iColsS} FROM ${iTbl} LEFT JOIN ${gTbl} using(elig_group_id) WHERE provider_id = ${req.params.orgid}`)
		const ret = {}
		rows.forEach(el => {
			const pid = el.provider_id
			if (!ret[pid]) ret[pid] = []
			ret[pid].push(el)
		})
		res.status(200).json(ret)
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

orgidPost.validate = [
	param('orgid').isInt(),
]

orgidPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			rows
		} = await DB.query(`INSERT INTO ${gTbl} (provider_id) VALUES (${req.params.orgid}) RETURNING elig_group_id`)
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

gidPost.validate = [
	// param('orgid').isInt(),
	param('gid').isInt(),
	check('elig_item_type_code').optional().isInt(),
	check('elig_item_type_label').trim().escape(),
	check('elig_item_value').trim().escape(),
]

gidPost.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			elig_item_type_code,
			elig_item_type_label,
			elig_item_value
		} = req.body
		const {
			rows
		} = await DB.query(`INSERT INTO ${iTbl} (${iColsI}) VALUES (${req.params.orgid}, ${elig_item_type_code}, '${elig_item_type_label}', '${elig_item_value}') RETURNING elig_item_id`)
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

gidPut.validate = [
	// param('orgid').isInt(),
	param('gid').isInt(),
	param('iid').isInt(),
	check('elig_item_type_code').optional().isInt(),
	check('elig_item_type_label').optional().trim().escape(),
	check('elig_item_value').optional().trim().escape(),
]

gidPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const {
			elig_item_type_code,
			elig_item_type_label,
			elig_item_value
		} = req.body
		const toUpdate = []
		if (elig_item_type_code) toUpdate.push(`elig_item_type_code = ${elig_item_type_code}`)
		if (elig_item_type_label) toUpdate.push(`elig_item_type_label = ${elig_item_type_label}`)
		if (elig_item_value) toUpdate.push(`elig_item_value = ${elig_item_value}`)
		toUpdate.join(', ')
		const {
			rows
		} = await DB.query(`UPDATE ${iTbl} SET ${toUpdate} WHERE elig_item_id = ${iTbl}`)
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

// EXPORT ROUTES
module.exports = {
	rootGet,
	orgidGet,
	orgidPost,
	gidPost,
	gidPut,
}