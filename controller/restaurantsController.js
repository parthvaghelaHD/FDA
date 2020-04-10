const jwt = require("jsonwebtoken");
const moment = require('moment')
require("dotenv").config();

const restaurant = require("../model/restaurant");
const { Message } = require("../commonFunction/commonfunction");
  
// for add a post from perticular user
async function addrestaurant(req, res) {
  let createrestaurant = new restaurant(req.body);
  try {
    createrestaurant.save();
    console.log(createrestaurant);
  } catch (err) {
    console.log(err);
  }
}

async function listofrestaurants(req, res){
  try {
    let found = await restaurant.find({});
    res.render('dashbord' , { name , address } )
  } catch (err) {
    res.send(Message(400, false, `Error occured while finding restaurants : ${err}`));
  }
}

module.exports = { listofrestaurants, addrestaurant };
