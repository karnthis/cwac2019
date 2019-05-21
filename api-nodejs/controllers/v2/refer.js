const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/v2DB')
const { sanitize, makeUpdates } = require('../../core/funcs')

// TODO
/**SUMMARY
myOrgAllReferredGet
myOrgAllRefereeGet
myOrgReferPost
*/

// FUNCTIONS
function myOrgAllReferredGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'referee_id, provider_name, is_eligiable, date_of_referal, referral_notes, fulfillment_status',
			tbl: `REFERRALS`,
			joins: `LEFT JOIN PROVIDERS P on provider_id = referee_id`,
			where: `WHERE referer_id = '${req.myOrg}'`
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows[0], msg: 'Provider Found'})
			}
			return res.status(200).json({data: [], msg: 'No Provider Found'})
		})
	} else {
		console.log('ReferError-01')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function myOrgAllRefereeGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'referer_id, provider_name, is_eligiable, date_of_referal, referral_notes, fulfillment_status',
			tbl: `REFERRALS`,
			joins: `LEFT JOIN PROVIDERS P on provider_id = referer_id`,
			where: `WHERE referee_id = '${req.myOrg}'`
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows[0], msg: 'Provider Found'})
			}
			return res.status(200).json({data: [], msg: 'No Provider Found'})
		})
	} else {
		console.log('ReferError-02')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function myOrgReferPostFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const safeObject = sanitize(req.body, [
			'referee_id',
			'is_eligiable',
			'date_of_referal',
			'referral_notes',
			'fulfillment_status',
		])
		safeObject.referer_id = req.myOrg
		safeObject.creator_id = req.myId
		DB.insertQuery({
			data: safeObject,
			tbl: `REFERRALS`,
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows, msg: 'Referral Added'})
			}
			return res.status(200).json({data: [], msg: 'Referral Not Added'})
		})
	} else {
		console.log('ReferError-03')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

// EXPORT
module.exports = {
	myOrgAllReferredGet: {
		validate: [],
		func: myOrgAllReferredGetFunc
	},
	myOrgAllRefereeGet: {
		validate: [],
		func: myOrgAllRefereeGetFunc
	},
	myOrgReferPost: {
		validate: [
			check("referee_id").isInt(),
			check("is_eligiable").isBoolean(),
			check("date_of_referal").isInt(),
			check("referral_notes").optional().trim().escape(),
			check("fulfillment_status").optional().trim().escape()
		],
		func: myOrgReferPostFunc
	},
}
