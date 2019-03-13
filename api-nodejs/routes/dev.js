const Router = require('express-promise-router')
const { check, validationResult } = require('express-validator/check')
const DB = require('../db')
// const Auth = require('../authHandler')
// const { PGPool, handleSuccess, makeTimestamp, runQuery, arrayToString } = require('../libs/shared')
const expRtr = new Router()

const { MUST_MATCH } = process.env

expRtr.route('/:cmd?')
.get(async (req, res) => {
	const { rows } = await DB.query(`SELECT * FROM pg_catalog.pg_tables WHERE tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'sql_%'`)
	res.status(200).json({data: rows})
})
.post([
	check('mustMatch').custom((val) => {
		if (val === MUST_MATCH) {
			return true
		} else {
			throw new Error('Invalid Token')
		}
	}).escape()
], async (req, res) => {
	const errors = validationResult(req)

	if (errors.isEmpty()) {
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
	} else {
		console.log('error')
		return res.status(422).json({ errors: errors.array() })
	}
})
.put(async (req, res) => {
	res.status(403).send('Not Supported')
})

module.exports = expRtr