const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	orgidGet,
	orgidPost,
	orgidPut,
} = require('../../controllers/v1/user')

expRtr.route('/')
	.get(rootGet.func)
	.post(NotSupp)
	.put(NotSupp)

expRtr.route('/:orgid/:userid?')
	.get(orgidGet.validate, orgidGet.func)
	.post(orgidPost.validate, orgidPost.argon, orgidPost.func)
	.put(orgidPut.validate, orgidPut.func)

// EXPORT ROUTES
module.exports = expRtr