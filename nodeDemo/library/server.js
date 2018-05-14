const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const server = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'library',
  password: 'wazxdseq123iopl,',
  server: 'pslibrary-steven.database.windows.net',
  database: 'PSLibrary',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch(err => debug(err));

server.use(morgan('tiny')); // gets minimal response info
server.use(express.static(path.join(__dirname, '/public/'))); // looks in public for css and js stuff by default
server.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
server.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
server.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
server.set('views', './src/views');
server.set('view engine', 'ejs');

const nav = [
  { link: '/uk', title: 'UK', id: 'ukTab' },
  { link: '/world', title: 'World', id: 'worldTab' },
  { link: '/technology', title: 'Science & Tech', id: 'scienceAndTechTab' }
];

const ukRouter = require('./src/routes/ukRoutes')(nav);
const worldRouter = require('./src/routes/worldRoutes')(nav);
const scienceAndTechRouter = require('./src/routes/scienceAndTechRoutes')(nav);
const storyRouter = require('./src/routes/storyRoutes')(nav);
const devRouter = require('./src/routes/devRoutes')();

server.use('/uk', ukRouter);
server.use('/world', worldRouter);
server.use('/technology', scienceAndTechRouter);
server.use('/story', storyRouter);
server.use('/under-development', devRouter);
server.get('/', (req, res) => {
  (async function query() {
    debug(0);
    const request = new sql.Request();
    debug(1);
    const { recordset } = await request.query('select * from stories');
    debug(2);
    res.render(
      'index',
      {
        nav,
        stories: recordset
      }
    );
  }());
});

server.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
