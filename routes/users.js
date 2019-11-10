const express = require('express');
const router = express.Router();
const Users = require("../models/users")

//Login Page
router.get('/login', (req, res) => {
    res.render("Login")
})

//Register Page
router.get('/register', (req, res) => {
    res.render("register")
})

router.post("/register", (req, res) => {
const { name, email, password, password2 } = req.body;
const errors = [];

//Check for required Fields
if(!name || !email || !password || !password) {
    errors.push({ msg: "Please fill in all fields"})
}

//Check for password match
if(password != password2) {
    errors.push({ msg: "Password do not match"})
}

//Check for password length
if(password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters"})
}

if(errors.length > 0) {
    res.render("register", {
        errors,
        email,
        password,
        password2
    })
}else {
        Users.findOne({ email: email})
        .then(user => {
            if(user)  {
                console.log(user)
            }else {
                console.log("there is not such user")
            }
        })
}

})
module.exports = router;