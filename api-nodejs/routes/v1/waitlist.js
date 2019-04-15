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

	.get(rootGet.func)

	.post(NotSupp)

	.put(NotSupp)

expRtr.route('/one/:waitid')

	.get(wlidGet.validate, wlidGet.func)

	.post(NotSupp)

	.put(wlidPut.validate, wlidPut.func)

expRtr.route('/org/:orgid')

	.get(orgidGet.validate, orgidGet.func)

	.post(orgidPost.validate, orgidPost.func)

	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr