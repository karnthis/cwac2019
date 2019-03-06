const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')

// const Passport = require('passport')

let count = 0
let isProd = false

// Misc ENV vars
const { NODE_ENV, IS_PROD } = process.env
if (NODE_ENV == 'prod' || IS_PROD == 'yes') isProd = true

// todo import models?
const v1Routes = require('./routes/v1')
const authRoutes = require('./routes/auth')
const devRoutes = require('./routes/dev')

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

	/https?:\/\/(?:www\.)?findyour\.agency$/gi,
	/https?:\/\/findyour\.agency$/gi,
	/https?:\/\/admin\.findyour\.agency$/gi,
	/https?:\/\/api\.findyour\.agency$/gi,
]
const corsConfig = {
	origin: isProd ? /findyour\.agency$/ : /.*/
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

v1Routes(app)
// app.use('/v1', v1Routes)
// app.use('/auth', authRoutes)
app.use('/dev', devRoutes)

// POST paths

// app.post('/auth', (req, res) => {
// 	// count += 1
// 	console.log(req.body)
// 	const { uname, email, pass } = req.body
// 	const responseObject = {}
// 	let resCode
// 	// const login = uname | email
// 	switch (true) {
// 		case (!uname && !email):
// 			responseObject.message = 'Username or Email Address required'
// 			resCode = 401
// 			break;
// 		case (!pass):
// 			responseObject.message = 'Password required'
// 			resCode = 401
// 			break;
// 		// case (!uname || !email):
// 		// 	responseObject
// 		// 	break;
// 		// case (!uname || !email):
// 		// 	responseObject
// 		// 	break;
// 		default:
// 			//todo
// 			const queryObject = {
// 				text: 'SELECT name, password FROM USERS WHERE name = $1 OR email = $2',
// 				values: ['uname', 'email'],
// 			}
// 			PGPool.query(queryObject, (err, queryRes) => {
// 				if (err) {
// 					console.log(err)
// 					responseObject.message = 'Query Error'
// 					resCode = 400
// 				} else {
// 					if (queryRes && queryRes.rows && queryRes.rows.length) {
// 						res.rows[0]
	
// 						responseObject.message = 'Match Found'
// 					} else {
// 						responseObject.message = 'No Results'
// 					}
// 					resCode = 200
// 				}
// 				res.statusCode = resCode
// 				res.send(responseObject)
// 			})
// 	}

// 	res.statusCode = resCode
// 	res.send(responseObject)
// })

// //todo
// app.post('/adduser', (req, res) => {
// 	// console.log(req.body)
// 	const { uname, email, pass } = req.body
// 	const queryObject = {
// 		text: `INSERT INTO USERS ('username', 'password', 'name', 'email', 'role', 'is_active', 'last_updated') VALUES ()`,
// 		values: ['uname', 'email', 'pass'],
// 	}
// 	if (code === mustMatch) {
// 		PGPool.query(queryObject, (err, queryRes) => {
// 			console.log(err, queryRes)
// 			res.statusCode = 200
// 			res.send('Insert Successful')
// 		})
// 	} else {
// 		res.statusCode = 401
// 		res.send('Not Authorized')
// 	}
// })

// //todo
// app.post('/addevent', (req, res) => {
// 	// console.log(req.body)
// 	const { uname, email, pass } = req.body
// 	const queryObject = {
// 		text: `INSERT INTO USERS () VALUES ()`,
// 		values: ['uname', 'email', 'pass'],
// 	}
// 	if (code === mustMatch) {
// 		PGPool.query(queryObject, (err, queryRes) => {
// 			console.log(err, queryRes)
// 			res.statusCode = 200
// 			res.send('Insert Successful')
// 		})
// 	} else {
// 		res.statusCode = 401
// 		res.send('Not Authorized')
// 	}
// })

// //todo
// app.post('/addprovider', (req, res) => {
// 	// console.log(req.body)
// 	const { uname, email, pass } = req.body
// 	const queryObject = {
// 		text: `INSERT INTO PROVIDERS ('name', 'phone', 'description', 'hours', 'days_of_operation', 'last_verified', 'is_active', 'last_updated') VALUES ()`,
// 		values: ['uname', 'email', 'pass'],
// 	}
// 	if (code === mustMatch) {
// 		PGPool.query(queryObject, (err, queryRes) => {
// 			console.log(err, queryRes)
// 			res.statusCode = 200
// 			res.send('Insert Successful')
// 		})
// 	} else {
// 		res.statusCode = 401
// 		res.send('Not Authorized')
// 	}
// })

// //todo
// app.post('/add/:addType', (req, res) => {
// 	// console.log(req.body)
// 	const { addType } = req.params
// 	req.body.is_active = true
// 	// req.body
// 	// switch (addType) {
// 	// 	case 'USERS':

// 	// 		break;
// 	// 	case 'PROVIDERS':

// 	// 		break;
// 	// 	case 'REFERRALS':

// 	// 		break;
// 	// 	case 'CRIBS':

// 	// 		break;
// 	// 	case 'ADDRESSES':

// 	// 		break;
// 	// 	case 'WAITLIST':

// 	// 		break;
// 	// 	case 'CLASSES':

// 	// 		break;
// 	// 	case 'ELIGIBILITY_REQUIREMENTS':

// 	// 		break;
// 	// }

// 	const beStamped = makeTimestamp()
// 	const queryObject = {
// 		values: []
// 	}
// 	let colArr4Str = []
// 	let valueArr4Str = []
// 	let count = 0 
// 	for (key in req.body) {
// 		count += 1
// 		valueArr4Str.push(`\$${count}`)
// 		colArr4Str.push(`${key}`)
// 		queryObject.values.push(req.body[key])
// 	}
// 	const colStringPart = colArr4Str.join(`', '`)
// 	const valStringPart = valueArr4Str.join(`, `)
// 	queryObject.text = `INSERT INTO ${addType} ('${colStringPart}') VALUES (${valStringPart})`;

// 	PGPool.query(queryObject, (err, queryRes) => {
// 		console.log(err, queryRes)
// 		res.statusCode = 200
// 		res.send(`Insert Successful: ${queryRes}`)
// 	})
// })

// Dev Routes



// Start server
let port = process.env.PROD_PORT || 51515;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});