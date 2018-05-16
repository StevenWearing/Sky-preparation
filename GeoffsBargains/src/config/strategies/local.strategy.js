const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('service:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'inventory';
    (async function mongo() {
      let client = null;
      try {
        client = await MongoClient.connect(url);

        debug('Connected correctly to the server');

        const db = client.db(dbName);
        const col = db.collection('users');

        const user = await col.findOne({ username });

        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());
  }));
};