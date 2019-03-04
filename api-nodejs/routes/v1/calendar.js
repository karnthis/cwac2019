const Router = require('express-promise-router')
const db = require('../../db')
const libs = require('../../libs')
const router = new Router()

router.route('/')
	.get((req, res) => {
		const org = req.params.org || ''
		let sql = `SELECT * FROM ELIGIBILITY_REQUIREMENTS `
		if (org) {
			const allOrgs = org.split('-')
			sql += `WHERE provider_id in (${arrayToString(allOrgs)})`
		}
		runQuery(sql, res)
	})
	.post((req, res) => {
		res.send('posted')
	})

router.route('/:orgid')
	.get((req, res) => {
		const org = req.params.org || ''
		let sql = `SELECT * FROM ELIGIBILITY_REQUIREMENTS `
		if (org) {
			const allOrgs = org.split('-')
			sql += `WHERE provider_id in (${arrayToString(allOrgs)})`
		}
		runQuery(sql, res)
	})
	.post((req, res) => {
		res.send('posted')
	})




module.exports = router