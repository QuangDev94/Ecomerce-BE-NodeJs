const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
    } = req.body;
    if (
      !orderItems ||
      !paymentMethod ||
      !itemsPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone ||
      !user
    ) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }

    const response = await OrderService.getOrderDetails(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createOrder,
  getOrderDetails,
};
