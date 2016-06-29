require('../helper');

var http = require('http'),
    server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  return browser.ignoreSynchronization = true;
});

after(function(){
  server.close();
});

describe('Hotel Index', function(){
  it('has a header', function(){
    var createdItemUrl = browser.getCurrentUrl();
    createdItemUrl.then(function(){
      browser.get('/');
      //browser.sleep(5000);
      element(by.id('title')).getText().then(function(text){
        //expect(text).to.equal('Welcome to the Hotel List');
      });
    })
  });

  it('should have a link to /sign-up', function(done){
    browser.get('/');

    element(by.id('signUp')).click();
    browser.getCurrentUrl().then(function(url) {
      console.log(url);
      expect(url.split(browser.baseUrl)[1]).to.equal('/sign-up');
      done();
    });
  });

  it('should have a link to /sign-in', function(done){
    browser.get('/');
    element(by.id('signIn')).click();
    browser.getCurrentUrl().then(function(url) {
      console.log(url);
      expect(url.split(browser.baseUrl)[1]).to.equal('/sign-in');
      done();
    });
  });
});
