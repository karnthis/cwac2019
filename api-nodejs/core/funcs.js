
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

function makeDateStamp(t) {
	t = parseInt(t)
	t = (isNaN(t)) ? 0 : t
	const dd = new Date()
	dd.setHours(dd.getHours() + t)
	return Math.floor(dd.getTime()/1000)
}

function cleanArray(arr) {
	return arr.filter(x => !isNaN(parseInt(x))).map(x => parseInt(x))
}

// EXPORTS
module.exports = {
	makeDateStamp,
	cleanArray,
	cError,
	lbtoa,
	latob,
}