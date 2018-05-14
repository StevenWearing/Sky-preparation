// const express = require('express');

// const bookRouter = express.Router();
// const sql = require('mssql');
// // const debug = require('debug')('app:bookRoutes');

// function router(nav) {
// //   const books = [
// //     {
// //       title: 'War and Peace',
// //       genre: 'Historical Fiction',
// //       author: 'Lev Nikolayevich Tolstoy',
// //       read: false
// //     },
// //     {
// //       title: 'The wind in the Willows',
// //       genre: 'Fantasy',
// //       author: 'Kenneth Grahame',
// //       read: false
// //     },
// //     {
// //       title: 'Life on the Mississippi',
// //       genre: 'History',
// //       author: 'Mark Twain',
// //       read: false
// //     },
// //     {
// //       title: 'Childhood',
// //       genre: 'Biography',
// //       author: 'Lev Nikolayevich Tolstoy',
// //       read: false
// //     }
// //   ];
//   bookRouter.route('/') // Everything that goes through /books goes through this router
//     .get((req, res) => {
//       (async function query() {
//         const request = new sql.Request();

//         const { recordset } = await request.query('select * from books');

//         res.render(
//           'bookListView',
//           {
//             nav,
//             title: 'Library',
//             books: recordset
//           }
//         );
//       }());
//     });


//   bookRouter.route('/:id')
//     .all((req, res, next) => {
//       (async function query() {
//         const { id } = req.params; // looks for what's in the {} in req.params
//         const request = new sql.Request();
//         const { recordset } = await request.input('id', sql.Int, id)
//           .query('select * from books where id = @id');
//         [req.book] = recordset; // [req.book] === recordset[0], IF CONSFUSING CHANGE RULE
//         next();
//       }());
//     })
//     .get((req, res) => {
//       res.render(
//         'bookView',
//         {
//           nav,
//           title: 'Library',
//           book: req.book
//         }
//       );
//     });

//   return bookRouter;
// }


// module.exports = router;
