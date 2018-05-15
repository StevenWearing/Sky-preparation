const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');


function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp'; // create name from here

    (async function mongo() {
      let client = null;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('books2');

        const books = await col.find().toArray();
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params; // looks for what's in the {} in req.params
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client = null;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('books2');

        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);
        
        book.details = await bookService.getBookById(book.bookId);
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function middleware(req, res, next) { // protects entire book route from non-users
    // if (req.user) {
    next();
    // } else {
    //  res.redirect('/');
    // }
  }

  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
