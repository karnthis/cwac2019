function readToken(req, res, next) {
	console.log(`v2: ${req.signedCookies.ghSession}`)
	next()
}

module.exports = {
	readToken
}