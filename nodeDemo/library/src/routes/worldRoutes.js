const express = require('express');

const worldRouter = express.Router();
const sql = require('mssql');

function router(nav) {
  worldRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from stories where category = \'world\'');

        res.render(
          'worldView',
          {
            nav,
            stories: recordset,
            section: 'World'
          }
        );
      }());
    });

  return worldRouter;
}


module.exports = router;
