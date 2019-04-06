const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	rootPost,
	inv_idGet,
	inv_idPost,
	inv_idPut,
} = require('../../controllers/v1/inventory')

expRtr.route('/')
	.get(rootGet.func)
	.post(rootPost.validate, rootPost.func)
	.put(NotSupp)

expRtr.route('/:inv_id')
	.get(inv_idGet.validate, inv_idGet.func)
	.post(NotSupp)
	.put(inv_idPut.validate, inv_idPut.func)

// EXPORT ROUTES
module.exports = expRtr