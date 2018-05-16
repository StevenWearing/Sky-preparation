const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('service:orderController');


function orderController(nav) {
  function getOrderView(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'inventory';

    (async function mongo() {
      let client = null;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('orders');

        const items = await col.find().toArray();
        res.render(
          'orderView',
          {
            nav,
            title: 'Order',
            items
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getMyOrdersView(req, res) {
    const id  = req.user._id;
    const url = 'mongodb://localhost:27017';
    const dbName = 'inventory';
    
    (async function mongo() {
        let client = null;
        try {
            client = await MongoClient.connect(url);
            debug('Connected correctly to server');
            debug(id);

        const db = client.db(dbName);

        const col = await db.collection('orders');

        const orders = await col.find({ userId: id }).toArray();
        debug(orders);
        
        res.render(
          'myOrdersView',
          {
            nav,
            title: 'My Orders',
            orders
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
     res.redirect('/');
    }
  }

  return {
    getOrderView,
    getMyOrdersView,
    middleware
  };
}

module.exports = orderController;
