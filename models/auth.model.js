// 
//   file name: Auth Model
//   Student name: Arshdeep Singh
//   Student number: 301200480
//   Date : 24-06-2022  
//   Web App name: Portfolio
//
let mongoose = require('mongoose');

// create a model class
let Auth = mongoose.Schema({
    username: String,
    email: String,
    password: String
},
{
  collection: "auth"
});

module.exports = mongoose.model('Auth', Auth);