const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const passport = require("passport");

//Login Page
router.get("/login", (req, res) => {
  res.render("Login", {
    success_reg_msg: req.flash("success_reg_msg"),
    error: req.flash("error")
  });
});

//Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  //Check for required Fields
  if (!name || !email || !password || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check for password match
  if (password != password2) {
    errors.push({ msg: "Password do not match" });
  }

  //Check for password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      email,
      password,
      password2
    });
  } else {
    Users.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email is already taken" });
        res.render("register", {
          errors,
          email,
          password,
          password2
        });
      } else {
        const newUser = new Users({
          name,
          email,
          password
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash("success_reg_msg", "you are registered successfully");
                res.redirect("/users/login");
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      }
    });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
