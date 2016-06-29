require('../helper');
var Hotels = require('../../models/hotels');

var http = require('http'),
    server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  Hotels.forge({}).fetchAll().then(function (collection) {
    collection.forEach(function (model) {
      model.destroy();
    })
      return browser.ignoreSynchronization = true;
  });
})

after(function(){
  server.close();
});

describe('Hotels', function() {
  it('has a header', function(){
    browser.get('/hotels')
    element(by.id('title')).getText().then(function(text){
      expect(text).to.equal('Hotel List');
    });
  });

  it('has a list of hotels', function(){
    var hotel1 = {
      name: 'Oxford Suites'
    }

    var hotel2 = {
      name: 'Dog Dung Hotel'
    }
    var myHotel = new Hotels(hotel1);
    var myHotel2 = new Hotels(hotel2);

    myHotel.save().then(function(){
      myHotel2.save().then(function(){
        browser.get('/hotels')
        element(by.tagName('li')).getText().then(function(text){
          expect(text).to.equal('Dog Dung Hotel');
        });
      })
    })



  });
})
