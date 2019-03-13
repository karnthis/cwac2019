class SQLObject {
	constructor() {
		// no universal constructor
	}
	valueCount(valLength) {
		let retString = ''
		let i = 1
		while (i <= valLength) {
			retString += `\$${i}`
			if (i != valLength) retString += ', '
			i++
		}
		return retString
	}

	cleanArray(arr) {
		return arr.filter(x => !isNaN(parseInt(x))).map(x => parseInt(x))
	}

	makeWhere(x = '') {
		const ret = cleanArray(x.split('-'))
		return (ret.length) ? `WHERE provider_id IN (${ret})` : ''
	}

	makeUpdate(x = {}) {
		const ret = {
			str: '',
			vals: []
		}
		let count = 1
		for (const i in x) {
			ret.str += `${i} = \$${count}, `
			ret.vals.push(x[i])
			count++
		}
		if (count > 1) ret.str = ret.str.slice(0, -2)
		return ret
	}
}

/**
 * let  obj = {
	tbl: 'CRIBS',
	orgParam: req.params.org || '',
	cols: 
	WHERE provider_id in (${arrayToString(allOrgs)})
}
 */

class QuerySQLObject extends SQLObject {
	constructor(buildObject = {}) {
		// SELECT
		super()
		const { cols, tbl, orgParam } = buildObject
		this.text = `SELECT ${cols||'*'} FROM ${tbl} ${makeWhere(orgParam)}`
	}
}

//todo
class UpdateSQLObject extends SQLObject {
	constructor(buildObject = {}) {
		// UPDATE
		
		super()
		const { newVals, tbl, orgParam } = buildObject
		const { str, vals } = this.makeUpdate(newVals)
		this.text = `UPDATE ${tbl} SET ${str} ${makeWhere(orgParam)}`
		this.values = vals

		this.text = `INSERT INTO ${buildObject.tbl} (effected_id,on_table,updater_id,action,description,previous_data) VALUES (${this.valueCount(arr.length)})`;
		this.values = arr
	}
}

//todo
class InsertSQLObject extends SQLObject {
	constructor(buildObject = {}) {
		// INSERT
		super()
		this.text = `INSERT INTO ${buildObject.tbl} (effected_id,on_table,updater_id,action,description,previous_data) VALUES (${this.valueCount(arr.length)})`;
		this.values = arr
	}
}

//todo
class LogSQLObject extends InsertSQLObject {
	constructor(arr = []) {
		// INSERT (log)
		super()
		this.text = `INSERT INTO TRANSACTION_LOGS (effected_id,on_table,updater_id,action,description,previous_data) VALUES (${this.valueCount(arr.length)})`;
		this.values = arr
	}
}