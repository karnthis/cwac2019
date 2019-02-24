const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const { Pool } = require('pg')
const Passport = require('passport')

let count = 0
let isProd = false

// Misc ENV vars
const { NODE_ENV } = process.env
if (NODE_ENV == 'prod') isProd = true

// Connect PostGres
const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env
const PGPool = new Pool({
	user: PGUSER,
	host: PGHOST,
	database: PGDATABASE,
	password: PGPASSWORD,
	port: PGPORT,
})

/**
 * get logger
 * 1: console + file
 * 2: file
 * 3: error
 */

// todo import models

// set up express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// errors
if (!isProd) {
	app.use(require('errorhandler')())
}

// CORS
const acceptThese = [
	// "findyour.agency",
	// "localhost",
	/https?:\/\/(?:www\.)?findyour\.agency$/gi,
	/https?:\/\/admin\.findyour\.agency$/gi,
	/https?:\/\/api\.findyour\.agency$/gi,
]
const corsConfig = {
	origin: function (origin, callback) {
		console.log(origin)
		let match = false
		for (const regEx in acceptThese) {
			if (acceptThese[regEx].test(origin)) {
				match = true
			}
		}
		if (match || !isProd) {
			callback(null, true)
		} else {
			callback('Not allowed by CORS')
		}
	}
}
app.use(cors(corsConfig));

// GET paths
app.get('/', (req, res) => {
	count += 1
	PGPool.query('SELECT NOW()', (err, res) => {
		console.log(err, res)
	})
	res.send(`I have been visited ${count} times!`)
})

app.get('/elegibility/:org?', (req, res) => {
	let ret = req.params.org | '~none~'
	// count += 1
	res.send(`I am with: ${req.params.org}!`)
})

app.get('/inventory/:org?/', (req, res) => {
	count += 1
	res.send(`I have ${count} many!`)
})

app.get('/calendar/:org?/', (req, res) => {
	count += 1
	res.send(`I have ${count} events!`)
})

// app.get('/', (req, res) => {
// 	count += 1
// 	res.send(`I have been visited ${count} times!`)
// })

// app.get('/', (req, res) => {
// 	count += 1
// 	res.send(`I have been visited ${count} times!`)
// })

// app.get('/', (req, res) => {
// 	count += 1
// 	res.send(`I have been visited ${count} times!`)
// })

// POST paths

// Functions

// Start server
let port = process.env.PROD_PORT || 51516;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});