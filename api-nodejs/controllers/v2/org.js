const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/v2DB')
const { latob } = require('../../core/funcs')
const { sanitize, makeUpdates } = require('../../core/funcs')

/**SUMMARY
userOrgGet
userOrgPut
allOrgSummaryGet
allOrgFullGet
addOrgPost
// TODO
targetOrgGet
targetOrgPut
*/

// FUNCTIONS

function userOrgGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
			DB.selectQuery({
				columns: 'provider_id, provider_name',
				tbl: `PROVIDERS`,
				where: `WHERE provider_id = '${req.myOrg}'`
			})
			.then(({rows}) => {
				if (rows.length) {
					return res.status(200).json({data: rows[0], msg: 'Provider Found'})
				}
				return res.status(200).json({data: [], msg: 'No Provider Found'})
			})
	} else {
		console.log('OrgError-01')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function userOrgPutFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
			const safeObject = sanitize(req.body, [
				'provider_name',
				'phone',
				'description',
				'hours',
				'days_of_operation',
			])
			DB.updateQuery({
				data: safeObject,
				tbl: 'PROVIDERS',
				where: `WHERE provider_id = ${req.myOrg}`
			})
			.then(resp => {
				console.log('userOrgPutFunc - resp')
				console.dir(resp)
				return res.status(200).json({data: resp, msg: 'Provider Updated'})
			})
	} else {
		console.log('OrgError-02')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function allOrgSummaryGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'provider_id, provider_name',
			tbl: `PROVIDERS`,
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows, msg: 'Providers Found'})
			}
			return res.status(200).json({data: [], msg: 'No Providers Found'})
		})
	} else {
		console.log('OrgError-03')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function allOrgFullGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			tbl: `PROVIDERS`,
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows, msg: 'Providers Found'})
			}
			return res.status(200).json({data: [], msg: 'No Provider Found'})
		})
	} else {
		console.log('OrgError-04')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function addOrgPostFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const safeObject = sanitize(req.body, [
			'provider_name',
			'phone',
			'description',
			'hours',
			'days_of_operation',
		])
		DB.insertQuery({
			data: safeObject,
			tbl: 'PROVIDERS',
		})
		.then(resp => {
			console.log('addOrgPostFunc - resp')
			console.dir(resp)
			return res.status(200).json({data: resp, msg: 'Provider Added'})
		})
	} else {
		console.log('OrgError-05')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
//	TODO
function targetOrgGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('OrgError-06')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function targetOrgPutFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('OrgError-07')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

// EXPORT
module.exports = {
	userOrgGet: {
		validate: [],
		func: userOrgGetFunc
	},
	userOrgPut: {
		validate: [
			check("provider_name").optional().isLength({ min: 3 }).trim().escape(),
			check("phone").optional().isMobilePhone().trim().escape(),
			check("description").optional().trim().escape(),
			check("hours").optional().isLength({ min: 3 }).trim().escape(),
			check("days_of_operation").optional().isLength({ max: 7 }).trim().escape()
	],
		func: userOrgPutFunc
	},
	allOrgSummaryGet: {
		validate: [],
		func: allOrgSummaryGetFunc
	},
	allOrgFullGet: {
		validate: [],
		func: allOrgFullGetFunc
	},
	addOrgPost: {
		validate: [
			check("provider_name").isLength({ min: 3 }).trim().escape(),
			check("phone").isMobilePhone().trim().escape(),
			check("description").trim().escape(),
			check("hours").isLength({ max: 7 }).trim().escape(),
			check("days_of_operation").trim().escape()
		],
		func: addOrgPostFunc
	},
	targetOrgGet: {
		validate: [],
		func: targetOrgGetFunc
	},
	targetOrgPut: {
		validate: [],
		func: targetOrgPutFunc
	},
}