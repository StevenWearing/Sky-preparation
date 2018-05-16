const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(service) {
  service.use(passport.initialize()); // set up passport stuff AND puts stuff like req.login on request
  service.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
