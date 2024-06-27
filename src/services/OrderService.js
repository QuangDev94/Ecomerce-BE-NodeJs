const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
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
    } = newOrder;

    try {
      const promise = orderItems.map(async (item) => {
        const productChecking = await Product.findOne({
          _id: item?.product,
          quality: { $gte: item?.amount },
        });
        if (productChecking) {
          return {
            status: "OK",
            message: "SUCCESS",
          };
        } else {
          return {
            status: "OK",
            message: "ERROR",
            data: item?.product,
          };
        }
      });
      const result = await Promise.all(promise);
      const checkResult = result.every((i) => {
        return i.message === "SUCCESS";
      });
      if (checkResult) {
        const updatePromise = orderItems.map(async (item) => {
          const productChecking = await Product.findOneAndUpdate(
            {
              _id: item?.product,
            },
            {
              $inc: {
                quality: -item?.amount,
                solded: +item?.amount,
              },
            },
            {
              new: true,
            },
          );
        });
        const createOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            city,
            phone,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user,
        });
        if (createOrder) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createOrder,
          });
        }
      } else {
        reject({
          status: "OK",
          message: "Product Out Of Stock",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getOrderDetails = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findOne({
        userId: id,
      });
      if (order === null) {
        resolve({
          status: "ERROR",
          message: "The order is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createOrder,
  getOrderDetails,
};
