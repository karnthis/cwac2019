const Passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy;
const DB = require('../db')

//todo	move to shared functions
function makeDateStamp() {
	return Math.floor(Date.now()/1000)
}
// ========== //

function stratFunc(token = '', done) {
	console.log('pp hit')

	DB.doSelectToken(token)
	.then(result => {
		const stamp = makeDateStamp()
		const { rows = [] } = result
		if (!rows.length) return done(null, false)
		const row = rows[0]
		if (row.session_expires < stamp) {
			if (row.refresh_expires < stamp) {
				return done(null, false)
			} else {
				
			}
		}
	})
	.catch(err => done(err))


    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }


	Passport.use(new BearerStrategy(	));

// findToken,
// saveToken,
// refreshToken,

// Passport.authenticate('bearer', { session: false })


module.exports = Passport