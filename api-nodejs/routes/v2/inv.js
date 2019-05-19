const expRtr = new require('express-promise-router')()
const {userOrgInvGet,userOrgInvPut,userOrgDispPut,allOrgInvGet} = require('../../controllers/v2/elig')
// TODO
// ROUTING
expRtr.route('/myOrg')
	.get(userOrgInvGet)
	.put(userOrgInvPut)

expRtr.route('/myOrgDispense')
	.put(userOrgDispPut)

expRtr.route('/AllOrgs')
	.get(allOrgInvGet)

	module.exports = expRtr;
