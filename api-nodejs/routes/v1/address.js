const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	orgGet,
	orgPost,
	aidGet,
	aidPut,
} = require('../../controllers/v1/address')

expRtr.route('/')

	/**
	 * @swagger
	 * /address:
	 *    get:
	 *      description: Retrieve all valid addresses
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
	 * /address:
	 *    post:
	 *     description: Not Supported
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

		/**
	 * @swagger
	 * /address:
	 *    put:
	 *     description: Not Supported
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

	expRtr.route('/one/:aid')

	/**
	 * @swagger
	 * /address/one/:aid:
	 *    get:
	 *      description: Retrieve target address
	 *      parameters:
	 *       - name: aid
	 *         description: Address to find
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
	.get(aidGet.validate, aidGet.func)

		/**
	 * @swagger
	 * /address/one/:aid:
	 *    post:
	 *     description: Not Supported
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /address/one/:aid:
	 *    put:
	 *      description: Update address
	 *      parameters:
	 *       - name: aid
	 *         description: Target address to update
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: member_of
	 *         description: Update if primary site
	 *         in: PUT body
	 *         required: false
	 *         type: boolean
	 *       - name: location_type
	 *         description: location_type to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: location_name
	 *         description: location_name to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: street
	 *         description: street to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: line_2
	 *         description: line_2 to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: city
	 *         description: city to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: state
	 *         description: state to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: zip_base5
	 *         description: zip_base5 to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: zip_plus4
	 *         description: zip_plus4 to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.put(aidPut.validate, aidPut.func)

expRtr.route('/org/:orgid')

	/**
	 * @swagger
	 * /address/org/:orgid:
	 *    get:
	 *      description: Retrieve all addresses for target provider
	 *      parameters:
	 *       - name: orgid
	 *         description: Provider to check
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
	.get(orgPost.validate, orgGet.func)

		/**
	 * @swagger
	 * /address/org/:orgid:
	 *    post:
	 *      description: Create new address
	 *      parameters:
	 *       - name: orgid
	 *         description: Parent agency to link with new address
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: primary_site
	 *         description: primary_site to insert
	 *         in: POST body
	 *         required: true
	 *         type: boolean
	 *       - name: location_type
	 *         description: location_type to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: location_name
	 *         description: location_name to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: street
	 *         description: street to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: city
	 *         description: city to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: zip_base5
	 *         description: zip_base5 to insert
	 *         in: POST body
	 *         required: true
	 *         type: integer
	 *       - name: line_2
	 *         description: line_2 to insert
	 *         in: POST body
	 *         required: false
	 *         type: string
	 *       - name: state
	 *         description: state to insert
	 *         in: POST body
	 *         required: false
	 *         type: string
	 *       - name: zip_plus4
	 *         description: zip_plus4 to insert
	 *         in: POST body
	 *         required: false
	 *         type: integer
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.post(orgPost.validate, orgPost.func)

		/**
	 * @swagger
	 * /address/org/:orgid:
	 *    put:
	 *     description: Not Supported
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)




// EXPORT ROUTES
module.exports = expRtr