const Router = require('express-promise-router')
const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../db')
const { handleRes, cleanArray } = require('../../libs')
const expRtr = new Router()

const cols = [
	'full_name',
	'member_of',
	'email'
	]
const tbl = 'USERS'

expRtr.route('/')
	//*	done
	.get([], async (req, res) => {
		const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
		res.status(200).json({data: rows})
	})
	//*	done
	.post([], async (req, res) => {
		res.status(403).send('Not Supported')
	})
	//*	done
	.put([], async (req, res) => {
		res.status(403).send('Not Supported')
	})

expRtr.route('/:orgid/:userid?')
	//*	done
	.get([], async (req, res) => {
		const { orgid, userid } = req.params
		const sql = {
			cols,
			tbl,
			data: (userid) ? {user_id:userid} : {member_of:orgid}
		}
		console.log(sql)
		const { rows } = await DB.doSelect(sql)
		res.status(200).json({data: rows})
	})
	//*	done
	.post([
		param('orgid').isInt(),//.toInt(),
		check('username').isLength({ min: 3 }).trim().escape(),
		check('password').isLength({ min: 8 }).trim().escape(),
		check('cpassword').custom((val, {req}) => {
			if (val !== req.body.password) {
				throw new Error('Password fields do not match')
			} else {
				return true
			}
		}).escape(),
		check('full_name').isLength({ min: 4 }).trim().escape(),
		check('email').isEmail().normalizeEmail(),
	], async (req, res) => {
		const errors = validationResult(req)

		if (errors.isEmpty()) {
			console.log('pass')
			const {
				username,
				password,
				full_name,
				email,
			} = req.body
			const sql = {
				tbl,
				data: {
					member_of: req.params.orgid,
					username,
					password,
					full_name,
					email,
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
	//todo
	.put([
		param('userid').isInt()
	], async (req, res) => {
		// res.send('put-ed')

		const { body } = req
		const { orgid, userid } = req.params
		let sql = `SELECT ${cols} FROM USERS WHERE ${userMakeWhere(orgid, userid)}`
		const { rows } = await DB.query(sql)
		handleRes(res, {data: rows})
	})

// FUNCTIONS


// EXPORT ROUTES
module.exports = expRtr
