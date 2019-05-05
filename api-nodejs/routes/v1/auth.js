const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootPost
} = require('../../controllers/v1/auth')

/**
 * Swagger Docs in swagger.yml
 */

expRtr.route('/')

	.get(NotSupp)

	.post(rootPost.validate, rootPost.func)

	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr