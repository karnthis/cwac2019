const expRtr = new require('express-promise-router')()
const { rootGet } = require('../../controllers/v2/heartbeat')
const { NotSupp, fakeTkn } = require('../../controllers/shared/')

expRtr.route('/')
	.get(rootGet.func)

module.exports = expRtr
