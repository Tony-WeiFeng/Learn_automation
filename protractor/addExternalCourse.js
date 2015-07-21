/**
 * Created by cjin on 4/11/15.
 */
describe('Protractor Demo App', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('https://localhost');
    });
    it('Send a message', function() {
        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');

        element(by.id('entry-login')).click();

        browser.sleep(3000);
        expect(browser.getTitle()).toEqual('https://localhost/ultra/stream');

        element(by.partialLinkText("Courses")).click();
        browser.sleep(2000);

        element(by.css('.icon.large.clear.ng-scope')).click();
        browser.sleep(2000);
        element(by.id('course-title')).sendKeys('Protractor');
        element(by.id('course-url')).sendKeys('https://ultra-qa.int.bbpd.io/ultra/course');
        element(by.id('start-date')).sendKeys('11/4/2015');

        element(by.css('.primary.ng-binding')).click();
        browser.sleep(3000);

        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});