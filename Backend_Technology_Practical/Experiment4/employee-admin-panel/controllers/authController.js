const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Show login page
exports.loginController = (req, res) => {
  res.render("auth/login");
};

// Show register page
exports.registerController = (req, res) => {
  res.render("auth/register");
};

// Handle registration
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.send("Error: " + err.message);
  }
};

// Handle login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send("Invalid Email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid Password");

    req.session.user = user;
    res.redirect("/dashboard");
  } catch (err) {
    res.send("Error: " + err.message);
  }
};

// Logout
exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
