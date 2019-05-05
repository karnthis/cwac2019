// IMPORTS
const { checkToken } = require("../../middleware/tokenManager");
const { passToken, readToken } = require("../../middleware/returnToken");
// ROUTES
const heartbeat = require("./heartbeat");
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


// SWAGGER //
const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		// swagger: '2.0',
		info: {
			title: 'GenerateHealth',
			version: '1.0.0',
			description: 'Swagger for the GenerateHealth CWAC2019 project API',
		},
	},
	apis: ['./routes/v1/swagger.yml'],
	docExpansion : "none"
};
const specs = require('swagger-jsdoc')(options)
const swaggerUi = require('swagger-ui-express');
// END SWAGGER //


// EXPORT
module.exports = app => {
	// NO TOKEN REQUIRED
	app.use("/auth", auth);
	app.use([readToken])
	// END NO TOKEN
	// TOKEN REQUIRED
	// app.use([checkToken]);
	app.use("/heartbeat", heartbeat);
	app.use("/calendar", calendar);
	app.use("/eligibility", eligibility);
	app.use("/inventory", inventory);
	app.use("/provider", provider);
	app.use("/users", users);
	// app.use('/county', county)
	app.use("/referral", referral);
	app.use("/address", address);
	app.use("/waitlist", waitlist);
	app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs))

	// END TOKEN
};
