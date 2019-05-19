const expRtr = new require('express-promise-router')()
const {oneClassSummaryGet,oneClassFullGet,allClassesSummaryGet,allClassesFullGet,newClassPost,myOrgClassPut} = require('../../controllers/v2/cal')
// ROUTING
expRtr.route('/oneSummary')
	.get(oneClassSummaryGet.validate, oneClassSummaryGet.func)

expRtr.route('/oneFull')
	.get(oneClassFullGet.validate, oneClassFullGet.func)

expRtr.route('/allSummary')
	.get(allClassesSummaryGet.func)

expRtr.route('/allFull')
	.get(allClassesFullGet.func)

expRtr.route('/addOne')
	.post(newClassPost.validate, newClassPost.func)

expRtr.route('/updateMyOne')
	.put(myOrgClassPut.validate, myOrgClassPut.func)

	module.exports = expRtr;
