const expRtr = new require('express-promise-router')()
const { rootPost } = require('../../controllers/v2/login')

// ROUTING
expRtr.route('/')
	.post(rootPost.validate, rootPost.routeFunction)

	module.exports = expRtr;
