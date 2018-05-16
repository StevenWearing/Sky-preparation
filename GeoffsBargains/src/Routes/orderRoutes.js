const express = require('express');
const orderController = require('../controllers/orderController');

const orderRouter = express.Router();

function router(nav) {
  const { getOrderView, getMyOrdersView, middleware } = orderController(nav);
  orderRouter.use(middleware);

  orderRouter.route('/myOrders')
    .get(getMyOrdersView);


  return orderRouter;
}


module.exports = router;
