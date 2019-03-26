
// FUNCTIONS
function makeTimestamp() {
	return Math.floor(Date.now()/1000)
}

function cleanArray(arr) {
	return arr.filter(x => !isNaN(parseInt(x))).map(x => parseInt(x))
}

// EXPORTS
module.exports = {
	makeTimestamp,
	cleanArray,
}