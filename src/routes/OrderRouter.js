const express = require("express");
const orderController = require("../controllers/OrderController");
const { authUserMiddleWare } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authUserMiddleWare, orderController.createOrder);
router.get(
  "/get-my-order-all/:id",
  authUserMiddleWare,
  orderController.getMyOrderAll,
);

router.get(
  "/get-my-order-details/:id",
  authUserMiddleWare,
  orderController.getMyOrderDetails,
);

router.delete(
  "/cancel-order/:id",
  authUserMiddleWare,
  orderController.cancelOrder,
);

module.exports = router;
