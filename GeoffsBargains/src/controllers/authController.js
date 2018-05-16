const debug = require('debug')('service:authController');
const { MongoClient } = require('mongodb');
const passport = require('passport');


function authController(nav) {
  function register(req, res) {
    const { username, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'inventory';

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to the server');

        const db = client.db(dbName);

        const col = db.collection('users');
        const user = { 
          username,
          password
        };
        const results = await col.insertOne(user);
        debug(results);
        req.login(results.ops[0], () => {
          res.redirect('/profile');
        });
      } catch (err) {
        debug(err);
      }
    }());
  }

  function getLogin(req, res) {
    res.render('loginView', {
      nav,
      title: 'Login'
    });
  }

  function postLogin() {
      passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/'
        });
    }
    
    function logout(req, res) {
        (async function logout() {
          req.logout();
          res.redirect('/');
        }());
      }



  return {
    register,
    getLogin,
    postLogin,
    logout
  };
}

module.exports = authController;
