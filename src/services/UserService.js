const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

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
      // encode password
      const hash = bcrypt.hashSync(password, 10);
      // Create a valid user
      const createdUser = await User.create({
        name,
        email,
        password: hash,
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

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      // Check an email exits in database?
      const checkuser = await User.findOne({
        email: email,
      });
      if (checkuser === null) {
        resolve({
          status: "OK",
          message: "The email is not defined",
        });
      }

      // Check password
      const comparePassword = bcrypt.compareSync(password, checkuser.password);
      if (comparePassword) {
        const access_token = await generalAccessToken({
          id: checkuser.id,
          isAdmin: checkuser.isAdmin,
        });
        const refresh_token = await generalRefreshToken({
          id: checkuser.id,
          isAdmin: checkuser.isAdmin,
        });
        resolve({
          status: "OK",
          message: "Success",
          access_token,
          refresh_token,
        });
      } else {
        resolve({
          status: "OK",
          message: "The password is wrong",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check an user exits in database?
      const checkuser = await User.findOne({
        _id: id,
      });
      if (checkuser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

      if (updatedUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: updatedUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
};
