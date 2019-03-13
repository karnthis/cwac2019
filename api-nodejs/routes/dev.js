const Router = require('express-promise-router')
const DB = require('../db')
// const Auth = require('../authHandler')
// const { PGPool, handleSuccess, makeTimestamp, runQuery, arrayToString } = require('../libs/shared')
const expRtr = new Router()

const mustMatch = 'updateMe'

expRtr.route('/:cmd?')
.get(async (req, res) => {
	const { rows } = await DB.query(`SELECT * FROM pg_catalog.pg_tables WHERE tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'sql_%'`)
	res.status(200).json({data: rows})
})
.post(async (req, res) => {
	const { sql, tables } = req.body
	switch (req.params.cmd) {
		case 'delete':
			for (const one in tables) {
				const _ = await DB.query(`DELETE FROM ${tables[one]}`)
			}
			res.status(200).json({data: 'done'})
			break;
		case 'drop':
			for (const one in tables) {
				const _ = await DB.query(`DROP TABLE IF EXISTS ${tables[one]}`)
			}
			res.status(200).json({data: 'done'})
			break;
		default:
			for (const stmnt in sql) {
				const _ = await DB.query(sql[stmnt])
			}
			res.status(200).json({data: 'done'})
	}
})
.put(async (req, res) => {
	res.status(403).send('Not Supported')
})

module.exports = expRtr