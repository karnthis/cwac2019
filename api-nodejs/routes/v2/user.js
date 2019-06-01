const expRtr = new require('express-promise-router')()
const {userSummaryGet,userDetailsGet,userSelfPut} = require('../../controllers/v2/user')

// ROUTING
expRtr.route('/mySummary')
	.get(userSummaryGet.func)

expRtr.route('/myDetails')
	.get(userDetailsGet.func)

expRtr.route('/updateSelf')
	.put(userSelfPut.validate,userSelfPut.func)

	module.exports = expRtr;
