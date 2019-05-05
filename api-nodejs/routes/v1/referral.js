const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	rrGet,
	rrPost,
	reGet,
	ridGet,
	ridPut,
} = require('../../controllers/v1/referral')

expRtr.route('/')

	.get(rootGet.func)

	.post(NotSupp)

	.put(NotSupp)

expRtr.route('/byreferer/:orgid')

	.get(rrGet.validate, rrGet.func)

	.post(rrPost.validate, rrPost.func)

	.put(NotSupp)

expRtr.route('/byreferee/:orgid')

	.get(reGet.validate, reGet.func)

	.post(NotSupp)

	.put(NotSupp)


expRtr.route('/byreferral/:rid')

	.get(ridGet.validate, ridGet.func)

	.post(NotSupp)

	.put(ridPut.validate, ridPut.func)

// EXPORT ROUTES
module.exports = expRtr