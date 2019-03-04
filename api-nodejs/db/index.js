const {
	PGUSER,
	PGPASSWORD,
	PGHOST,
	PGPORT,
	PGDATABASE
} = process.env
const {
	Pool
} = require('pg')
const {
	cleanArray
} = require('../libs')

const PGPool = new Pool({
	user: PGUSER,
	host: PGHOST,
	database: PGDATABASE,
	password: PGPASSWORD,
	port: PGPORT,
})

// FUNCTIONS
const makeWhere = (vals = '', field = 'provider_id') => {
	valArr = cleanArray(vals.split(`-`))
	return (vals) ? `WHERE ${field} IN (${valArr})` : ''
}

const makeUpdates = (updateObj = {}) => {
	let retString = ''
	for (const key in updateObj) {
		retString += `${key} = `
		const parsed = parseInt(updateObj[key])
		if (isNaN(parsed)) {
			retString += `'${updateObj[key]}'`
		} else {
			retString += `${parsed}`
		}
		retString += `, `
	}
	return retString.slice(0, -2) //* trim trailing ', '
}

const makeInserts = (dataArray = []) => {
	let retString = ''
	for (const i in dataArray) {
		retString += `${i} = `
		if (isNaN(parseInt(x))) {
			retString += `'${updateObj[i]}'`
		} else {
			retString += `${parseInt(updateObj[i])}`
		}
		retString += `, `
	}
	return retString.slice(0, -2) //* trim trailing ', '
}

// EXPORTED FUNCTIONS
const query = (sql) => PGPool.query(sql)

const doSelect = (qryObj) => {
	const { cols, tbl, inField, wVals } = qryObj
	const sql = `SELECT ${cols} FROM ${tbl} ${makeWhere(wVals, inField)}`
	return PGPool.query(sql)
}

const doUpdate = (qryObj) => {
	const { dataObj, tbl, inField, wVals } = qryObj
	const sql = `UPDATE ${tbl} SET ${makeUpdates(dataObj)} ${makeWhere(wVals, inField)}`
	return PGPool.query(sql)
}

const doInsert = (text, params) => {
	// PGPool.query(text, params)

	const { cols, tbl, inField, wVals } = qryObj
	// const sql = `SELECT ${cols} FROM ${tbl} ${makeWhere(wVals, inField)}`
	makeUpdates(obj)
	const sql = `INSERT INTO ${tbl} (${cols}) VALUES ${makeWhere(wVals, inField)}`
	return PGPool.query(sql)
}

module.exports = {
	query,
	doSelect,
	doUpdate,
}