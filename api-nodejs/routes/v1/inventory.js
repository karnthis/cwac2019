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

	.put(NotSupp)

expRtr.route('/dispense/:inv_id')

	.get(NotSupp)

	.post(NotSupp)

	.put(dispense.validate, dispense.func)

expRtr.route('/manage/:inv_id')

	.get(inv_idGet.validate, inv_idGet.func)

	.post(NotSupp)

	.put(inv_idPut.validate, inv_idPut.func)

// EXPORT ROUTES
module.exports = expRtr