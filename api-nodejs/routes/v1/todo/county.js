const expRtr = new require('express-promise-router')()
const {
	NotSupp
} = require('../../../controllers/shared')
const {
	rootGet,
	pidGet,
	pidPost,
	pidPut,
} = require('../../../controllers/v1/waitlist')

expRtr.route('/')
	.get(rootGet.func)
	.post(NotSupp)
	.put(NotSupp)

expRtr.route('/orgid/:waitid?')
	.get(pidGet.validate, pidGet.func)
	.post(pidPost.validate, pidPost.func)
	.put(pidPut.validate, pidPut.func)

// EXPORT ROUTES
module.exports = expRtr