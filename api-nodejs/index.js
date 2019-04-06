const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')

let count = 0
let isProd = false

// Misc ENV vars
const { NODE_ENV, IS_PROD } = process.env
if (NODE_ENV == 'prod' || IS_PROD == 'yes') isProd = true

// todo import models?
const v1Routes = require('./routes/v1')

// set up express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// errors
if (!isProd) {
	app.use(require('errorhandler')())
}

// CORS
const corsConfig = {
	origin: isProd ? /findyour\.agency$/ : /.*/
}
app.use(cors(corsConfig))

app.use((req, res, next) => {
	console.log(req.headers.authorization)
	next()
})

// GET paths
app.get('/', (req, res) => {
	res.send(`I have been visited ${++count} times!`)
})

v1Routes(app)

//TODO: 	TO BE REMOVED
app.use('/dev', require('./routes/dev'))


// Start server
let port = process.env.PROD_PORT || 51515;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});