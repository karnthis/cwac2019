


function verifyAuth(req, res, next) {
	const authArray = req.headers.authorization.split(' ')
	if (/auth/.test(req.path)) next()
	if (authArray[0] != 'Bearer') {
		res.status(401).send('Authorization Required')
	} else {
		const tokens = authArray[1].split('.')
		const refreshTkn = tokens[0]
		const sessionTkn = tokens[1]

		DB.doSelectToken(sessionTkn)
		.then(async result => {
			const stamp = makeDateStamp()
			const { rows = [] } = result
			if (!rows.length) return done(null, false)
			const row = rows[0]
			if (row.session_expires < stamp) {
				if (row.refresh_expires < stamp) {
					res.status(401).send('Token Expired')
				} else {
					//todo	attach token gen
					const tokens = generateToken()
					doTokenUpdate('refresh',row.session_token, tokens)
					req.headers.authorization = `Bearer ${userTkn}.${tokens.refresh_token}.${tokens.session_token}`
					next()
				}
			} else {
				next()
			}
		})
		.catch(err => res.status(400).send(err))
	}
}