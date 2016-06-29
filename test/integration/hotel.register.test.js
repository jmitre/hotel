var expect = require('chai').expect
var request = require('supertest');
var app = require('../../app');
var User = require('../../models/user');

describe('Users', function () {
  beforeEach(function (done) {
    User.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  after(function (done) {
    User.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  describe('POST /books', function () {
    it('persists a book in the database', function (done) {
      var user = {
        email: 'Madame@Bovary',
        password: 'Gustave Flaubert',
        passConfirmation: 'Gustave Flaubert'
      };

      request(app).post('/sign-up')
        .send(user)
        .end(function (req, res) {
          User.forge({}).fetchAll().then(function (collection) {
            console.log('My length', collection.length);
            expect(collection.length).to.equal(1);
            done();
          }, function(err){
            console.log('I failed', err);
            done(err);
          });
        })
    });
  });
});
