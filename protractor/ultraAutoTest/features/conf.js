exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['loginPage.js'],

  onPrepare: function() {
  	browser.ignoreSynchronization = true;
  	browser.get('https://localhost');
  	element(by.id('user_id')).sendKeys('administrator');
	element(by.id('password')).sendKeys('changeme');
	element(by.id('entry-login')).click();

        browser.driver.manage().timeouts().implicitlyWait(5000);
  },

  getPageTimeout: 5000,
  allScriptsTimeout: 5000
};
