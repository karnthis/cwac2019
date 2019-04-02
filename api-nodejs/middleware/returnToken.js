function passToken(req, res, next) {
	if (req.headers && req.headers.authorization) {
		res.set({
			authorization: req.headers.authorization
		})
	}
	next()
}

module.exports = {
	passToken
}