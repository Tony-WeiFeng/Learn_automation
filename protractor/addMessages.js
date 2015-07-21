/**
 * Created by tfeng on 7/6/15.
 */

describe('Protractor Demo App', function() {

	var test_server = 'https://localhost'；

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get(test_server);
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

        element.all(by.css('.button.icon.clear.large')).get(4).click();
        browser.sleep(2000);

        element.all(by.css('.actions.guidance-wrapper .clear.ng-scope')).get(0).click();
        browser.sleep(2000);

        element(by.id('participant-list')).click();
        browser.sleep(2000);

        element.all(by.css('.participant-entry.ng-scope')).get(1).click();
        //element.all(by.css('.participant-name .ng-isolate-scope.username')).get(1).click();
        element(by.id('message-reply')).sendKeys('addmessage');
        browser.sleep(2000);
        //
        element(by.css('.message-send.message-new.ng-scope')).click();
        browser.sleep(2000);

        var result =  element.all(by.css('.preview.ng-binding')).get(0);
        expect(result.getText()).toEqual('addmessage');
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});
