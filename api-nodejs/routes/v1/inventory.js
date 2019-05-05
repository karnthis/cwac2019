const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	rootPost,
	dispense,
	inv_idGet,
	inv_idPut,
	orgidGet,
	orgidPut,
} = require('../../controllers/v1/inventory')

expRtr.route('/')

	.get(rootGet.func)

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

expRtr.route('/byorg/:orgid')

	.get(orgidGet.validate, orgidGet.func)

	.post(NotSupp)

	.put(orgidPut.validate, orgidPut.func)

// EXPORT ROUTES
module.exports = expRtr