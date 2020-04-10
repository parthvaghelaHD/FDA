const express = require('express')
const router = express.Router();

// require Controllers
const userController = require('../controller/userController');

// middelware of verifyToken
const { verifyToken } = require('../middelware/middelware');

// get register form with get method of register and register an user with post method 
router.get('/user/register', userController.register);
router.post('/user/register', userController.addUser);

// get home page without login and after login dashbord page
router.get('/', userController.getHome)
router.get('/dashbord', userController.dashbord)

//get pages
router.get('/user/about', verifyToken , userController.about);
router.get('/user/contact', verifyToken ,userController.contact);
router.get('/user/offers', verifyToken ,userController.offer);
router.get('/user/help', verifyToken ,userController.help);

// get login page and post login data
router.get('/user/login', userController.getlogin);
router.post('/user/login', userController.authenticate)

//authenticate and get logout page 
router.post('/user/authenticate', userController.authenticate);  
router.get('/user/logout', userController.logout);

module.exports = router;