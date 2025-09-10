const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require("./config/database");
const userRoute = require('./routes/user');
var path = require('path');

const app = express();

mongoose.connect(dbConfig.mongo_uri, {
    dbName : 'userdb',
}).then
(() => {
    console.log("Databse Connected Successfully!!"); 
    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
        console.log("Open in browser: http://localhost:3000");
    });
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.set('view engine','ejs');
//app.set('views', path.join(__dirname, '/app/'));
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
});

//routes
app.get('/',(req,res) => {
    res.redirect('/user');
});

//user routes
app.use("/user", userRoute);