const express = require('express');

const devRouter = express.Router();

function router() {
  devRouter.route('/')
    .get((req, res) => {
      (async function query() {
        res.render('undex');
      }());
    });

  return devRouter;
}


module.exports = router;
