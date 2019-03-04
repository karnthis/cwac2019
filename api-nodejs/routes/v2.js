// const Router = require('express').Router()
const Router = require('express-promise-router')()
// const Auth = require('../authHandler')
const { makeTimestamp, runQuery, arrayToString } = require('../libs/shared')

// Router.use()

Router.route('/elegibility/:org?')
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

	//todo
	Router.route('/inventory/:org?')
	.get((req, res) => {
		const org = req.params.org || ''
		let sql = `SELECT * FROM CRIBS `
		if (org) {
			const allOrgs = org.split('-')
			sql += `WHERE provider_id in (${arrayToString(allOrgs)})`
		}
		runQuery(sql, res)
	})
	.post((req, res) => {
		const { type } = req.body
		switch (type) {
			case ('set'):
				// things
				break;
			case ('set'):
				// things
				break;
			case ('set'):
				// things
				break;
			default:
				// do nothing
		}


		res.send('posted')
	})

	//todo
	Router.route('/calendar/:org?/:id?')
	.get((req, res) => {
		const org = req.params.org || ''
		let sql = `SELECT * FROM CLASSES WHERE is_active = true `
		if (org) {
			const allOrgs = org.split('-')
			sql += `AND provider_id in (${arrayToString(allOrgs)})`
		}
		runQuery(sql, res)
	})
	.post((req, res) => {
		const { org, id } = req.params
		res.send('posted')
	})

	//todo
Router.route('/provider/:org?')
	.get((req, res) => {
		const org = req.params.org || ''
		let sql = `SELECT * FROM PROVIDERS WHERE is_active = true `
		if (org) {
			const allOrgs = org.split('-')
			sql += `AND provider_id in (${arrayToString(allOrgs)})`
		}
		runQuery(sql, res)
	})
	.post((req, res) => {
		res.send('posted')
	})

	//todo
Router.route('/user/:id?')
.get((req, res) => {
	const org = req.params.org || ''
	let sql = `SELECT * FROM PROVIDERS WHERE is_active = true `
	if (org) {
		const allOrgs = org.split('-')
		sql += `AND provider_id in (${arrayToString(allOrgs)})`
	}
	runQuery(sql, res)
})
.post((req, res) => {
	res.send('posted')
})

	//todo
	Router.route('/county/:zip?')
	.get((req, res) => {
			//todo	filter return
		const reqFilter = req.params.zip || ''
		let sql = `SELECT * FROM COUNTIES `
		if (reqFilter) {
			const allFilters = reqFilter.split('--')
			sql += `WHERE county_id in (${arrayToString(allFilters)})`
		}
		runQuery(sql, res)
	})
	.post((req, res) => {
		res.send('posted')
	})






module.exports = Router