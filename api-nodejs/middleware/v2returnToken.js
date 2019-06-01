function readToken(req, res, next) {
	console.log(`v2: ${req.signedCookies.ghSession}`)
	console.log(req.body)
	next()
}

module.exports = {
	readToken
}