const express = require('express');
// const debug = require('debug')('app:storyRoutes');

const storyRouter = express.Router();
const sql = require('mssql');

function router(nav) {
  storyRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id).query('select * from stories where StoryID = @id ');
        [req.story] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render(
        'storyView',
        {
          nav,
          story: req.story
        }
      );
    });

  return storyRouter;
}


module.exports = router;
