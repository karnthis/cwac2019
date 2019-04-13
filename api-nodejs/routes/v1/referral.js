const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	rrGet,
	rrPost,
	reGet,
	ridGet,
	ridPut,
} = require('../../controllers/v1/referral')

expRtr.route('/')

	/**
	 * @swagger
	 * /referral:
	 *    get:
	 *      description: Retrieve all valid referrals
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
	 * /referral:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

		/**
	 * @swagger
	 * /referral:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

expRtr.route('/byreferer/:orgid')

	/**
	 * @swagger
	 * /referral/byreferer/:orgid:
	 *    get:
	 *      description: Retrieve all referrals from referer
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Array
	 */
	.get(rrGet.validate, rrGet.func)

		/**
	 * @swagger
	 * /referral/byreferer/:orgid:
	 *    post:
	 *      description: Create new referral
	 *      parameters:
	 *       - name: orgid
	 *         description: Provider creating referral
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: creator_id
	 *         description: userid of person creating referral
	 *         in: POST body
	 *         required: true
	 *         type: integer
	 *       - name: referee_id
	 *         description: Provider receiving referral
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: is_eligiable
	 *         description: is_eligiable value to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: date_of_referal
	 *         description: date_of_referal to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: referral_notes
	 *         description: referral_notes to insert
	 *         in: POST body
	 *         required: false
	 *         type: string
	 *       - name: fulfillment_status
	 *         description: fulfillment_status to insert
	 *         in: POST body
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
	.post(rrPost.validate, rrPost.func)

		/**
	 * @swagger
	 * /referral/byreferer/:orgid:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

expRtr.route('/byreferee/:orgid')

	/**
	 * @swagger
	 * /referral/byreferee/:orgid:
	 *    get:
	 *      description: Retrieve all valid referrals to referee
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Array
	 */
	.get(reGet.validate, reGet.func)

		/**
	 * @swagger
	 * /referral/byreferee/:orgid:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

		/**
	 * @swagger
	 * /referral/byreferee/:orgid:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)


expRtr.route('/byreferral/:rid')

	/**
	 * @swagger
	 * /referral/byreferral/:rid:
	 *    get:
	 *      description: Retrieve target referral
	 *      parameters:
	 *       - name: rid
	 *         description: Referral to find
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
	.get(ridGet.validate, ridGet.func)

		/**
	 * @swagger
	 * /referral/byreferral/:rid:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

			/**
	 * @swagger
	 * /referral/byreferral/:rid:
	 *    put:
	 *      description: Create new referral
	 *      parameters:
	 *       - name: rid
	 *         description: Target referral to update
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: is_eligiable
	 *         description: is_eligiable value to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: referral_notes
	 *         description: referral_notes to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: fulfillment_status
	 *         description: fulfillment_status to update
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
	.put(ridPut.validate, ridPut.func)

// EXPORT ROUTES
module.exports = expRtr