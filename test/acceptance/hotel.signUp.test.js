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

describe('Sign Up', function(){
  it('has a header', function(){
    browser.get('/sign-up')
    element(by.id('title')).getText().then(function(text){
      expect(text).to.equal('Register');
    });
  });
  it('has a form with inputs for creating an account', function(){
    browser.get('/sign-up');
    element(by.tagName('legend')).getText().then(function(text){
      expect(text).to.equal('Registration Form');
    });
  });
  it('has inputs for email, and password', function() {
    browser.get('/sign-up')

    element(by.id('email')).isPresent().then(function(doesExist){
      expect(doesExist).to.equal(true);
    })

    element(by.id('password')).isPresent().then(function(doesExist){
      expect(doesExist).to.equal(true);
    })

    element(by.id('passConfirmation')).isPresent().then(function(doesExist){
      expect(doesExist).to.equal(true);
    })
  })
  it('has a register button', function(){
    browser.get('/sign-up')

    element(by.id('registerBtn')).isPresent().then(function(doesExist){
      expect(doesExist).to.equal(true);
    })
  });

  it('can register', function(){
    browser.get('/sign-up')

    element(by.id('email')).sendKeys('manager@hotel.com');
    element(by.id('password')).sendKeys('123');
    element(by.id('passConfirmation')).sendKeys('123');
    element(by.id('registerBtn')).click();

    browser.getCurrentUrl().then(function(url) {
      console.log(url);
      expect(url.split(browser.baseUrl)[1]).to.equal('/');

    });
  });

  it('it cannot sign up without an email', function(){
    browser.get('/sign-up')

    element(by.id('password')).sendKeys('123');
    element(by.id('passConfirmation')).sendKeys('123');
    element(by.id('registerBtn')).click();

    browser.getCurrentUrl().then(function(url) {
      console.log(url);
      expect(url.split(browser.baseUrl)[1]).to.equal('/sign-up');

    });
  });
});
