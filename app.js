var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Route = require('./routes');

var app = express();

// allow requests from cross origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


const sequelize = require("./config/sequelize");


// test sequelize db connection

//sequelize
 // .authenticate()
 // .then(() => {
  //  console.log('Connection has been established successfully.');
 // })
//.catch(err => {
 //   console.error('Unable to connect to the database:', err);
  //});

//sequelize.sync().then(() => {
  //console.log('sync successful');
//}).catch(err => {
  //console.log('unable to syn');
//});




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Route);


app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
