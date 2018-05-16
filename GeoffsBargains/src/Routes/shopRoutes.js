const express = require('express');
const shopController = require('../controllers/shopController');

const shopRouter = express.Router();

function router(nav) {
  const { getShopView, postShopOrder, middleware } = shopController(nav);
  shopRouter.use(middleware);

  shopRouter.route('/')
    .get(getShopView);
   
   shopRouter.route('/postShopOrder') 
    .post(postShopOrder);

  return shopRouter;
}


module.exports = router;
