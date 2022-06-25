// 
//   file name: Contacts Model
//   Student name: Arshdeep Singh
//   Student number: 301200480
//   Date : 24-06-2022  
//   Web App name: Portfolio
//
let mongoose = require('mongoose');

// create a model class
let Contacts = mongoose.Schema({
    name: String,
    email: String,
    number: String
},
{
  collection: "contacts"
});

module.exports = mongoose.model('Contacts', Contacts);