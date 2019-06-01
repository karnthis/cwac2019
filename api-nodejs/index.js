const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// LOCAL
const { limitRequests } = require("./middleware/limiter");

// Misc ENV vars
const { NODE_ENV, IS_PROD, COOKIE_CODE = 'sekrit', PROD_PORT, IS_LOCAL } = process.env
if (NODE_ENV == 'prod' || IS_PROD == 'yes') isProd = true

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
	apis: [`./routes/v2/swagger.yml`],
	docExpansion : "none"
};
const specs = require('swagger-jsdoc')(options)
const swaggerUi = require('swagger-ui-express');
// END SWAGGER //

// set up express
const app = express();

app.use(`/swagger`, swaggerUi.serve, swaggerUi.setup(specs))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser(COOKIE_CODE))

// CORS
const corsConfig = {
	origin: /.*/
}
app.use(cors())
// app.use(cors(corsConfig))

app.use(limitRequests)

app.get('/', (req, res) => {
	res
	.status(200)
	.json({ data: 'They killed me Mal... Killed me with a sword... How weird is that?' })
})

// HOOK FOR ALL ROUTES //
// require('./routes/v1')(app)
// require('./routes')(app) 
// const test = 
app.use('/v2', require('./routes'))// v2
//TODO: 	TO BE REMOVED
app.use('/dev', require('./routes/dev'))

// Start server //
let port = (IS_LOCAL == 'yes') ? 5555 : PROD_PORT || 51515;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});