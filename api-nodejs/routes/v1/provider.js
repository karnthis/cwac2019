const expRtr = new require('express-promise-router')()
const { NotSupp } = require('../../controllers/shared/')
const {
	rootGet,
	rootPost,
	orgidGet,
	orgidPut,
} = require('../../controllers/v1/provider')

expRtr.route('/')
	.get(rootGet.func)
	.post(rootPost.validate, rootPost.func)
	.put(NotSupp)
expRtr.route('/:orgid')
	.get(orgidGet.validate, orgidGet.func)
	.post(NotSupp)
	.put(orgidPut.validate, orgidPut.func)

// EXPORT ROUTES
module.exports = expRtr