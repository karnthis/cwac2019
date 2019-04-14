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

	.get(rootGet.func)

	.post(NotSupp)

	.put(NotSupp)

	expRtr.route('/one/:aid')

	.get(aidGet.validate, aidGet.func)

	.post(NotSupp)

	.put(aidPut.validate, aidPut.func)

expRtr.route('/org/:orgid')

	.get(orgGet.validate, orgGet.func)

	.post(orgPost.validate, orgPost.func)

	.put(NotSupp)




// EXPORT ROUTES
module.exports = expRtr