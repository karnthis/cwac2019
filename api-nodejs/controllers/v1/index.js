const {
	check,
	param,
	validationResult
} = require('express-validator/check')


const tmp = (req, res, next) => {
	param('orgid').isInt()
	next()
}
// EXPORT
module.exports = (app) => {
	// USE ROUTES
	app.use('/calendar', require('./calendar'))
	// app.use('/county', require('./county'))
	app.use('/eligibility', require('./eligibility'))
	app.use('/inventory', require('./inventory'))
	app.use('/provider', require('./provider'))
	app.use('/users', tmp(), require('./user'))
	app.use('/auth', require('./auth'))
	// app.use('/referral', require('./referral'))
	// app.use('/address', require('./address'))
	// app.use('/waitlist', require('./waitlist'))
}