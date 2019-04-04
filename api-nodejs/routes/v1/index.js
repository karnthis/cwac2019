// IMPORTS
const {checkToken} = require('../../middleware/tokenManager')
const {passToken} = require('../../middleware/returnToken')
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
const waitlist = require('./waitlist')

// EXPORT
module.exports = (app) => {

	// USE ROUTES
	app.use('/calendar', checkToken, passToken, calendar)
	app.use('/eligibility', checkToken, passToken, eligibility)
	app.use('/inventory', checkToken, passToken, inventory)
	app.use('/provider', checkToken, passToken, provider)
	app.use('/users', checkToken, passToken, users)

	// app.use('/county', checkToken, passToken, county)
	// app.use('/referral', checkToken, passToken, referral)
	// app.use('/address', checkToken, passToken, address)
	app.use('/waitlist', checkToken, passToken, waitlist)

	app.use('/auth', auth)
	// app.use('/auth', checkToken, passToken, auth)
}