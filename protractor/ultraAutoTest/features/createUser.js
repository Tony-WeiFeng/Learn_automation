'user strict'
yaml = require('js-yaml');
fs = require('fs');
var locator = require('./locateObject');

var baseFile = yaml.load(fs.readFileSync('/Users/boliu/ultraAutoTest/locales/base.yaml'));
var userFile = yaml.load(fs.readFileSync('/Users/boliu/ultraAutoTest/locales/user.yaml'));
describe('Add initial data', function() {
  // var locator = new locateObject();

  function createUser(user) {
	var elements = baseFile.homePage.adminTools.users.create.page;
	elements.title.sendKeys = user.title;
	elements.firstName.sendKeys = user.firstName;
	elements.lastName.sendKeys = user.lastName;
	elements.email.sendKeys = user.email;
	elements.userName.sendKeys = user.userName;
	elements.password_input.sendKeys = user.password_input;
	elements.verifyPassword.sendKeys = user.verifyPassword;

	locator.locate(elements.title);
	locator.locate(elements.firstName);
	locator.locate(elements.lastName);
	locator.locate(elements.email);
	locator.locate(elements.userName);
	locator.locate(elements.password_input);
	locator.locate(elements.verifyPassword);
	locator.locate(elements.button);
  }
  it('Create users and courses and enroll users', function() {
	browser.ignoreSynchronization = true;
	browser.get('https://localhost');
	browser.driver.manage().timeouts().implicitlyWait(5000);
	var login = baseFile.login;
	var adminTool = baseFile.homePage.adminTools;
	locator.locate(login.userId);
	locator.locate(login.password);
	locator.locate(login.loginButton);
	locator.locate(adminTool.switch);
	locator.locate(adminTool.iframe);
	// browser.sleep(5000);
	// browser.switchTo().frame(browser.driver.findElement(by.tagName('iframe')));
	 // browser.switchTo().frame(browser.driver.findElement(by.xpath("//*[@id=\"body-content\"]/div[1]/iframe")));
	// element(by.id("nav_list_users")).click();
	locator.locate(adminTool.users.switch);
	// locator.locate(adminTool.users.create.switch);
	createUser(userFile);
  });
});
