const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// Misc ENV vars
const { NODE_ENV, IS_PROD, COOKIE_CODE } = process.env
if (NODE_ENV == 'prod' || IS_PROD == 'yes') isProd = true

// set up express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser(COOKIE_CODE))

// CORS
const corsConfig = {
	origin: /.*/
}
// app.use(cors())
app.use(cors(corsConfig))

app.get('/', (req, res) => {
	res
	.status(200)
	.json({ data: 'They killed me Mal... Killed me with a sword... How weird is that?' })
})

// HOOK FOR ALL ROUTES //
require('./routes/v1')(app)

//TODO: 	TO BE REMOVED
app.use('/dev', require('./routes/dev'))

// Start server //
let port = process.env.PROD_PORT || 5555;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});