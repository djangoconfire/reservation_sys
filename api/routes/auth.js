var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check_auth');
var UserController = require('../controllers/userController');

// Register a User
router.post('/signup' , UserController.user_signup);

// make login here
router.post('/login',UserController.user_login);

// get all registered users
router.get('/registered_users',checkAuth,UserController.get_all_users);

module.exports = router;