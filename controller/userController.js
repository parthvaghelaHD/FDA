const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require('bcryptjs')

const blogUser = require("../model/userModel");
const restaurant = require('../model/restaurant')
const { Message } = require("../commonFunction/commonfunction");

//register page render
function register(req, res) {
  res.render("register", { email: req.userName });
}

// login Page render
function getlogin(req, res) {
  res.render("login", { msg: req.flash("Error"), email: req.userName });
}

//get a home page
function getHome(req, res) {
  res.render("index", { msg: req.flash("Error"), email: req.userName });
}

//get a dashbord page after login
async function dashbord(req, res) {
  console.log(req.body)
  try {
    var found = await restaurant.find({ })
    let data = found.length;
    // found.map((item) => {
      res.render("dashbord", { email: req.userName , found , data});
    // })
    console.log(name)
    console.log(address)
    // res.render("dashbord", { email: req.userName , name , address});
    } catch (err) {
    res.send(Message(400, false, `Error occured while finding restaurants : ${err}`));
  }
}

// logout function nd clear cookie
function logout(req, res) {
  res.clearCookie("token").redirect("/user/login");
}

// contact us page
function contact(req, res){
  res.render('contact-us');
}

function about(req, res){
  res.render('about');
}

function help(req, res){
  res.render('help');
}

function offer(req, res){
  res.render('offers');
}

function thanks(req, res) {
  res.render('thanks')
}

//register User
async function addUser(req, res) {
  let addUser = new blogUser(req.body);
  try {
     addUser.save();
    res.redirect("/user/login");
  } catch (err) {
    res.redirect('/user/register')
  }
}

//for verifying Cookie
function cookiesVerify(req, res, token) {
  if (req.cookies.token === undefined) {
    res
      .cookie("token", token, { maxAge: 900000, httpOnly: true })
      .redirect("/dashbord" );
  } else {
    res.redirect("/user/post");
  }
}

//authenticate user
async function authenticate(req, res) {
   console.log(req.body)
  try {
    const user = await blogUser.findOne(
      { userName: req.body.userName, password: req.body.password },
      { password: 0 }
    );
      try{
      jwt.sign({ user }, process.env.SECRET_KEY, function(err, token) {
        if (token) {
          cookiesVerify(req, res, token);
        }
      });
    }
      catch(e) {
      console.log(e)
      res.redirect("/user/login" );
    }
  } catch (err) {
    res.redirect("/user/login");
  }
}

//exports modules
module.exports = {
  addUser,
  authenticate,
  getlogin,
  register,
  dashbord,
  logout,
  getHome,
  cookiesVerify,
  contact,
  about,
  thanks,
  help,
  offer
};