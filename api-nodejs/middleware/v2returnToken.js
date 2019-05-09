function readToken(req, res, next) {
	console.log(req.signedCookies.ghSession)
	next()
}

module.exports = {
	readToken
}