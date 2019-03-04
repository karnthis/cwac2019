const Router = require('express-promise-router')
const DB = require('../../db')
const { handleRes, cleanArray } = require('../../libs')
const expRtr = new Router()

const cols = ['', '']
const tbl = ''

expRtr.route('/')
	.get(async (req, res) => {
		const { rows } = await DB.query(`SELECT ${cols} FROM USERS`)
		handleRes(res, {data: rows})
	})
	.post(async (req, res) => {
		res.send('Not Supported')
	})
	.put(async (req, res) => {
		res.send('Not Supported')
	})

expRtr.route('/:orgid/:userid?')
	.get(async (req, res) => {
		const { orgid, userid } = req.params
		const sql = {
			cols,
			tbl,
			inField: '',
			wVals: userid || orgid
		}
		const { rows } = await DB.doSelect(sql)
		handleRes(res, {data: rows})
	})
	.post(async (req, res) => {
		// res.send('posted')
		const { body } = req
		const { orgid, userid } = req.params
		let sql = `SELECT ${cols} FROM USERS WHERE ${userMakeWhere(orgid, userid)}`
		const { rows } = await DB.query(sql)
		handleRes(res, {data: rows})
	})
	.put(async (req, res) => {
		// res.send('put-ed')

		const { body } = req
		const { orgid, userid } = req.params
		let sql = `SELECT ${cols} FROM USERS WHERE ${userMakeWhere(orgid, userid)}`
		const { rows } = await DB.query(sql)
		handleRes(res, {data: rows})
	})

// FUNCTIONS
function userMakeWhere(org, user) {
	if (user != undefined) {
		user = cleanArray(user.split(`-`))
		return `user_id IN (${user})`
	} else {
		org = cleanArray(org.split(`-`))
		return `member_of IN (${org})`
	}
}


module.exports = router