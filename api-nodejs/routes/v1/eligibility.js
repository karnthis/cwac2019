const Router = require('express-promise-router')
const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../db')
const { makeTimestamp } = require('../../libs')
const expRtr = new Router()

//todo
const cols = [
	'provider_id',
	'public_assistance',
	'mother_17_or_younger',
	'is_client',
	'client_of_other',
	'trimester',
	'residency_requirement',
	'must_meet_all_criteria',
	]
const tbl = 'ELIGIBILITY_REQUIREMENTS'

expRtr.route('/')
	//*	done
	.get([], async (req, res) => {
		const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
		res.status(200).json({data: rows})
	})
	//todo
	.post([
		check('provider_id').isInt(),
		check('public_assistance').isBoolean(),
		check('mother_17_or_younger').isBoolean(),
		check('is_client').isBoolean(),
		check('client_of_other').trim().escape(),
		check('trimester').isInt(),
		check('residency_requirement').trim().escape(),
		check('must_meet_all_criteria').isBoolean(),
	], async (req, res) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			console.log('pass')
			const {
				provider_id,
				public_assistance,
				mother_17_or_younger,
				is_client,
				client_of_other,
				trimester,
				residency_requirement,
				must_meet_all_criteria,
			} = req.body
			const sql = {
				tbl,
				data: {
					provider_id,
					public_assistance,
					mother_17_or_younger,
					is_client,
					client_of_other,
					trimester,
					residency_requirement,
					must_meet_all_criteria,
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