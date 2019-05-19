const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/v2DB')
const { sanitize, makeUpdates } = require('../../core/funcs')

// TODO
/**SUMMARY
userOrgEligGet
userOrgEligPut
allOrgEligGet
*/

// FUNCTIONS
function userOrgEligGetFunc(req, res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'P.provider_id, provider_name, elig_json',
			tbl: `ELIGIBILITY_JSON`,
			joins: `LEFT JOIN PROVIDERS P using(provider_id)`,
			where: `WHERE P.provider_id = '${req.myOrg}'`
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows[0], msg: 'Provider Eligibility Found'})
			}
			return res.status(200).json({data: [], msg: 'No Provider Eligibility Found'})
		})
	} else {
		console.log('EligError-01')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function userOrgEligPutFunc(req, res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
			const safeObject = sanitize(req.body, [
				'elig_json',
			])
			DB.updateQuery({
				data: safeObject,
				tbl: 'ELIGIBILITY_JSON',
				where: `WHERE provider_id = ${req.myOrg}`
			})
			.then(resp => {
				console.log('userOrgEligPutFunc - resp')
				console.dir(resp)
				return res.status(200).json({data: resp, msg: 'Provider Eligibility Updated'})
			})
	} else {
		console.log('EligError-02')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function allOrgEligGetFunc(req, res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'P.provider_id, provider_name, elig_json',
			tbl: `ELIGIBILITY_JSON`,
			joins: `LEFT JOIN PROVIDERS P using(provider_id)`,
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows, msg: 'Providers Eligibility Found'})
			}
			return res.status(200).json({data: [], msg: 'No Providers Eligibility Found'})
		})
	} else {
		console.log('EligError-03')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

// EXPORT
module.exports = {
	userOrgEligGet: {
		validate: [],
		func: userOrgEligGetFunc
	},
	userOrgEligPut: {
		validate: [
			check('eligibility').isJSON(),
		],
		func: userOrgEligPutFunc
	},
	allOrgEligGet: {
		validate: [],
		func: allOrgEligGetFunc
	}
}

// FUNCTIONS