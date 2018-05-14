const express = require('express');

const ukRouter = express.Router();
const sql = require('mssql');

function router(nav) {
  ukRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from stories where category = \'uk\'');

        res.render(
          'ukView',
          {
            nav,
            stories: recordset,
            section: 'UK'
          }
        );
      }());
    });

  return ukRouter;
}


module.exports = router;
