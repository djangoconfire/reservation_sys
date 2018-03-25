var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const morgan = require('morgan');
var cors = require('cors');

// Connect to mongoose
mongoose.connect('mongodb://localhost/peopleGrove');
var db = mongoose.connection;

// Main App
var app = express();

// handle request before app use - logger MIddleware
app.use(morgan('dev'));

//CORS
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



// Handling CORS Error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

const reservationRoutes = require('./api/routes/reservation');
const authRoutes = require('./api/routes/auth');

// View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);   

// Set Static Folder All Angular Stuffs here
app.use(express.static(path.join(__dirname, 'client')));


// Create route
app.use('/api/slot',reservationRoutes);
app.use('/api/user',authRoutes);

// Handle Custom 404 Error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

//  Handle all kind of error.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;