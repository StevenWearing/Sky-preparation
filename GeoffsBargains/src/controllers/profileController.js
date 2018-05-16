const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('service:profileController');


function profileController(nav) {
  function getProfileView(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'inventory';

    (async function mongo() {
      try {
        res.render(
          'profileView',
          {
            nav,
            title: 'Profile'
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }


  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
     res.redirect('/');
    }
  }

  return {
    getProfileView,
    middleware
  };
}

module.exports = profileController;
