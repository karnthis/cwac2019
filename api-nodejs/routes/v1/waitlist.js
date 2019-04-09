const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../controllers/shared/')
const {
	rootGet,
	pidGet,
	pidPost,
	pidPut,
} = require('../../controllers/v1/waitlist')

expRtr.route('/')
	.get(rootGet.func)
	.post(NotSupp)
	.put(NotSupp)

	// TODO	clean up split
expRtr.route('/one/:waitid')
	.get(pidGet.validate, pidGet.func)
	.post(pidPost.validate, pidPost.func)
	.put(pidPut.validate, pidPut.func)

expRtr.route('/org/:orgid')
	.get(pidGet.validate, pidGet.func)
	.post(pidPost.validate, pidPost.func)
	.put(pidPut.validate, pidPut.func)

// EXPORT ROUTES
module.exports = expRtr