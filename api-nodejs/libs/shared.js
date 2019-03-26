// Connect PostGres
const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env
const { Pool } = require('pg')
const PGPool = new Pool({
	user: PGUSER,
	host: PGHOST,
	database: PGDATABASE,
	password: PGPASSWORD,
	port: PGPORT,
})

// Import Log Class
const { LogSQLObject } = require('./classes')

// let toLog = new LogSQLObject([1,2])

// Functions
function makeDateStamp() {
	return Math.floor(Date.now()/1000)
}

function runQuery(PGPool, sql, res) {
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

function cleanArray(arr) {
	return arr.filter(x => !isNaN(parseInt(x))).map(x => parseInt(x))
}

function userMakeWhere(org, user) {
	if (user != undefined) {
		user = cleanArray(user.split(`-`))
		return `user_id IN (${user})`
	} else {
		org = cleanArray(org.split(`-`))
		return `member_of IN (${org})`
	}
}

function makeWhere(vals = '', field = 'provider_id') {
	valArr = cleanArray(vals.split(`-`))
	return (vals) ? `WHERE ${field} IN (${valArr})` : ''
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
	res.status(200).json(data)
}

module.exports = {
	cleanArray,
	makeWhere,
	makeDateStamp,
	handleRes: handleSuccess,
	handleSuccess,
	handleError,
	// arrayToString: arrayToString,
	// runQuery: runQuery,
}