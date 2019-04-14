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

	/**
	 * @swagger
	 * /auth:
	 *    description: Not Supported
	 *    get:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.get(NotSupp)

/**
 * @swagger
 * /auth:
 *  post:
 *   summary: Submit username and password as login for session token.
 *   consumes:
 *    - application/json
 *   parameters:
 *    - in: body
 *      name: Login
 *      description: Login credentials
 *      schema:
 *       type: object
 *       required:
 *        - userName
 *        - password
 *       properties:
 *        username:
 *         type: string
 *        password:
 *         type: string
 *   produces:
 *    - application/json
 *   responses:
 *    200:
 *     description: Good Request
 *   returns:
 *    data: Cookie containing session token
 */
	.post(rootPost.func)

	/**
	 * @swagger
	 * /auth:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr