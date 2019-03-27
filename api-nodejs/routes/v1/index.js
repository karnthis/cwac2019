// IMPORTS
const { checkToken } = require('../../middleware/tokenManager')
// ROUTES
const calendar = require('./calendar')
// const county = require('./county')
const eligibility = require('./eligibility')
const inventory = require('./inventory')
const provider = require('./provider')
const users = require('./user')
const auth = require('./auth')
// const referral = require('./referral')
// const address = require('./address')
// const waitlist = require('./waitlist')

// EXPORT
module.exports = (app) => {
	// USE ROUTES
	app.use('/calendar', calendar)
	// app.use('/county', county)
	app.use('/eligibility', eligibility)
	app.use('/inventory', inventory)
	app.use('/provider', checkToken, provider)
	app.use('/users', users)
	app.use('/auth', auth)
	// app.use('/referral', referral)
	// app.use('/address', address)
	// app.use('/waitlist', waitlist)
}