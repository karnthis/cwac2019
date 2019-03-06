const Router = require('express-promise-router')
const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../db')
const { makeTimestamp } = require('../../libs')
const expRtr = new Router()

//*	done
const cols = [
	'inv_id',
	'provider_id',
	'inv_count',
	'inv_type',
	]
const tbl = 'INVENTORY'

expRtr.route('/')
	//*	done
	.get([], async (req, res) => {
		const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
		res.status(200).json({data: rows})
	})
	//*	done
	.post([
		check('provider_id').isInt(),
		check('inv_count').isInt(),
		//*	NOT REQUIRED
		check('inv_type').trim().escape(),
	], async (req, res) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			console.log('pass')
			const {
				provider_id,
				inv_count,
				inv_type,
			} = req.body
			const sql = {
				tbl,
				data: {
					provider_id,
					inv_count,
					inv_type,
				}
			}
			const { rows } = await DB.doInsert(sql)
			res.status(200).json({ rows: rows })
		} else {
			console.log('error')
			return res.status(422).json({ errors: errors.array() })
		}
	})
	//*	done
	.put([], async (req, res) => {
		res.status(403).send('Not Supported')
	})

	expRtr.route('/:inv_id')
	//*	done
	.get([
		param('inv_id').isInt(),
	], async (req, res) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.inv_id}'`)
			res.status(200).json({data: rows})
		} else {
			console.log('error')
			return res.status(422).json({ errors: errors.array() })
		}
	})
	//*	done
	.post([], async (req, res) => {
		res.status(403).send('Not Supported')
	})
	//todo
	.put([
		param('inv_id').isInt(),
		check('inv_count').isInt({ min: 0, max: 99 }).optional(),
		check('isDispense').isBoolean(),
	], async (req, res) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			const { inv_count, isDispense } = req.body
			let sql = `UPDATE ${tbl} SET inv_count = ${isDispense ? 'inv_count - 1' : inv_count} WHERE inv_id = ${req.params.inv_id}`
			const { rows } = await DB.query(sql)
			res.status(200).json({ rows: rows })
		} else {
			console.log('error')
			return res.status(422).json({ errors: errors.array() })
		}
		const { orgid, userid } = req.params
		
		// handleRes(res, {data: rows})
	})

// FUNCTIONS

// EXPORT ROUTES
module.exports = expRtr