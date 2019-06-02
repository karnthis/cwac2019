function readToken(req, res, next) {
	console.log(`v2: ${req.signedCookies.ghSession}`)
	console.log(`path: ${req.originalUrl}`)
	console.log(`method: ${req.method}`)
	next()
}

module.exports = {
	readToken
}