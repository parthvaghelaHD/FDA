const mongoose = require("mongoose");
const moment = require('moment')

const RestaurantsSchema = new mongoose.Schema({  
  name: {
    type: String,
  },
  address : {
    type: String,
  },
  city :{
    type : String,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: String,
    default:moment().format('DD-MM-YYYY')
  }
},
{timestamps : true});

const Restaurants = mongoose.model("Restaurant", RestaurantsSchema);
module.exports = Restaurants;
