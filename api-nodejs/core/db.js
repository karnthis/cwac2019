const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE, IS_PROD } = process.env
const { cleanArray } = require('./funcs')

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
// console.log(pgConfig.host)

const PGPool = new require('pg').Pool(pgConfig)

// INTERNAL FUNCTIONS
async function pgQuery(sql) {
	return await PGPool.query(sql).catch(err => console.log(err))
}


function makeWhere(vals = '', field = 'provider_id') {
	valArr = cleanArray(vals.split(`-`))
	return (vals) ? `WHERE ${field} IN (${valArr})` : ''
}

function makeUpdates(updateObj = {}) {
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
	if (x > 1) str = makePlaces(x - 1).concat(', ', str)
	return str
}

function makeMarkers(x) {
	const markerCols = Object.keys(x)
	return {
		markerCols,
		markerData: Object.values(x),
		markerPlaces: makePlaces(markerCols.length),
	}
}

// V2 FUNCTIONS
function makePlaces2(x) {
	return [...Array(x)].map((el, i) => `\$${i+1}`).join(',')
}
function splitSubmitData(x) {
	const columns = Object.keys(x)
	return {
		columns,
		insertData: Object.values(x),
		placeholders: makePlaces2(columns.length),
	}
}
function makeUpdates2(updateObj = {}) {
	const ret = []
	for (const key in updateObj) {
		ret.push(`${key} = '${updateObj[key]}'`)
	}
	return ret.join(',')
}
// END V2 FUNCTIONS

// EXPORTED V2 FUNCTIONS
function openQuery(sql) {
	return pgQuery(sql)
}
function selectQuery(qryObj) {
	const { tbl, columns = '*', where } = qryObj
	const sql = `SELECT ${columns} FROM ${tbl} ${where}`
	return pgQuery(sql)
}
function updateQuery(qryObj) {
	const { dataObj, tbl, where } = qryObj
	const sql = `UPDATE ${tbl} SET ${makeUpdates2(dataObj)} ${where} RETURN *`
	return pgQuery(sql)
}
function insertQuery(qryObj) {
	const { columns, insertData, placeholders } = splitSubmitData(qryObj.data)
	const sql = {
		text: `INSERT INTO ${qryObj.tbl} (${columns}) VALUES (${placeholders}) RETURNING *`,
		values: insertData
	}
	return pgQuery(sql)
}
// END EXPORTED V2 FUNCTIONS

// EXPORTED FUNCTIONS
function query(sql) {
	return pgQuery(sql)
}
function doSelect(qryObj) {
	const {
		tbl,
		cols,
		data
	} = qryObj
	const {
		markerCols,
		markerData,
		markerPlaces
	} = makeMarkers(data)
	const sql = {
		text: `SELECT ${cols} FROM ${tbl} WHERE ${markerCols} = ${markerPlaces}`,
		values: markerData
	}
	return pgQuery(sql)
}

function doUpdate(qryObj) {
	const {
		dataObj,
		tbl,
		inField,
		wVals
	} = qryObj
	const sql = `UPDATE ${tbl} SET ${makeUpdates(dataObj)} ${makeWhere(wVals, inField)}`
	return pgQuery(sql)
}

function doInsert(qryObj, retCols) {
	const {
		tbl,
		data
	} = qryObj
	const {
		markerCols,
		markerData,
		markerPlaces
	} = makeMarkers(data)
	retCols = retCols || '*'
	const sql = {
		text: `INSERT INTO ${tbl} (${markerCols}) VALUES (${markerPlaces}) RETURNING ${retCols}`,
		values: markerData
	}
	return pgQuery(sql)
}
// TOKEN FUNCS
function deleteToken(tkn = '') {
	const sql = {
		text: `DELETE FROM USER_SESSIONS WHERE session_token = $1`,
		values: [tkn]
	}
	return pgQuery(sql)
}

function saveToken(tknObj) {
	const qryObj = {
		tbl: 'USER_SESSIONS',
		data: tknObj,
	}
	return doInsert(qryObj)
}

function findTokenInfo(searchObject) {
	const {
		user,
		stamp,
		type,
		cols
	} = searchObject
	const sql = {
		text: `SELECT ${cols} FROM USER_SESSIONS WHERE user_id = $1 AND ${type} > $2`,
		values: [user, stamp]
	}
	return pgQuery(sql)
}
// END EXPORTED

module.exports = {
	query,
	doSelect,
	doInsert,
	doUpdate,
	// findToken,
	saveToken,
	// refreshToken,
	deleteToken,
	findTokenInfo,

	// V2 Export
	openQuery,
	selectQuery,
	updateQuery,
	insertQuery,
}