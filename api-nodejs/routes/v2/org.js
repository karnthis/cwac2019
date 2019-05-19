const expRtr = new require('express-promise-router')()
const {userOrgGet,userOrgPut,allOrgSummaryGet,allOrgFullGet,addOrgPost} = require('../../controllers/v2/org')

// ROUTING
expRtr.route('/myOrg')
	.get(userOrgGet.func)
	.put(userOrgPut.validate, userOrgPut.func)

expRtr.route('/allSummary')
	.get(allOrgSummaryGet.func)

expRtr.route('/allFull')
	.get(allOrgFullGet.func)

expRtr.route('/addOne')
	.post(addOrgPost.validate, addOrgPost.func)

	module.exports = expRtr;
