const express = require("express");
const router = express.Router();
const { 
  loginController, 
  registerController, 
  registerUser, 
  loginUser, 
  logoutUser 
} = require("../controllers/authController");

// Auth routes
router.get("/login", loginController);
router.post("/login", loginUser);
router.get("/register", registerController);
router.post("/register", registerUser);
router.get("/logout", logoutUser);

module.exports = router;
