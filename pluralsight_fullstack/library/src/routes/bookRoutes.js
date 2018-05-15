const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);

  bookRouter.route('/') // Everything that goes through /books goes through this router
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}


module.exports = router;
