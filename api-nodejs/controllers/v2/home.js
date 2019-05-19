const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/v2DB')
const { sanitize, makeUpdates } = require('../../core/funcs')

// TODO
// FUNCTIONS
function myOrgAllReferGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('HomeError-01')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function myOrgReferPostFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('HomeError-02')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}


// EXPORT
module.exports = {
	myOrgAllReferGet: {
		// validate: [],
		func: myOrgAllReferGetFunc
	},
	myOrgReferPost: {
		// validate: [],
		func: myOrgReferPostFunc
	},
}