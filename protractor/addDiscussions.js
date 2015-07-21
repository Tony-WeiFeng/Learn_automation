/**
 * Created by cjin on 4/27/15.
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

        element(by.cssContainingText('.ng-binding.ng-isolate-scope', 'Scala')).click();

        //element(by.partialLinkText("Scala")).click();
        browser.sleep(2000);

        element.all(by.css('.button.icon.clear.large')).get(2).click();
        browser.sleep(2000);

        element.all(by.css('.small.button.clear.icon.js-show-add-options')).get(0).click();
        browser.sleep(2000);
        element.all(by.css('.icon-chat-message')).get(0).click();
        browser.sleep(2000);

        element(by.id('panel-title')).sendKeys('discussion test');

        element(by.css('.ng-valid.mce-content-body.ng-touched.ng-dirty.ng-valid-parse p')).sendKeys('contents');
        browser.sleep(2000);

        var result =  element.all(by.css('.preview.ng-binding')).get(0);
        expect(result.getText()).toEqual('addmessage');
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});
