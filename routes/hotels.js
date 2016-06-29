var express = require('express');
var router = express.Router();
var Hotels = require('../models/hotels');

var hotelModel = new Hotels();

router.get('/', function (req, res) {
  var hotelArr = []
  Hotels.forge({}).fetchAll().then(function (collection) {
    collection.forEach(function(model, inx){
      console.log('model', inx, model.attributes);
      hotelArr.push(model.attributes);
    });
    res.render('./hotels', {hotels: hotelArr});
  });
});

router.post('/', function (req, res) {
  var hotel = new Hotels(req.body);
  hotel.save().then(function(result){
    res.end();
  })
})

module.exports = router;
