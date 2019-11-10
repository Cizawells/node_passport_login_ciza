const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log("mongodb connected"))
.catch(err => console.log(err))

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


//Body parser Middleware
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));