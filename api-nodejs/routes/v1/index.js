const calendar = require('./calendar')
const county = require('./county')
const elegibility = require('./elegibility')
const inventory = require('./inventory')
const provider = require('./provider')
const users = require('./user')

module.exports = (app) => {
	app.use('/calendar', calendar)
	app.use('/county', county)
	app.use('/elegibility', elegibility)
	app.use('/inventory', inventory)
	app.use('/provider', provider)
	app.use('/users', users)
}