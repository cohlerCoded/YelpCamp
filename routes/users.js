const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const {
  renderRegisterForm,
  renderLoginForm,
  registerNewUser,
  login,
  logout,
} = require("../controllers/users");

router.get("/register", renderRegisterForm);

router.post("/register", catchAsync(registerNewUser));

router.get("/login", renderLoginForm);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  login
);

router.get("/logout", logout);

module.exports = router;
