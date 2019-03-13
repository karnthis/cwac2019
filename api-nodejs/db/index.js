const {
	PGUSER,
	PGPASSWORD,
	PGHOST,
	PGPORT,
	PGDATABASE,
	IS_PROD
} = process.env
const {
	Pool
} = require('pg')
const {
	cleanArray
} = require('../libs')

let pgConfig
if (!IS_PROD) {
	pgConfig = {
		user: 'postgres',
		host: 'localhost',
		database: 'postgres',
		password: 'postgres',
		port: '5432',
	}
} else {
	pgConfig = {
		user: PGUSER,
		host: PGHOST,
		database: PGDATABASE,
		password: PGPASSWORD,
		port: PGPORT,
	}
}

const PGPool = new Pool(pgConfig)

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

function makePlaces(x) {
	let str = `\$${x}`
	if (x > 1) str = makePlaces(x-1).concat(', ', str)
	return str
}

const makeMarkers = (x) => {
	const markerCols = Object.keys(x)
	return {
		markerCols,
		markerData: Object.values(x),
		markerPlaces: makePlaces(markerCols.length),
	}
}

// EXPORTED FUNCTIONS
const query = (sql) => PGPool.query(sql)

const doSelect = (qryObj) => {
	const { tbl, cols, data } = qryObj
	const { markerCols, markerData, markerPlaces } = makeMarkers(data)
	const sql = {
		text: `SELECT ${cols} FROM ${tbl} WHERE ${markerCols} = ${markerPlaces}`,
		values: markerData
	}
	return PGPool.query(sql)
}

const doUpdate = (qryObj) => {
	const { dataObj, tbl, inField, wVals } = qryObj
	const sql = `UPDATE ${tbl} SET ${makeUpdates(dataObj)} ${makeWhere(wVals, inField)}`
	return PGPool.query(sql)
}

const doInsert = (qryObj) => {
	const { tbl, data } = qryObj
	const { markerCols, markerData, markerPlaces } = makeMarkers(data)
	const sql = {
		text: `INSERT INTO ${tbl} (${markerCols}) VALUES (${markerPlaces})`,
		values: markerData
	}
	return PGPool.query(sql)
}

module.exports = {
	query,
	doSelect,
	doInsert,
	doUpdate,
}
