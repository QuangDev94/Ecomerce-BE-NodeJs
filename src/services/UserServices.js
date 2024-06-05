const User = require("../models/UserModel");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = newUser;

    try {
      // Check an email exits in database?
      const checkuser = await User.findOne({
        email: email,
      });
      if (checkuser !== null) {
        resolve({
          status: "OK",
          message: "The email is already",
        });
      }
      // Create a valid user
      const createdUser = await User.create({
        name,
        email,
        password,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
};
