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

router
  .route("/register")
  .get(renderRegisterForm)
  .post(catchAsync(registerNewUser));

router
  .route("/login")
  .get(renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    login
  );

router.get("/logout", logout);

module.exports = router;
