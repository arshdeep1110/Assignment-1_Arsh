// 
//   file name: Index Route
//   Student name: Arshdeep Singh
//   Student number: 301200480
//   Date : 24-06-2022  
//   Web App name: Portfolio
//
var express = require('express');
var router = express.Router();
var login = require("../models/auth.model");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

/* GET About Us page. */
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
    res.render('projects', { title: 'Projects' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
    res.render('services', { title: 'Services' });
});

/* GET Contact Us page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});
/* GET Login page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});
/* Post Login page. */
router.post('/login', function(req, res, next) {
    login.find({ "username": req.body.username, "password": req.body.password }, function(err, auth) {
        if (err) {
            return console.log(err);
        } else if (auth.length > 0) {
            req.session.auth = auth;
            res.redirect('/auth/');
        } else {
            res.render('login', { title: 'Login' });
        }
    });
});
module.exports = router;