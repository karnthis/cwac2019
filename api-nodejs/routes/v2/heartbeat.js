const expRtr = new require('express-promise-router')()
const { rootGet } = require('../../controllers/v2/heartbeat')

expRtr.route('/')
	.get(rootGet.func)

module.exports = expRtr
