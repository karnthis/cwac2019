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
async function openQuery(sql) {
	return await pgQuery(sql)
}
async function selectQuery(qryObj) {
	const { tbl, columns = '*', joins = '', where = '' } = qryObj
	const sql = `SELECT ${columns} FROM ${tbl} ${joins} ${where}`
	return await pgQuery(sql)
	.catch(err => console.dir(`selectQuery: ${err}`))
}
async function updateQuery(qryObj) {
	const { data, tbl, where } = qryObj
	const sql = `UPDATE ${tbl} SET ${makeUpdates2(data)} ${where} RETURN *`
	return await pgQuery(sql)
}
async function insertQuery(qryObj) {
	const { columns, insertData, placeholders } = splitSubmitData(qryObj.data)
	const sql = {
		text: `INSERT INTO ${qryObj.tbl} (${columns}) VALUES (${placeholders}) RETURNING *`,
		values: insertData
	}
	return await pgQuery(sql)
}
// END EXPORTED V2 FUNCTIONS

module.exports = {
	openQuery,
	selectQuery,
	updateQuery,
	insertQuery,
}