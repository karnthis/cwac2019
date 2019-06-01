const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/v2DB')
const { sanitize, makeUpdates } = require('../../core/funcs')

/**SUMMARY
userOrgInvGet
userOrgInvPut
userOrgDispPut
allOrgInvGet
*/

// FUNCTIONS
function userOrgInvGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
			DB.selectQuery({
				columns: 'P.provider_id, provider_name, inv_count',
				tbl: `INVENTORY`,
				joins: `LEFT JOIN PROVIDERS P using(provider_id)`,
				where: `WHERE P.provider_id = '${req.myOrg}'`
			})
			.then(({rows}) => {
				if (rows.length) {
					return res.status(200).json({data: rows[0], msg: 'Provider Inventory Found'})
				}
				return res.status(200).json({data: [], msg: 'No Provider Inventory Found'})
			})
	} else {
		console.log('InvError-01')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function userOrgInvPutFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
			DB.updateQuery({
				data: {
					inv_count: req.body.newInvCount
				},
				tbl: `INVENTORY`,
				where: `WHERE provider_id = '${req.myOrg}'`
			})
			.then(({rows}) => {
				if (rows.length) {
					return res.status(200).json({data: rows[0], msg: 'Provider Inventory Updated'})
				}
				return res.status(200).json({data: [], msg: 'Provider Inventory Not Updated'})
		})
	} else {
		console.log('InvError-02')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function userOrgDispPutFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
			DB.openQuery(`UPDATE INVENTORY SET inv_count = inv_count - 1 WHERE provider_id = ${req.myOrg} RETURN *`)
			.then(({rows}) => {
				if (rows.length) {
					return res.status(200).json({data: rows[0], msg: 'Provider Inventory Updated'})
				}
				return res.status(200).json({data: [], msg: 'Provider Inventory Not Updated'})
			})
	} else {
		console.log('InvError-03')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function allOrgInvGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'P.provider_id, provider_name, inv_count',
			tbl: `INVENTORY`,
			joins: `LEFT JOIN PROVIDERS P using(provider_id)`,
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows[0], msg: 'Provider Inventories Found'})
			}
			return res.status(200).json({data: [], msg: 'No Provider Inventories Found'})
		})
	} else {
		console.log('InvError-04')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

// EXPORT
module.exports = {
	userOrgInvGet: {
		validate: [],
		func: userOrgInvGetFunc
	},
	userOrgInvPut: {
		validate: [
			check('newInvCount').isInt({ min: 0 })
		],
		func: userOrgInvPutFunc
	},
	userOrgDispPut: {
		validate: [],
		func: userOrgDispPutFunc
	},
	allOrgInvGet: {
		validate: [],
		func: allOrgInvGetFunc
	}
}

// FUNCTIONS