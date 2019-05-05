const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	statusGet,
	cidGet,
	cidPut,
	aidGet,
	orgidGet,
	orgidPost,
} = require('../../controllers/v1/calendar')

expRtr.route('/')

	.get(rootGet.func)

	.post(NotSupp)

	.put(NotSupp)

expRtr.route('/status/:stat')

	.get(statusGet.validate, statusGet.func)

	.post(NotSupp)

	.put(NotSupp)

expRtr.route('/one/:cid')

	.get(cidGet.validate, cidGet.func)

	.post(NotSupp)

	.put(cidPut.validate, cidPut.func)

expRtr.route('/byaddress/:aid')

	.get(aidGet.validate, aidGet.func)

	.post(NotSupp)

	.put(NotSupp)

expRtr.route('/byagency/:orgid')
//TODO

	.get(orgidGet.validate, orgidGet.func)

	.post(orgidPost.validate, orgidPost.func)

	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr