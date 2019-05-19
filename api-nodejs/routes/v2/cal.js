const expRtr = new require('express-promise-router')()
const { NotSupp } = require('../../controllers/shared/')
const {} = require('../../controllers/v2/elig')
// TODO
// ROUTING
expRtr.route('/')
	.get(NotSupp)
	.post(NotSupp)
	.put(NotSupp)

	module.exports = expRtr;
