const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	wlidGet,
	wlidPut,
	orgidGet,
	orgidPost,
} = require('../../controllers/v1/waitlist')

expRtr.route('/')

	/**
	 * @swagger
	 * /waitlist:
	 *    get:
	 *      description: Retrieve all valid waitlist entries
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
	 * /waitlist:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /waitlist:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

expRtr.route('/one/:waitid')

	/**
	 * @swagger
	 * /waitlist/one/:waitid:
	 *    get:
	 *      description: Retrieve target waitlist entry
	 *      parameters:
	 *       - name: waitid
	 *         description: Waitlist entry to find
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
	.get(wlidGet.validate, wlidGet.func)

	/**
	 * @swagger
	 * /waitlist/one/:waitid:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /waitlist/one/:waitid:
	 *    put:
	 *      description: Update target waitlist entry
	 *      parameters:
	 *       - name: waitid
	 *         description: Waitlist entry to update
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: provider_id
	 *         description: Parent provider to update
	 *         in: PUT body
	 *         required: true
	 *         type: integer
	 *       - name: date_of_waitlist
	 *         description: date_of_waitlist to update
	 *         in: PUT body
	 *         required: true
	 *         type: integer
	 *       - name: eligiable_for
	 *         description: eligiable_for to update
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *       - name: waitlist_status
	 *         description: waitlist_status to update
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.put(wlidPut.validate, wlidPut.func)

expRtr.route('/org/:orgid')

	/**
	 * @swagger
	 * /waitlist/org/:orgid:
	 *    get:
	 *      description: Retrieve all valid waitlist entries for target provider
	 *      parameters:
	 *       - name: orgid
	 *         description: Target provider
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
	 * /waitlist/org/:orgid:
	 *    post:
	 *      description: Add waitlist entry for target provider
	 *      parameters:
	 *       - name: orgid
	 *         description: Provider for new waitlist entry
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: creator_id
	 *         description: Creator of new entry
	 *         in: POST body
	 *         required: true
	 *         type: integer
	 *       - name: date_of_waitlist
	 *         description: date_of_waitlist to insert
	 *         in: POST body
	 *         required: true
	 *         type: integer
	 *       - name: eligiable_for
	 *         description: eligiable_for to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: waitlist_status
	 *         description: waitlist_status to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.post(orgidPost.validate, orgidPost.func)

	/**
	 * @swagger
	 * /waitlist/org/:orgid:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr