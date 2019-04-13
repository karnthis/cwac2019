const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	rootPost,
	dispense,
	inv_idGet,
	// inv_idPost,
	inv_idPut,
} = require('../../controllers/v1/inventory')

expRtr.route('/')

	/**
	 * @swagger
	 * /inventory:
	 *    get:
	 *      description: Retrieve all valid inventories
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
	 * /inventory:
	 *    post:
	 *      description: Create new inventory
	 *      parameters:
	 *       - name: provider_id
	 *         description: Parent agency to link to new inventory
	 *         in: POST body
	 *         required: true
	 *         type: integer
	 *       - name: inv_count
	 *         description: Parent agency to insert
	 *         in: POST body
	 *         required: true
	 *         type: integer
	 *       - name: inv_type
	 *         description: Username to insert
	 *         in: POST body
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
	.post(rootPost.validate, rootPost.func)

		/**
	 * @swagger
	 * /inventory:
	 *    description: Not Supported
	 *    put:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.put(NotSupp)

expRtr.route('/dispense/:inv_id')

	/**
	 * @swagger
	 * /inventory/dispense/:inv_id:
	 *    description: Not Supported
	 *    get:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.get(NotSupp)

		/**
	 * @swagger
	 * /inventory/dispense/:inv_id:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /inventory/dispense/:inv_id:
	 *    put:
	 *      description: Reduce target inventory total by one
	 *      parameters:
	 *       - name: inv_id
	 *         description: Target inventory to reduce
	 *         in: URL params
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
	.put(dispense.validate, dispense.func)

expRtr.route('/:inv_id')

	/**
	 * @swagger
	 * /inventory/:inv_id:
	 *    get:
	 *      description: Retrieve target inventory
	 *      parameters:
	 *       - name: inv_id
	 *         description: Target inventory
	 *         in: URL params
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
	.get(inv_idGet.validate, inv_idGet.func)

		/**
	 * @swagger
	 * /inventory/:inv_id:
	 *    description: Not Supported
	 *    post:
	 *     responses:
	 *      403:
	 *       description: Not Supported
	 */
	.post(NotSupp)

	/**
	 * @swagger
	 * /inventory/:inv_id:
	 *    put:
	 *      description: Update target inventory
	 *      parameters:
	 *       - name: inv_id
	 *         description: Parent agency to link to new inventory
	 *         in: URL params
	 *         required: true
	 *         type: integer
	 *       - name: inv_count
	 *         description: Updated inventory count
	 *         in: PUT body
	 *         required: false
	 *         type: integer
	 *       - name: inv_type
	 *         description: inv_type update
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
	.put(inv_idPut.validate, inv_idPut.func)

// EXPORT ROUTES
module.exports = expRtr