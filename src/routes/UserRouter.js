const express = require("express");
const { authMiddleWare } = require("../middleware/authMiddleware");
const userController = require("../controllers/UserController");

const router = express.Router();
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", authMiddleWare, userController.deleteUser);

module.exports = router;
