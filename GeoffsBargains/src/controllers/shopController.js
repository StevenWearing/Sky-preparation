const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('service:shopController');

function shopController(nav) {
  function getShopView(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'inventory';

    (async function mongo() {
      let client = null;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('items');

        const items = await col.find().toArray();
        res.render(
          'shopView',
          {
            nav,
            title: 'Shop',
            items
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }



  function postShopOrder(req, res) {

    const givenOrder = [];
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        givenOrder.push(req.body[i]);
    }

    const url = 'mongodb://localhost:27017';
    const dbName = 'inventory';

    (async function addUserOrder() {
      let client = null;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('orders');

        const confirmedOrder = {
          userId: req.user._id,
          order: givenOrder 
        };
        
        await col.insertOne(confirmedOrder);

        res.render(
          'orderView',
          {
            nav,
            title: 'Order',
            confirmedOrder
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
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
    getShopView,
    postShopOrder,
    middleware
  };
}

module.exports = shopController;
