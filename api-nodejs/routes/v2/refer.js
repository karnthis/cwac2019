const expRtr = new require('express-promise-router')()
const { NotSupp } = require('../../controllers/shared/')
const {myOrgAllReferredGet,myOrgAllRefereeGet,myOrgReferPost} = require('../../controllers/v2/elig')
// TODO
// ROUTING
expRtr.route('/fromMyOrg')
	.get(myOrgAllReferredGet)

expRtr.route('/toMyOrg')
	.get(myOrgAllRefereeGet)

expRtr.route('/addOne')
	.post(myOrgReferPost)

	module.exports = expRtr;
