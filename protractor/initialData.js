describe('Safe click', function() {

  function safeClick(elementLocator) {
  	if(elementLocator.isPresent()) {
  		elementLocator.click();
  	}
  	else {
  		driver.manage().timeouts().impicitlyWait(5000);
  		elementLocator.isPresent().then(function(isTrue) {
  			if(isTrue) {
  				elementLocator.click();
  			}
  		});
  	}
  }
  it('Define a function to guarantee click safe', function() {
		browser.ignoreSynchronization = true;
		browser.get('https://localhost');
 
		element(by.id('user_id')).sendKeys('administrator');
		element(by.id('password')).sendKeys('changeme');
        var loginButton = element(by.id('entry-login'));
		safeClick(loginButton);
  });
});
