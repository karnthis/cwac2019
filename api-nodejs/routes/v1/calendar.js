const Router = require('express-promise-router')
const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../db')
const { makeTimestamp } = require('../../libs')
const expRtr = new Router()

//todo
const cols = [
	'class_id',
	'provider_id',
	'creator_id',
	'class_name',
	'class_description',
	'address_id',
	'date_of_class',
	'time_of_class',
	'current_attendee_count',
	'max_attendees',
	'class_status',
	]
const tbl = 'CLASSES'

expRtr.route('/')
	//*	done
	.get([], async (req, res) => {
		const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
		res.status(200).json({data: rows})
	})
	//todo
	.post([
		check('provider_name').isLength({ min: 3 }).trim().escape(),
		check('phone').isMobilePhone().trim().escape(),
		check('hours').isLength({ min: 3 }).trim().escape(),
		//*	NOT REQUIRED
		check('desc').trim().escape(),
		check('days').isLength({ max: 7 }).trim().escape(),
	], async (req, res) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			console.log('pass')
			const {
				provider_name,
				phone,
				hours,
				desc,
				days,
			} = req.body
			const sql = {
				tbl,
				data: {
					provider_name,
					phone,
					hours,
					description: desc || null,
					days_of_operation: days || null,
					last_verified: makeDateStamp(),
				}
			}
			const { rows } = await DB.doInsert(sql)
			res.status(200).json({ rows: rows })
			// res.status(200).json({ rows: 'hit' })
		} else {
			console.log('error')
			return res.status(422).json({ errors: errors.array() })
		}
	})
	//*	done
	.put([], async (req, res) => {
		res.status(403).send('Not Supported')
	})

	expRtr.route('/:orgid')
	//*	done
	.get([
		param('orgid').isInt(),
	], async (req, res) => {
		const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.orgid}'`)
		res.status(200).json({data: rows})
	})
	//*	done
	.post([], async (req, res) => {
		res.status(403).send('Not Supported')
	})
	//todo
	.put([
		param('orgid').isInt(),
		check('provider_name').trim().escape(),
		check('phone').trim().escape(),
		check('hours').trim().escape(),
	], async (req, res) => {
		const { body } = req
		const { orgid, userid } = req.params
		let sql = `SELECT ${cols} FROM USERS WHERE ${userMakeWhere(orgid, userid)}`
		const { rows } = await DB.query(sql)
		// handleRes(res, {data: rows})
	})

// FUNCTIONS

// EXPORT ROUTES
module.exports = expRtr