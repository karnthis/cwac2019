const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	orgidGet,
	orgidPost,
	gidPost,
	gidPut,
} = require('../../controllers/v1/eligibility')

expRtr.route('/')
	.get(rootGet.func)
	.post(NotSupp)
	.put(NotSupp)

expRtr.route('/e/:gid/:iid?')
	.get(NotSupp)
	.post(gidPost.validate, gidPost.func)
	.put(gidPut.validate, gidPut.func)

expRtr.route('/:orgid')
	.get(orgidGet.validate, orgidGet.func)
	.post(orgidPost.validate, orgidPost.func)
	.put(NotSupp)

// EXPORT ROUTES
module.exports = expRtr