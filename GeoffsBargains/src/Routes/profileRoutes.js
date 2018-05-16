const express = require('express');
const profileController = require('../controllers/profileController');

const profileRouter = express.Router();

function router(nav) {
  const { getProfileView, getById, middleware } = profileController(nav);
  profileRouter.use(middleware);

  profileRouter.route('/')
    .get(getProfileView);

  return profileRouter;
}


module.exports = router;
