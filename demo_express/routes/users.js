var express = require('express');
var router = express.Router();

var authorization = require('./../utils/auth');

// GET http://localhost:3000/users/login
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

// GET http://localhost:3000/users/register
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

// POST http://localhost:3000/users/login
router.post('/login', function(req, res, next) {
    // get user data from form
    var email = req.body.email;
    var password = req.body.password;
    if (authorization.auth.authorize(email, password)) {
        res.statusCode = 200;
    } else {
        res.statusCode = 403;
    }
    res.end();
});

// POST http://localhost:3000/users/register
router.post('/register', function(req, res, next) {
    res.statusCode = 200;
    res.end(JSON.stringify({ "status": "success" }));
});

module.exports = router;