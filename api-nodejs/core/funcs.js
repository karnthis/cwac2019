
// FUNCTIONS
function makeTimestamp() {
	return Math.floor(Date.now()/1000)
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
	makeTimestamp,
	makeDateStamp,
	cleanArray,
}