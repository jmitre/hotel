var expect = require('chai').expect
var request = require('supertest');
var app = require('../../app');
var Hotels = require('../../models/hotels');

describe('Hotels', function () {
  beforeEach(function (done) {
    Hotels.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  after(function (done) {
    Hotels.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  describe('GET /hotels', function(){
    it('gets a list of hotels', function(done){
      var hotel = {
        name: 'Luxury Hotel'
      };
      var hotelModel = new Hotels(hotel);
      hotelModel.save().then(function(){
        request(app).get('/hotels').then(function(result){
          expect(result.body[0].name).to.equal(hotel.name);
          done();
        });
      })
    });
  });

  describe('POST /hotels', function(){
    it('creates a hotel', function(done){
      var hotel = {
        name: 'Cat Hotel'
      };

      request(app).post('/hotels').send(hotel).then(function(result){
        Hotels.forge({}).fetchAll().then(function (collection) {
          expect(collection.length).to.equal(1);
          done();
        });
      });
    });
  });
});
