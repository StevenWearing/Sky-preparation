const express = require('express');
// const debug = require('debug')('app:scienceAndTechRoutes');

const scienceAndTechRouter = express.Router();
const sql = require('mssql');

function router(nav) {
  scienceAndTechRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from stories where Category = \'scienceAndTech\'');

        res.render(
          'scienceAndTechView',
          {
            nav,
            stories: recordset,
            section: 'Science & Tech'
          }
        );
      }());
    });

  return scienceAndTechRouter;
}


module.exports = router;
