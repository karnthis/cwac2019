const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const { Pool } = require('pg')
// const Passport = require('passport')

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

// todo import models?

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
	// PGPool.query('SELECT NOW()', (err, queryRes) => {
	// 	console.log(err, queryRes)
	// })
	res.send(`I have been visited ${count} times!`)
})

app.get('/elegibility/:org?', (req, res) => {
	const org = req.params.org || ''
	let sql = `SELECT * FROM ELIGIBILITY_REQUIREMENTS `
	if (org) {
		const allOrgs = org.split('-')
		sql += `WHERE provider_id in (${arrayToString(allOrgs)})`
	}
	runQuery(sql, res)
})

app.get('/inventory/:org?/', (req, res) => {
	const org = req.params.org || ''
	let sql = `SELECT * FROM CRIBS `
	if (org) {
		const allOrgs = org.split('-')
		sql += `WHERE provider_id in (${arrayToString(allOrgs)})`
	}
	runQuery(sql, res)
})

app.get('/calendar/:org?/', (req, res) => {
	const org = req.params.org || ''
	let sql = `SELECT * FROM CLASSES WHERE is_active = true `
	if (org) {
		const allOrgs = org.split('-')
		sql += `AND provider_id in (${arrayToString(allOrgs)})`
	}
	runQuery(sql, res)
})

app.get('/provider/:org?/', (req, res) => {
	//todo	filter return
	const org = req.params.org || ''
	let sql = `SELECT * FROM PROVIDERS WHERE is_active = true `
	if (org) {
		const allOrgs = org.split('-')
		sql += `AND provider_id in (${arrayToString(allOrgs)})`
	}
	runQuery(sql, res)
})

//todo
app.get('/county/:zip?/', (req, res) => {
	//todo	filter return
	const reqFilter = req.params.zip || ''
	let sql = `SELECT * FROM COUNTIES `
	if (reqFilter) {
		const allFilters = reqFilter.split('--')
		sql += `WHERE county_id in (${arrayToString(allFilters)})`
	}
	runQuery(sql, res)
})


// app.get('/', (req, res) => {
// 	count += 1
// 	res.send(`I have been visited ${count} times!`)
// })

// app.get('/', (req, res) => {
// 	count += 1
// 	res.send(`I have been visited ${count} times!`)
// })

// POST paths

app.post('/auth', (req, res) => {
	// count += 1
	console.log(req.body)
	const { uname, email, pass } = req.body
	const responseObject = {}
	let resCode
	// const login = uname | email
	switch (true) {
		case (!uname && !email):
			responseObject.message = 'Username or Email Address required'
			resCode = 401
			break;
		case (!pass):
			responseObject.message = 'Password required'
			resCode = 401
			break;
		// case (!uname || !email):
		// 	responseObject
		// 	break;
		// case (!uname || !email):
		// 	responseObject
		// 	break;
		default:
			//todo
			const queryObject = {
				text: 'SELECT name, password FROM USERS WHERE name = $1 OR email = $2',
				values: ['uname', 'email'],
			}
			PGPool.query(queryObject, (err, queryRes) => {
				if (err) {
					console.log(err)
					responseObject.message = 'Query Error'
					resCode = 400
				} else {
					if (queryRes && queryRes.rows && queryRes.rows.length) {
						res.rows[0]
	
						responseObject.message = 'Match Found'
					} else {
						responseObject.message = 'No Results'
					}
					resCode = 200
				}
				res.statusCode = resCode
				res.send(responseObject)
			})
	}

	res.statusCode = resCode
	res.send(responseObject)
})

//todo
app.post('/adduser', (req, res) => {
	// console.log(req.body)
	const { uname, email, pass } = req.body
	const queryObject = {
		text: `INSERT INTO USERS ('username', 'password', 'name', 'email', 'role', 'is_active', 'last_updated') VALUES ()`,
		values: ['uname', 'email', 'pass'],
	}
	if (code === mustMatch) {
		PGPool.query(queryObject, (err, queryRes) => {
			console.log(err, queryRes)
			res.statusCode = 200
			res.send('Insert Successful')
		})
	} else {
		res.statusCode = 401
		res.send('Not Authorized')
	}
})

