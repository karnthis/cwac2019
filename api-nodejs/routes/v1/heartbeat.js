const expRtr = new require('express-promise-router')()
const {
	rootGet,
} = require('../../controllers/v1/heartbeat')

expRtr.route('/')
	.get(rootGet.func)

module.exports = expRtr
