const expRtr = new require('express-promise-router')()
const { NotSupp } = require('../../controllers/shared/')
const { 
	rootGet,
	rootPost,
	orgidGet,
	orgidPut,
 } = require('../../controllers/v1/provider')

expRtr.route('/')

	/**
	 * @swagger
	 * /provider:
	 *    get:
	 *      description: Retrieve all valid providers
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
	 * /provider:
	 *    post:
	 *      description: Create new provider
	 *      parameters:
	 *       - name: provider_name
	 *         description: Name of provider
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: phone
	 *         description: Phone number of provider
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: hours
	 *         description: Hours of operation
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: desc
	 *         description: Description of provider
	 *         in: POST body
	 *         required: false
	 *         type: string
	 *       - name: days
	 *         description: Days of operation
	 *         in: POST body
	 *         required: false
	 *         type: string of days "UMTWRFS"
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
.post(rootPost.validate, rootPost.func)

	/**
	 * @swagger
	 * /provider:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
.put(NotSupp)

expRtr.route('/:orgid')

	/**
	 * @swagger
	 * /users/:orgid:
	 *    get:
	 *      description: Retrieve target provider
	 *      parameters:
	 *       - name: orgid
	 *         description: Provider to find
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
.get(orgidGet.validate, orgidGet.func)

	/**
	 * @swagger
	 * /provider/one/test:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
.post(NotSupp)

	/**
	 * @swagger
	 * /provider:
	 *    put:
	 *      description: Update existing provider
	 *      parameters:
	 *       - name: orgid
	 *         description: ID of target provider
	 *         in: URL Params
	 *         required: false
	 *         type: string
	 *       - name: provider_name
	 *         description: Name of provider to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: phone
	 *         description: Phone number of provider to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: hours
	 *         description: Hours of operation to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: desc
	 *         description: Description of provider to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: days
	 *         description: Days of operation to update
	 *         in: PUT body
	 *         required: false
	 *         type: string of days "UMTWRFS"
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
.put(orgidPut.validate, orgidPut.func)

// EXPORT ROUTES
module.exports = expRtr