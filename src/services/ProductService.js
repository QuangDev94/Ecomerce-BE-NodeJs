const Product = require("../models/ProductModel");

const createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        name: data.name,
      });

      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The Product is already",
        });
      } else {
        const createdProduct = await Product.create({
          ...data,
        });
        if (createdProduct) {
          resolve({
            status: "OK",
            message: "Success",
            data: createdProduct,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (productId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "The product is not defined",
        });
      } else {
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          data,
          { new: true }
        );
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: updatedProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: productId,
      });
      if (product === null) {
        resolve({
          status: "ERROR",
          message: "The product is not definded",
        });
      } else {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: product,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allProduct = await Product.find();
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "The product is not definded",
        });
      } else {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        resolve({
          status: "OK",
          message: "SUCCESS",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getAll,
  deleteProduct,
};
