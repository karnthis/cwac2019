const expRtr = new require('express-promise-router')()
const { NotSupp } = require('../../controllers/shared/')
const {
	rootGet,
	useridGet,
	useridPut,
	orgidGet,
	orgidPost,
} = require('../../controllers/v1/user')




expRtr.route('/')

	.get(rootGet.func)

	.post(NotSupp)

	.put(NotSupp)

expRtr.route('/one/:userid')

	.get(useridGet.validate, useridGet.func)

	.post(NotSupp)

	.put(useridPut.validate, useridPut.argon, useridPut.func)

expRtr.route('/group/:orgid')

	.get(orgidGet.validate, orgidGet.func)

	.post(orgidPost.validate, orgidPost.argon, orgidPost.func)

	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr