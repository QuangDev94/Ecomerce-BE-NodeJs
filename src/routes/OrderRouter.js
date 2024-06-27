const express = require("express");
const orderController = require("../controllers/OrderController");
const { authUserMiddleWare } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authUserMiddleWare, orderController.createOrder);
router.get(
  "/get-order-details/:id",
  authUserMiddleWare,
  orderController.getOrderDetails,
);
module.exports = router;
