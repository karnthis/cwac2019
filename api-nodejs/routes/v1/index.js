// IMPORTS
const { checkToken } = require("../../middleware/tokenManager");
const { passToken } = require("../../middleware/returnToken");
// ROUTES
const calendar = require("./calendar");
// const county = require('./county')
const eligibility = require("./eligibility");
const inventory = require("./inventory");
const provider = require("./provider");
const users = require("./user");
const auth = require("./auth");
const referral = require("./referral");
const address = require("./address");
const waitlist = require("./waitlist");
const { check } = require("express-validator/check");

// EXPORT
module.exports = app => {
	app.use("/auth", auth);
	// USE ROUTES
	// app.use([
	// 	check("authorization")
	// 		.isLength({ min: 16 })
	// 		.trim()
	// 		.escape(),
	// 	checkToken,
	// 	passToken
	// ]);
	app.use("/calendar", calendar);
	app.use("/eligibility", eligibility);
	app.use("/inventory", inventory);
	app.use("/provider", provider);
	app.use("/users", users);
	// app.use('/county', county)
	app.use("/referral", referral);
	app.use("/address", address);
	app.use("/waitlist", waitlist);
};
