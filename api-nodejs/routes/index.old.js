const { checkToken } = require("../middleware/v2TokenManager");
const { passToken, readToken } = require("../middleware/v2returnToken");
const { check } = require("express-validator/check");

// API VERSION
const Ver = 'v2'

// ROUTES
const heartbeat = require(`./v1/heartbeat`);
const cal = require(`./v2/cal`);
const elig = require(`./v2/elig`);
const home = require(`./v2/home`);
const inv = require(`./v2/inv`);
const login = require(`./v2/login`);
const org = require(`./v2/org`);
const refer = require(`./v2/refer`);
// const login = require(`./login`);

// SWAGGER //
const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		// swagger: '2.0',
		info: {
			title: 'GenerateHealth',
			version: '2.0.0',
			description: 'Swagger for the GenerateHealth CWAC2019 project API',
		},
	},
	apis: [`./swagger.yml`],
	docExpansion : "none"
};
const specs = require('swagger-jsdoc')(options)
const swaggerUi = require('swagger-ui-express');
// END SWAGGER //

// EXPORT
module.exports = app => {
	// NO TOKEN REQUIRED
	app.use(`/login`, login);
	app.use([readToken])
	// END NO TOKEN
	// TOKEN REQUIRED
	// app.use([checkToken]);
	app.use(`/heartbeat`, heartbeat);
	app.use(`/cal`, cal);
	app.use(`/elig`, elig);
	app.use(`/home`, home);
	app.use(`/inv`, inv);
	app.use(`/org`, org);
	app.use(`/refer`, refer);

	app.use(`/swagger`, swaggerUi.serve, swaggerUi.setup(specs))

	// END TOKEN
};