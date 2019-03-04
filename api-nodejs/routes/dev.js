const Router = require('express').Router()
// const Auth = require('../authHandler')
const { PGPool, handleSuccess, makeTimestamp, runQuery, arrayToString } = require('../libs/shared')

	const mustMatch = 'updateMe'
	Router.post('/runsql', (req, res) => {
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
	
	Router.get('/tables', (req, res) => {
		PGPool.query(`SELECT * FROM pg_catalog.pg_tables WHERE tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'sql_%'`, (err, queryRes) => {
			if (err) console.log(err)
			handleSuccess(res, {data: queryRes.rows})
		})
	})

module.exports = Router