const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('service');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const service = express();
const port = process.env.PORT || 3000;

service.use(morgan('tiny')); // gets minimal response info
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));
service.use(cookieParser());
service.use(session({ secret: 'geoff' }));

require('./src/config/passport.js')(service);

service.use(express.static(path.join(__dirname, '/public/'))); // looks in public for css and js stuff by default
service.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
service.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
service.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
service.set('views', './src/views');
service.set('view engine', 'ejs');

const nav = [
  { link: '/shop', title: 'Shop' },
  { link: '/basket', title: 'Basket' }
];

const shopRouter = require('./src/routes/shopRoutes')(nav);
const orderRouter = require('./src/routes/orderRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);
const profileRouter = require('./src/routes/profileRoutes')(nav);

service.use('/shop', shopRouter);
service.use('/order', orderRouter);
service.use('/', authRouter);
service.use('/profile', profileRouter);

service.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
