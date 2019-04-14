function passToken(req, res, next) {
	if (req.headers && req.headers.authorization) {
		res.set({
			authorization: req.headers.authorization
		})
	}
	next()
}

function readToken(req, res, next) {
	console.log(req.signedCookies.ghSession)
	next()
}

module.exports = {
	readToken
}