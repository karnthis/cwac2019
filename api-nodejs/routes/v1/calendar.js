const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	cidGet,
	cidPut,
	aidGet,
	orgidGet,
	orgidPost,
} = require('../../controllers/v1/calendar')

expRtr.route('/')

	/**
	 * @swagger
	 * /provider:
	 *    get:
	 *      description: Retrieve all valid calendar events
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
	 * /calendar:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /calendar:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

expRtr.route('/one/:cid')

	/**
	 * @swagger
	 * /calendar/one/:cid:
	 *    get:
	 *      description: Retrieve target calendar event
	 *      parameters:
	 *       - name: cid
	 *         description: Event to find
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
	.get(cidGet.validate, cidGet.func)

	/**
	 * @swagger
	 * /calendar/one/:cid:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /calendar/one/:cid:
	 *    put:
	 *      description: Update target calendar event
	 *      parameters:
	 *       - name: cid
	 *         description: Target Event
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: provider_id
	 *         description: Parent agency to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: address_id
	 *         description: address_id to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: class_name
	 *         description: class_name to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: class_description
	 *         description: class_description to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: date_of_class
	 *         description: date_of_class to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: time_of_class
	 *         description: time_of_class to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: current_attendee_count
	 *         description: current_attendee_count to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: max_attendees
	 *         description: max_attendees to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: class_status
	 *         description: class_status to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.put(cidPut.validate, cidPut.func)

expRtr.route('/byaddress/:aid')

/**
	 * @swagger
	 * /calendar/byaddress/:aid:
	 *    get:
	 *      description: Retrieve all calendar events for target address
	 *      parameters:
	 *       - name: cid
	 *         description: Event to find
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
	 * /calendar/byaddress/:aid:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /calendar/byaddress/:aid:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

expRtr.route('/byagency/:orgid')
//TODO
	/**
	 * @swagger
	 * /calendar/byagency/:orgid:
	 *    get:
	 *      description: Retrieve all calendar events for target provider
	 *      parameters:
	 *       - name: orgid
	 *         description: Event to find
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
	 * /calendar/byagency/:orgid:
	 *    put:
	 *      description: Create new calendar event
	 *      parameters:
	 *       - name: provider_id
	 *         description: Parent agency of new calendar event
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: creator_id
	 *         description: Creator of new calendar event
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: address_id
	 *         description: Address of new calendar event
	 *         in: PUT body
	 *         required: true
	 *         type: integer
	 *       - name: class_name
	 *         description: class_name to insert
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *       - name: class_description
	 *         description: class_description to insert
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *       - name: date_of_class
	 *         description: date_of_class to insert
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *       - name: time_of_class
	 *         description: time_of_class to insert
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *       - name: current_attendee_count
	 *         description: current_attendee_count to insert
	 *         in: PUT body
	 *         required: true
	 *         type: email string
	 *       - name: max_attendees
	 *         description: max_attendees to insert
	 *         in: PUT body
	 *         required: true
	 *         type: email string
	 *       - name: class_status
	 *         description: class_status to insert
	 *         in: PUT body
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
	.post(orgidPost.validate, orgidPost.func)

	/**
	 * @swagger
	 * /calendar/byagency/:orgid:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr