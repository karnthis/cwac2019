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

//todo	move to shared functions
function makeDateStamp(t) {
	t = parseInt(t)
	t = (isNaN(t)) ? 0 : t
	const dd = new Date()
	dd.setHours(dd.getHours() + t)
	return Math.floor(dd.getTime()/1000)
}
// ========== //

// FUNCTIONS
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
	if (x > 1) str = makePlaces(x-1).concat(', ', str)
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

// EXPORTED FUNCTIONS
function query(sql) {
	return PGPool.query(sql)
}

function doSelect(qryObj) {
	const { tbl, cols, data } = qryObj
	const { markerCols, markerData, markerPlaces } = makeMarkers(data)
	const sql = {
		text: `SELECT ${cols} FROM ${tbl} WHERE ${markerCols} = ${markerPlaces}`,
		values: markerData
	}
	return PGPool.query(sql)
}

function doSelectToken(tkn) {
	const qryObj = { 
		tbl: 'USER_SESSIONS',
		cols: [
			'user_id',
			'refresh_token',
			'refresh_expires',
			'session_token',
			'session_expires',
		],
		data: {
			session_token: tkn,
		},
	}
	return doSelect(qryObj)
}

async function doTokenUpdate(type = '', stkn = '', replacement = {}) {
	const tbl = 'USER_SESSIONS'
	const delqry = {
		text: `DELETE FROM USER_SESSIONS WHERE session_token = ?`,
		values: [
			stkn
		]
	}
	const _ = await query(delqry)
	if (type == 'refresh') {
		const insqry = {
			tbl,
			data: replacement,
		}
		const _ = await doInsert(insqry)
		return true
	} else {
		return false
	}
	

}

function doUpdate(qryObj) {
	const { dataObj, tbl, inField, wVals } = qryObj
	const sql = `UPDATE ${tbl} SET ${makeUpdates(dataObj)} ${makeWhere(wVals, inField)}`
	return PGPool.query(sql)
}

function doInsert(qryObj) {
	const { tbl, data } = qryObj
	const { markerCols, markerData, markerPlaces } = makeMarkers(data)
	const sql = {
		text: `INSERT INTO ${tbl} (${markerCols}) VALUES (${markerPlaces})`,
		values: markerData
	}
	return PGPool.query(sql)
}

function doDelete(qryObj) {
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

	doSelectToken,
	// doRefreshToken,
}
