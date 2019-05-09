const { checkToken } = require("../../middleware/tokenManager");
const { passToken, readToken } = require("../../middleware/returnToken");
const { check } = require("express-validator/check");

// API VERSION
const Ver = 'v2'

// ROUTES
const heartbeat = require(`./${Ver}/heartbeat`);
const cal = require(`./${Ver}/cal`);
const elig = require(`./${Ver}/elig`);
const home = require(`./${Ver}/home`);
const inv = require(`./${Ver}/inv`);
const login = require(`./${Ver}/login`);
const org = require(`./${Ver}/org`);
const refer = require(`./${Ver}/refer`);
// const login = require(`./${Ver}/login`);

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
	apis: [`./${Ver}/swagger.yml`],
	docExpansion : "none"
};
const specs = require('swagger-jsdoc')(options)
const swaggerUi = require('swagger-ui-express');
// END SWAGGER //

// EXPORT
module.exports = app => {
	// NO TOKEN REQUIRED
	app.use(`${Ver}/auth`, auth);
	app.use([readToken])
	// END NO TOKEN
	// TOKEN REQUIRED
	// app.use([checkToken]);
	app.use(`${Ver}/heartbeat`, heartbeat);
	app.use(`${Ver}/cal`, cal);
	app.use(`${Ver}/elig`, elig);
	app.use(`${Ver}/home`, home);
	app.use(`${Ver}/inv`, inv);
	app.use(`${Ver}/login`, login);
	app.use(`${Ver}/org`, org);
	app.use(`${Ver}/refer`, refer);

	app.use(`${Ver}/swagger`, swaggerUi.serve, swaggerUi.setup(specs))

	// END TOKEN
};