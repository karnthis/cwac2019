
// FUNCTIONS
function makeTimestamp() {
	// deprecated
	return Math.floor(Date.now()/1000)
}

function lbtoa(x = '') {
	return Buffer.from(x).toString('base64')
}
function latob(x = '') {
	return Buffer.from(x, 'base64').toString()
}

function cError(msg = '', err = null) {
	console.dir(err)
	return new Error({err})
}

// OLD VERSION
// function array2Object(x, key) {
// 	return x.reduce((obj, item) => {
// 		obj[item[key]] = item
// 		return obj
// 	}, {})
// }

function array2Object(x, key) {
	return x.reduce((ret, row) => {
		if (!ret[row[key]]) ret[row[key]] = []
		ret[row[key]].push(row)
		return ret
	}, {})
}

function sanitize(data, whitelist) {
	return whitelist.reduce(
		(result, key) => data[key] !== undefined ? Object.assign(result, { [key]: data[key] }) : result, {}
	)
}

function makeUpdates(obj) {
	return Object.keys(obj).map(key => `${key} = '${obj[key]}'`)
	
	
	// return Object.keys(obj).reduce((ret, key) => {
	// 	return (obj[key] !== undefined) ? ret.push(`${key} = ${obj[key]}`) : ret
	// }, [])

}

function makeDateStamp(t) {
	console.dir(t)
	t = parseInt(t)
	t = (isNaN(t)) ? 0 : t
	const dd = new Date()
	dd.setHours(dd.getHours() + t)
	return Math.floor(dd.getTime()/1000)
}

function cleanArray(arr) {
	return arr.filter(x => !isNaN(parseInt(x))).map(x => parseInt(x))
}

function makeOptionals (arr) {
	return arr.map(el => {
		if (el[2] == undefined || el[2] == '') {
			return ''
		} else if (el[0] == 'str') {
			return `${el[1]} = '${el[2]}'`
		} else {
			return `${el[1]} = ${el[2]}`
		}
	}).filter(el => el != '').join()
}

// EXPORTS
module.exports = {
	makeDateStamp,
	makeOptionals,
	makeUpdates,
	cleanArray,
	sanitize,
	array2Object,
	cError,
	lbtoa,
	latob,
}