const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')
const { sanitize, makeUpdates } = require('../../core/funcs')

// TODO
/**SUMMARY
oneClassSummaryGet
oneClassFullGet
allClassesSummaryGet
allClassesFullGet
newClassPost
myOrgClassPut
*/

// FUNCTIONS
function oneClassSummaryGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'class_name, date_of_class, time_of_class, class_status',
			tbl: `CLASSES`,
			where: `WHERE class_id = ${req.param.class_id}`
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows, msg: 'Class Found'})
			}
			return res.status(200).json({data: [], msg: 'Class Not Found'})
		})
	} else {
		console.log('ClassError-01')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function oneClassFullGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			// columns: '*',
			tbl: `CLASSES`,
			where: `WHERE class_id = ${req.param.class_id}`
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows, msg: 'Class Found'})
			}
			return res.status(200).json({data: [], msg: 'Class Not Found'})
		})
	} else {
		console.log('ClassError-02')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function allClassesSummaryGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			columns: 'class_name, date_of_class, time_of_class, class_status',
			tbl: `CLASSES`,
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows, msg: 'Classes Found'})
			}
			return res.status(200).json({data: [], msg: 'No Classes Found'})
		})
	} else {
		console.log('ClassError-03')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function allClassesFullGetFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		DB.selectQuery({
			// columns: '*',
			tbl: `CLASSES`,
		})
		.then(({rows}) => {
			if (rows.length) {
				return res.status(200).json({data: rows, msg: 'Classes Found'})
			}
			return res.status(200).json({data: [], msg: 'No Classes Found'})
		})
	} else {
		console.log('ClassError-04')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function newClassPostFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const safeObject = sanitize(req.body, [
			'class_name',
			'class_description',
			'address_id',
			'date_of_class',
			'time_of_class',
			'current_attendee_count',
			'max_attendees',
			'class_status',
		])
		safeObject.provider_id = req.myOrg
		safeObject.creator_id = req.myId
		DB.insertQuery({
			data: safeObject,
			tbl: 'CLASSES',
		})
		.then(resp => {
			console.log('newClassPostFunc - resp')
			console.dir(resp)
			return res.status(200).json({data: resp, msg: 'Class Added'})
		})
	} else {
		console.log('ClassError-05')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}
function myOrgClassPutFunc(req,res) {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const safeObject = sanitize(req.body, [
			'class_name',
			'class_description',
			'address_id',
			'date_of_class',
			'time_of_class',
			'current_attendee_count',
			'max_attendees',
			'class_status',
		])
		DB.updateQuery({
			data: safeObject,
			tbl: 'CLASSES',
			where: req.param.class_id
		})
		.then(resp => {
			console.log('newClassPostFunc - resp')
			console.dir(resp)
			return res.status(200).json({data: resp, msg: 'Class Added'})
		})
	} else {
		console.log('ClassError-06')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}

// EXPORT
module.exports = {
	oneClassSummaryGet: {
		validate: [
			param("class_id").isInt(),
		],
		func: oneClassSummaryGetFunc
	},
	oneClassFullGet: {
		validate: [
			param("class_id").isInt(),
		],
		func: oneClassFullGetFunc
	},
	allClassesSummaryGet: {
		validate: [],
		func: allClassesSummaryGetFunc
	},
	allClassesFullGet: {
		validate: [],
		func: allClassesFullGetFunc
	},
	newClassPost: {
		validate: [
			check("class_name").trim().escape(),
			check("class_description").trim().escape(),
			check("address_id").isInt(),
			check("date_of_class").isInt(),
			check("time_of_class").trim().escape(),
			check("current_attendee_count").isInt(),
			check("max_attendees").isInt(),
			check("class_status").trim().escape(),
		],
		func: newClassPostFunc
	},
	myOrgClassPut: {
		validate: [
			param("class_id").isInt(),
			check("class_name").optional().trim().escape(),
			check("class_description").optional().trim().escape(),
			check("address_id").optional().isInt(),
			check("date_of_class").optional().isInt(),
			check("time_of_class").optional().trim().escape(),
			check("current_attendee_count").optional().isInt(),
			check("max_attendees").optional().isInt(),
			check("class_status").optional().trim().escape(),
		],
		func: myOrgClassPutFunc
	},
}