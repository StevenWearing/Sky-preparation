const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');

const authRouter = express.Router();


function router(nav) {

  const { register, getLogin, postLogin, logout } = authController(nav);
  
  authRouter.route('/register')
    .post(register);

  authRouter.route('/')
    .get(getLogin)
    .post(passport.authenticate('local', {  // postLogin
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/logout')
    .get(logout);

  return authRouter;
}

module.exports = router;
