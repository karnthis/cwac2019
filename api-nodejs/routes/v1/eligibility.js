const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	uniGet
	iidGet,
	iidPut,
	grpidGet,
	grpidPost,
	grpidPut,
	orgidGet,
	orgidPost,
	orgidPut
} = require('../../controllers/v1/eligibility')

expRtr.route('/')

	.get(rootGet.func)

	.post(NotSupp)

	.put(NotSupp)

expRtr.route('/unique')

	.get(uniGet.func)

	.post(NotSupp)

	.put(NotSupp)

expRtr.route('/one/:iid')

	.get(iidGet.validate, iidGet.func)

	.post(NotSupp)

	.put(iidPut.validate, iidPut.func)

expRtr.route('/group/:grpid')

	.get(grpidGet.validate, grpidGet.func)

	.post(grpidPost.validate, grpidPost.func)

	.put(grpidPut.validate, grpidPut.func)

expRtr.route('/org/:orgid')

	.get(orgidGet.validate, orgidGet.func)

	.post(orgidPost.validate, orgidPost.func)

	.put(orgidPut.validate, orgidPut.func)



// EXPORT ROUTES
module.exports = expRtr