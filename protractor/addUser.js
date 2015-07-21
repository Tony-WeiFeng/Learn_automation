/**
 * Created by tfeng on 7/6/15.
 */

describe('Create New User', function() {

	var test_server = 'https://localhost'

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.driver.manage().deleteAllCookies();
        browser.sleep(3000)
        browser.get(test_server);
    });
    function createUser(fristName,lastName,email,userName,verifyPassword,password_input) {
        element(by.partialLinkText("Create User")).click();
        browser.sleep(100)
        element(by.id('title')).sendKeys('BB user');
        element(by.name('firstName')).sendKeys(fristName);
        element(by.name('lastName')).sendKeys(lastName);
        element(by.name('email')).sendKeys(email);
        element(by.name('userName')).sendKeys(userName);
        element(by.name('verifyPassword')).sendKeys(verifyPassword);
        element(by.name('password_input')).sendKeys(password_input);

        element(by.name('bottom_Submit')).click();

    }
    it('Create User', function() {
        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');

        element(by.id('entry-login')).click();

        browser.sleep(5000);
        //Seems waitForAngular does not work as expect.
        //browser.waitForAngular();
        //element.all(by.css('.link-text.ng-scope.ng-binding')).get(7).click();
        element(by.repeater('tool in base.tools').row(8)).click();

        browser.sleep(5000);
        //Seems waitForAngular does not work as expect.
        //browser.waitForAngular();
        browser.switchTo().frame(browser.findElement(by.tagName('iframe')));
        //browser.switchTo().frame('iframe');

        //element(by.css('.portletList a')).click();
        //element(by.cssContainingText('.collapsible', 'Users')).click();
        element(by.id("nav_list_users")).click();


        createUser('Tony_1','Feng','tony.feng@blackboard.com','tony1','changeme','changeme');
        createUser('Tony_2','Feng','tony.feng@blackboard.com','tony2','changeme','changeme');
        createUser('Tony_3','Feng','tony.feng@blackboard.com','tony3','changeme','changeme');
        // createUser('Alex','Fu','alex.fu@blackboard.com','alex','changeme','changeme');
        // createUser('Bin','Zhang','bin.zhang@blackboard.com','bin','changeme','changeme');
        // createUser('Ivan','Liu','ivan.liu@blackboard.com','ivan','changeme','changeme');




        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});

