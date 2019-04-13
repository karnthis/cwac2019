const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	iidGet,
	iidPut,
	grpidGet,
	grpidPost,
	grpidPut,
	orgidGet,
	orgidPost,
} = require('../../controllers/v1/eligibility')

expRtr.route('/')

	/**
	 * @swagger
	 * /eligibility:
	 *    get:
	 *      description: Return all provider's eligibility items
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
	 * /eligibility:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

		/**
	 * @swagger
	 * /eligibility:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

expRtr.route('/one/:iid')

	/**
	 * @swagger
	 * /eligibility/one/:iid:
	 *    get:
	 *      description: Retrieve target eligibility item
	 *      parameters:
	 *       - name: iid
	 *         description: Eligibility item to find
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
	.get(iidGet.validate, iidGet.func)

	/**
	 * @swagger
	 * /eligibility/one/:iid:
	 *    description: Not Supported
	 *    get:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /eligibility/one/:iid:
	 *    put:
	 *      description: Update target eligibility item
	 *      parameters:
	 *       - name: iid
	 *         description: Eligibility item to update
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: elig_item_type_code
	 *         description: elig_item_type_code to update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: elig_item_type_label
	 *         description: elig_item_type_label to update
	 *         in: PUT body
	 *         required: false
	 *         type: string
	 *       - name: elig_item_value
	 *         description: elig_item_value to update
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
	.put(iidPut.validate, iidPut.func)

expRtr.route('/group/:grpid')

/**
	 * @swagger
	 * /eligibility/group/:grpid:
	 *    get:
	 *      description: Return target eligibility group's eligibility items
	 *      produces:
	 *       - application/json
	 *      parameters:
	 *       - name: grpid
	 *         description: grpid to find
	 *         in: URL Params
	 *         required: true
	 *         type: string
	 *      responses:
	 *        200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Object
	 */
	.get(grpidGet.validate, grpidGet.func)

	/**
	 * @swagger
	 * /eligibility/group/:grpid:
	 *    post:
	 *      description: Create new eligibility item within target group
	 *      parameters:
	 *       - name: grpid
	 *         description: Parent eligibility group to add new item to
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: elig_item_type_code
	 *         description: elig_item_type_code to insert
	 *         in: POST body
	 *         required: false
	 *         type: integer
	 *       - name: elig_item_type_label
	 *         description: elig_item_type_label to insert
	 *         in: POST body
	 *         required: true
	 *         type: string
	 *       - name: elig_item_value
	 *         description: elig_item_value to insert
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
	.post(grpidPost.validate, grpidPost.func)

	/**
	 * @swagger
	 * /eligibility/group/:grpid:
	 *    put:
	 *      description: Update target eligibility group
	 *      parameters:
	 *       - name: grpid
	 *         description: Update parent eligibility group's members
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: group_members
	 *         description: Array of new group members
	 *         in: PUT body
	 *         required: true
	 *         type: array
	 *       - name: group_members[*].elig_item_type_code
	 *         description: elig_item_type_code to use per update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: group_members[*].elig_item_type_label
	 *         description: elig_item_type_label to use per update
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *       - name: group_members[*].elig_item_value
	 *         description: elig_item_value to use per update
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Array
	 */
	.put(grpidPut.validate, grpidPut.func)

expRtr.route('/org/:orgid')

	/**
	 * @swagger
	 * /eligibility/org/:orgid:
	 *    get:
	 *      description: Retrieve all valid eligibility groups and items for target provider
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
	 * /eligibility/group/:grpid:
	 *    post:
	 *      description: Add new eligibility items for target provider
	 *      parameters:
	 *       - name: grpid
	 *         description: Target provider for new items
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: eligibility
	 *         description: Array of new item eligibility arrays
	 *         in: Post body
	 *         required: true
	 *         type: array
	 *       - name: eligibility[*]
	 *         description: Array of new eligibility items
	 *         in: Post body
	 *         required: true
	 *         type: array
	 *       - name: eligibility[*][*].elig_item_type_code
	 *         description: elig_item_type_code to use per update
	 *         in: Post body
	 *         required: false
	 *         type: integer
	 *       - name: eligibility[*][*].elig_item_type_label
	 *         description: elig_item_type_label to use per update
	 *         in: Post body
	 *         required: true
	 *         type: string
	 *       - name: eligibility[*][*].elig_item_value
	 *         description: elig_item_value to use per update
	 *         in: Post body
	 *         required: true
	 *         type: string
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Array
	 */
	 .post(orgidPost.validate, orgidPost.func)

		/**
	 * @swagger
	 * /eligibility/group/:grpid:
	 *    put:
	 *      description: Update eligibility items for target provider
	 *      parameters:
	 *       - name: grpid
	 *         description: Target provider for updated items
	 *         in: URL Params
	 *         required: true
	 *         type: integer
	 *       - name: eligibility
	 *         description: Array of new item eligibility arrays
	 *         in: PUT body
	 *         required: true
	 *         type: array
	 *       - name: eligibility[*]
	 *         description: Array of new eligibility items
	 *         in: PUT body
	 *         required: true
	 *         type: array
	 *       - name: eligibility[*][*].elig_item_type_code
	 *         description: elig_item_type_code to use per update
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: eligibility[*][*].elig_item_type_label
	 *         description: elig_item_type_label to use per update
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *       - name: eligibility[*][*].elig_item_value
	 *         description: elig_item_value to use per update
	 *         in: PUT body
	 *         required: true
	 *         type: string
	 *      produces:
	 *       - application/json
	 *      responses:
	 *       200:
	 *         description: Good Request
	 *      returns:
	 *        data: Query Result Array
	 */
	.put(NotSupp)



// EXPORT ROUTES
module.exports = expRtr