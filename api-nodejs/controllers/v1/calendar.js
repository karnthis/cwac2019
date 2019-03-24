const Router = require('express-promise-router')
const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')
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

const rootGet = {}
const rootPost = {}
const orgidGet = {}
const orgidPut = {}

rootGet.func = async (req, res) => {
		const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
		res.status(200).json({data: rows})
	}
	
	rootPost.validate = [
		check('provider_name').isLength({ min: 3 }).trim().escape(),
		check('phone').isMobilePhone().trim().escape(),
		check('hours').isLength({ min: 3 }).trim().escape(),
		//*	NOT REQUIRED
		check('desc').trim().escape(),
		check('days').isLength({ max: 7 }).trim().escape(),
	]
	
	rootPost.func = async (req, res) => {
		//todo
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
					last_verified: makeTimestamp(),
				}
			}
			const { rows } = await DB.doInsert(sql)
			res.status(200).json({ rows: rows })
			// res.status(200).json({ rows: 'hit' })
		} else {
			console.log('error')
			return res.status(422).json({ errors: errors.array() })
		}
	}

	orgidGet.validate = [
		param('orgid').isInt(),
	]
	
	orgidGet.func = async (req, res) => {
		const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.orgid}'`)
		res.status(200).json({data: rows})
	}
	
	orgidPut.validate = [
		param('orgid').isInt(),
		check('provider_name').trim().escape(),
		check('phone').trim().escape(),
		check('hours').trim().escape(),
	]
	
	orgidPut.func = async (req, res) => {
		//todo
		const { body } = req
		const { orgid, userid } = req.params
		let sql = `SELECT ${cols} FROM USERS WHERE ${userMakeWhere(orgid, userid)}`
		const { rows } = await DB.query(sql)
		// handleRes(res, {data: rows})
	}

// EXPORT ROUTES
module.exports = {
	rootGet,
	rootPost,
	orgidGet,
	orgidPut,
}