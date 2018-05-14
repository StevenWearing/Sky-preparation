const { MongoClient } = require('mongodb');
const debug = require('debug');

const items = [
  {
    name: 'Eggs',
    price: 1
  },
  {
    name: 'Milk',
    price: 1
  },
  {
    name: 'Onions',
    price: 0.5
  }
];

const url = 'mongodb://localhost:27017';
const dbName = 'inventory'; // create name from here


let client = null;
async function mongo() {

try {
    client = await MongoClient.connect(url);
    debug('Connected correctly to server');

    const db = client.db(dbName);
          
    db.collection('items').remove({}); // remove all documents from collection

    const response = await db.collection('items').insertMany(items);
    debug(response)
    debug(response.result)
} catch (err) {
    debug(err.stack);
}

client.close();
};

mongo();