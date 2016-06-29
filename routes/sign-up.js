var express = require('express');
var router = express.Router();
var User = require('../models/user');

var userModel = new User();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-up');
});

/* POST */
router.post('/', function (req, res) {
  if(req.body.email === '' || req.body.password === ''){
    res.redirect('/sign-up');
    return;
  }
  else if(req.body.password !== req.body.passConfirmation){
    res.redirect('/sign-up');
    return;
  }

  var inputUser = {
    email: req.body.email,
    password: req.body.password

  }

  var user = new User(inputUser);
  console.log("This is my body:", req.body);
  user.save().then(function (userInDB) {
    //res.json(userInDB)
    res.redirect('/')
  }, function(err){
    console.log('hey I failed', err);
    throw err;
  });
});

module.exports = router;
