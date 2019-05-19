const expRtr = new require('express-promise-router')()
const {myOrgAllReferredGet,myOrgAllRefereeGet,myOrgReferPost} = require('../../controllers/v2/refer')
// TODO
// ROUTING
expRtr.route('/fromMyOrg')
	.get(myOrgAllReferredGet.func)

expRtr.route('/toMyOrg')
	.get(myOrgAllRefereeGet.func)

expRtr.route('/addOne')
	.post(myOrgReferPost.func)

	module.exports = expRtr;
