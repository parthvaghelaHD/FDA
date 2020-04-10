const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    address : {
      type: String
    },
    city : {
      type: String
    },
    type: {
      type: Number,
      default: 0,
      require: true,
      maxlength: 1
    }
  },
  {timestamps : true} 
);

const blogUser = mongoose.model("blogUsers", userSchema);
module.exports = blogUser;
