const Argon2 = require('argon2')
const Crypto = require('crypto')

function generateToken() {
	const tokenSet = {
		refresh_token: crypto.randomBytes(52).toString('hex'),
		refresh_expires: expires(),
		session_token: crypto.randomBytes(52).toString('hex'),
		session_expires: expires()
	}

	return tokenSet
}



pidPut.func = async (req, res)=> {
	const errors = validationResult(req)
	if (errors.isEmpty()) {

	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
}



function verifyAuth(req, res, next) {
	const authArray = req.headers.authorization.split(' ')
	if (/auth/.test(req.path)) next()
	if (authArray[0] != 'Bearer') {
		res.status(401).send('Authorization Required')
	} else {
		const tokens = authArray[1].split('.')
		const userTkn = tokens[0]
		const refreshTkn = tokens[1]
		const sessionTkn = tokens[2]

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

	.then(async result => {
		
	})




router.post('/:userId/verify', (req, res, next) => {
  const authHeader = req.headers.authorization
  const { userId } = req.params
  const data = req.body
    
  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: 'FORBIDDEN'
    })
  } else {
    const token = getBearerToken(authHeader)

    if (token) {
      // This promise returns the userId of this token
      // We will validate whether the current authenticated user has access to update the current userId. 
      return verifyTokenAndGetUID(token)
        .then((userId) => {
          if (req.auth && req.auth.userId && userId === req.auth.userId) {
            return userUpdate(userId, data)
          } else {
            res.status(401).json({
              status: 401,
              message: 'UNAUTHORIZED'
            })
          }
        })
        .catch((err) => {
          logger.logError(err)

          return res.status(401).json({
            status: 401,
            message: 'UNAUTHORIZED'
          })
        })
    } else {
      return res.status(403).json({
        status: 403,
        message: 'FORBIDDEN'
      })
    }
  }
})