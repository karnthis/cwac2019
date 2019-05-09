const expRtr = new require('express-promise-router')()
const { NotSupp } = require('../../controllers/shared/')
const {} = require('../../controllers/v2/inventory')
// TODO
// ROUTING
expRtr.route('/')
	.get(rootGet.func)
	.post(rootPost.validate, rootPost.func)
	.put(NotSupp)