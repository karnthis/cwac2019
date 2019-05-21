const expRtr = new require('express-promise-router')()
const {userOrgEligGet,userOrgEligPut,allOrgEligGet} = require('../../controllers/v2/elig')
// TODO
userOrgEligGet
userOrgEligPut
allOrgEligGet
// ROUTING
expRtr.route('/myOrg')
	.get(userOrgEligGet.func)
	.put(userOrgEligPut.validate, userOrgEligPut.func)

expRtr.route('/allOrg')
	.get(allOrgEligGet.func)

	module.exports = expRtr;
