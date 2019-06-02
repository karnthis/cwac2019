const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// LOCAL
const { limitRequests } = require("./middleware/limiter");

// Misc ENV vars
const { NODE_ENV, IS_PROD, COOKIE_CODE = 'sekrit', PROD_PORT, IS_LOCAL } = process.env
if (NODE_ENV == 'prod' || IS_PROD == 'yes') isProd = true

// set up express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser(COOKIE_CODE))

// CORS
const corsConfig = {
	credentials: true,
	origin: /.*/
}
// app.use(cors())
app.use(cors(corsConfig))

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