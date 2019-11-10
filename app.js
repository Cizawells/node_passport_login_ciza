const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const app = express();

//Passport config
require("./config/passport")(passport);

const db = require("./config/keys").localURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Body parser Middleware
app.use(express.urlencoded({ extended: true }));

//Express-session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//connect flash middleware
app.use(flash());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Global variables
// app.use((req, res, next) => {
//   console.log("request something");
//   res.locals.success_msg = req.flash("success_msg");

//   next()
// });

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
