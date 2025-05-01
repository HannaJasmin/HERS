var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const { sequelize } = require('./config/db');
var logger = require('morgan');
const connectToPostgres = async () => await sequelize.authenticate();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hersRouter = require('./routes/hers');
var triggerhersRouter=require('./routes/triggerhers');
var organizationRouter=require('./routes/organizations');
var locationsRouter=require('./routes/locations');
var departmentorroomsRouter=require('./routes/departmentorrooms');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hers', hersRouter)
app.use('/triggerhers',triggerhersRouter);
app.use('/organizations',organizationRouter);
app.use('/locations',locationsRouter);
app.use('/departmentorrooms',departmentorroomsRouter)


app.use((req, res, next) => {
    console.log(`Request method: ${req.method}, URL: ${req.url}`);
    next();
})

connectToPostgres()
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.error("could not connect to the database.Existing now...", err);
    });
module.exports = app;
