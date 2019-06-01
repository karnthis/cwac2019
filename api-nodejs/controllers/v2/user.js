const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/v2DB')
const { latob } = require('../../core/funcs')
const { sanitize, makeUpdates } = require('../../core/funcs')

/**SUMMARY
userSummaryGet
userDetailsGet
userSelfPut
// TODO
targetUserGet
targetUserPut
newUserPost
*/

// FUNCTIONS
function userSummaryGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
			DB.selectQuery({
				columns: 'member_of, full_name',
				tbl: `USERS`,
				where: `WHERE user_id = '${req.myId}'`
			})
			.then(({rows}) => {
				if (rows.length) {
					return res.status(200).json({data: rows[0], msg: 'User Found'})
				}
				return res.status(200).json({data: [], msg: 'No User Found'})
			})
	} else {
		console.log('UserError-01')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function userDetailsGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'user_id, member_of, username, full_name, email',
			tbl: `USERS`,
			where: `WHERE user_id = '${req.myId}'`
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows[0], msg: 'User Found'})
			}
			return res.status(200).json({data: [], msg: 'No User Found'})
		})
	} else {
		console.log('UserError-02')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function userSelfPutFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const safeObject = sanitize(req.body, [
			'full_name',
			'email',
		])
		DB.makeUpdates({
			data: safeObject,
			tbl: 'USERS',
			where: `WHERE user_id = '${req.myId}'`
		})
		.then(resp => {
			return res.status(200).json({data: resp, msg: 'User Updated'})
		})
	} else {
		console.log('UserError-03')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
//	TODO
function targetUserGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('UserError-04')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function targetUserPutFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('UserError-05')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function newUserPostFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('UserError-06')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

// EXPORT
module.exports = {
	userSummaryGet: {
		validate: [],
		func: userSummaryGetFunc
	},
	userDetailsGet: {
		validate: [],
		func: userDetailsGetFunc
	},
	userSelfPut: {
		validate: [
			check("full_name").optional().trim().escape(),
			check("email").optional().isEmail().trim().escape(),
		],
		func: userSelfPutFunc
	},
}