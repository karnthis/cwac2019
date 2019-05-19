const expRtr = new require('express-promise-router')()
const {userOrgInvGet,userOrgInvPut,userOrgDispPut,allOrgInvGet} = require('../../controllers/v2/inv')
// TODO
// ROUTING
expRtr.route('/myOrg')
	.get(userOrgInvGet.func)
	.put(userOrgInvPut.validate, userOrgInvPut.func)

expRtr.route('/myOrgDispense')
	.put(userOrgDispPut.func)

expRtr.route('/AllOrgs')
	.get(allOrgInvGet.func)

	module.exports = expRtr;
