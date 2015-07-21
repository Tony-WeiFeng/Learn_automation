/**
 * Created by tfeng on 4/16/15.
 */
// spec.js
describe('Protractor Demo App', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;

        browser.get('https://localhost');
    });
    it('should add one and two', function() {
        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');


        element(by.id('entry-login')).click();

        browser.sleep(3000);
        expect(browser.getTitle()).toEqual('https://localhost/ultra/stream');


        expect(element(by.id('main-heading')).getText()).toEqual('Stream');
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });

        element(by.partialLinkText("Courses")).click();
        browser.sleep(2000);

        element(by.partialLinkText("Scala")).click();
        browser.sleep(2000);



        //var result = element.all(by.css('.button icon clear large course-tool-tab ng-scope')).get(2);
        //
        //result.click();
        //browser.sleep(2000);

        //browser.pause();

    });
});

