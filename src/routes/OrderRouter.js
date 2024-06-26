const express = require("express");
const orderController = require("../controllers/OrderController");
const { authUserMiddleWare } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authUserMiddleWare, orderController.createOrder);

module.exports = router;
