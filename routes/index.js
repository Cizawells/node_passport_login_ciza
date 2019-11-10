const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("Welcome");
});

router.get(
  "/dashboard",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log("yesae");
      return next();
    }

    req.flash("error", "Please login to view this ressource");
    res.redirect("/users/login");
  },
  (req, res) => {
    res.render("dashboard", {
      user: req.user
    });
  }
);

router.get("/logout", (req, res) => {
  console.log("loggin out");
  req.logout();
  res.redirect("/users/login");
});
module.exports = router;
