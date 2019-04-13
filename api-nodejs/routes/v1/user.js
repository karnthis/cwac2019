const expRtr = new require('express-promise-router')()
const { NotSupp } = require('../../controllers/shared/')
const {
	rootGet,
	useridGet,
	useridPut,
	orgidGet,
	orgidPost,
} = require('../../controllers/v1/user')




expRtr.route('/')

	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: Retrieve all valid users
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Array
	 */
	.get(rootGet.func)

	/**
	 * @swagger
	 * /users:
	 *    post:
	 *     description: Not Supported
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /users:
	 *    put:
	 *     description: Not Supported
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

expRtr.route('/one/:userid')

	/**
	 * @swagger
	 * /users/one/:userid:
	 *    get:
	 *      description: Retrieve target user
	 *      parameters:
	 *       - name: userid
	 *         description: User to find
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.get(useridGet.validate, useridGet.func)

	/**
	 * @swagger
	 * /users/one/:userid:
	 *    post:
	 *     description: Not Supported
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /users/one/:userid:
	 *    put:
	 *      description: Update target user
	 *      parameters:
	 *       - name: userid
	 *         description: User to update
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: member_of
	 *         description: Parent agency to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: username
	 *         description: Username to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: password
	 *         description: Password to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: cpassword
	 *         description: Password to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: full_name
	 *         description: Full name to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: email
	 *         description: Email to update
	 *         in: PUT body
	 *         required: false
	 *         type: email string
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.put(useridPut.validate, useridPut.argon, useridPut.func)

expRtr.route('/group/:orgid')

	/**
	 * @swagger
	 * /users/group/:orgid:
	 *    get:
	 *      description: Retrieve all users of target agency
	 *      parameters:
	 *       - name: orgid
	 *         description: Org to check
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Array
	 */
	.get(orgidGet.validate, orgidGet.func)

	/**
	 * @swagger
	 * /users/group/:orgid:
	 *    post:
	 *      description: Create new user
	 *      parameters:
	 *       - name: userid
	 *         description: Parent agency to add new user to
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: member_of
	 *         description: Parent agency to insert
	 *         in: POST body
	 *         required: true
	 *         type: integer
	 *       - name: username
	 *         description: Username to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: password
	 *         description: Password to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: cpassword
	 *         description: Password to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: full_name
	 *         description: Full name to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: email
	 *         description: Email to insert
	 *         in: POST body
	 *         required: true
	 *         type: email string
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.post(orgidPost.validate, orgidPost.argon, orgidPost.func)

	/**
	 * @swagger
	 * /users/group/:orgid:
	 *    put:
	 *     description: Not Supported
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr