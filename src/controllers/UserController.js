const UserService = require("../services/UserServices");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required!",
      });
    } else if (!isValidEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "The email is invalid!",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The password is equal confirmPassword!",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createUser,
};
