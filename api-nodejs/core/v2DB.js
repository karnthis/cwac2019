const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE, IS_PROD } = process.env

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

const PGPool = new require('pg').Pool(pgConfig)

// BASE FUNCTIONS
async function pgQuery(sql) {
	return await PGPool.query(sql).catch(err => console.log(err))
}
// END BASE FUNCTIONS

// V2 INTERNAL FUNCTIONS
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
// END INTERNAL V2 FUNCTIONS

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

module.exports = {
	openQuery,
	selectQuery,
	updateQuery,
	insertQuery,
}