//todo
app.post('/addevent', (req, res) => {
	// console.log(req.body)
	const { uname, email, pass } = req.body
	const queryObject = {
		text: `INSERT INTO USERS () VALUES ()`,
		values: ['uname', 'email', 'pass'],
	}
	if (code === mustMatch) {
		PGPool.query(queryObject, (err, queryRes) => {
			console.log(err, queryRes)
			res.statusCode = 200
			res.send('Insert Successful')
		})
	} else {
		res.statusCode = 401
		res.send('Not Authorized')
	}
})

//todo
app.post('/addprovider', (req, res) => {
	// console.log(req.body)
	const { uname, email, pass } = req.body
	const queryObject = {
		text: `INSERT INTO PROVIDERS ('name', 'phone', 'description', 'hours', 'days_of_operation', 'last_verified', 'is_active', 'last_updated') VALUES ()`,
		values: ['uname', 'email', 'pass'],
	}
	if (code === mustMatch) {
		PGPool.query(queryObject, (err, queryRes) => {
			console.log(err, queryRes)
			res.statusCode = 200
			res.send('Insert Successful')
		})
	} else {
		res.statusCode = 401
		res.send('Not Authorized')
	}
})

//todo
app.post('/add/:addType', (req, res) => {
	// console.log(req.body)
	const { addType } = req.params
	req.body.is_active = true
	// req.body
	// switch (addType) {
	// 	case 'USERS':

	// 		break;
	// 	case 'PROVIDERS':

	// 		break;
	// 	case 'REFERRALS':

	// 		break;
	// 	case 'CRIBS':

	// 		break;
	// 	case 'ADDRESSES':

	// 		break;
	// 	case 'WAITLIST':

	// 		break;
	// 	case 'CLASSES':

	// 		break;
	// 	case 'ELIGIBILITY_REQUIREMENTS':

	// 		break;
	// }

	const beStamped = makeTimestamp()
	const queryObject = {
		values: []
	}
	let colArr4Str = []
	let valueArr4Str = []
	let count = 0 
	for (key in req.body) {
		count += 1
		valueArr4Str.push(`\$${count}`)
		colArr4Str.push(`${key}`)
		queryObject.values.push(req.body[key])
	}
	const colStringPart = colArr4Str.join(`', '`)
	const valStringPart = valueArr4Str.join(`, `)
	queryObject.text = `INSERT INTO ${addType} ('${colStringPart}') VALUES (${valStringPart})`;

	PGPool.query(queryObject, (err, queryRes) => {
		console.log(err, queryRes)
		res.statusCode = 200
		res.send(`Insert Successful: ${queryRes}`)
	})
})

// Dev Routes
const mustMatch = 'updateMe'
app.post('/runsql', (req, res) => {
	// console.log(req.body)
	const { sql, code } = req.body
	const queryObject = {
		text: sql
	}
	if (code === mustMatch) {
		PGPool.query(queryObject, (err, queryRes) => {
			console.log(err, queryRes)
			res.statusCode = 200
			res.send('Insert Successful')
		})
	} else {
		res.statusCode = 401
		res.send('Not Authorized')
	}
})

app.get('/tables', (req, res) => {
	PGPool.query(`SELECT * FROM pg_catalog.pg_tables WHERE tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'sql_%'`, (err, queryRes) => {
		if (err) console.log(err)
		handleSuccess({data: queryRes.rows})
	})
})

// Functions
function makeTimestamp() {
	return Date.now()
}

function runQuery(sql, res) {
	PGPool.query(sql, (err, queryRes) => {
		if (err) {
			handleError(res, {
				err: err,
				msg: 'Query Error',
				code: 400,
			})
		} else {
			handleSuccess(res, {
				data: queryRes.rows,
			})
		}
	})
}

function arrayToString(array) {
	let retString = ''
	for (const i in array) {
		const isInt = parseInt(array[i]) || -1
		retString += `${isInt}, `
	}
	return retString.slice(0, -2) //* trim trailing ', '
}

function handleError(res, errorObj) {
	const { code, msg, err } = errorObj
	const body = {
		message: msg,
		error: err,
	}
	console.log(err)
	res.status(code)
	res.send(JSON.stringify(body))
}

function handleSuccess(res, successObj) {
	const { code, data } = successObj
	// const body = {
	// 	message: msg,
	// 	error: err,
	// }
	res.status(200)
	res.send(JSON.stringify(data))
}

// Start server
let port = process.env.PROD_PORT || 51515;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});