const Passport = require('passport')
BearerStrategy = require('passport-http-bearer').Strategy;
const DB = require('../core/db')

Passport.use(new BearerStrategy(


	
  function(token, done) {
		console.log('pp hit')
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));

// findToken,
// saveToken,
// refreshToken,
// Passport.authenticate('bearer', { session: false })


module.exports = Passport