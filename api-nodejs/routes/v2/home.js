const expRtr = new require('express-promise-router')()
const {} = require('../../controllers/v2/elig')
// TODO
// ROUTING
expRtr.route('/')
	.get()
	.post()
	.put()

	module.exports = expRtr;
