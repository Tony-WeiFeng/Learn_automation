/**
 * Created by tfeng on 7/10/15.
 */
 var EC = protractor.ExpectedConditions;

describe('Course Convert', function() {

    var test_server = 'https://localhost';

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.driver.manage().deleteAllCookies();
        browser.sleep(3000)
        browser.get(test_server);
    });

    it('Convert Course from Classic to Ultra', function() {
        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');

        element(by.id('entry-login')).click();
        browser.sleep(5000);

        //element.all(by.css('.link-text.ng-scope.ng-binding')).get(7).click();
        element(by.repeater('tool in base.tools').row(8)).click();
        browser.sleep(2000);

        browser.switchTo().frame(browser.findElement(by.tagName('iframe')));
        element(by.id('nav_list_courses')).click();
        browser.sleep(2000);

        var select = element(by.id('courseInfoSearchKeyString'));
        select.$('[value="CourseId"]').click();

        var select = element(by.name('courseInfoSearchOperatorString'));
        select.$('[value="Equals"]').click();

        element(by.id('courseInfoSearchText')).sendKeys('J00001',protractor.Key.ENTER);
        //element(by.css('.button-4')).click();
        //element(by.partialLinkText("J001")).click();
        browser.sleep(2000);

        //console.log(element(by.linkText('J00001')));
        element(by.linkText('J00001')).click();

        //Waiting for open classic course
        browser.sleep(5000);


        browser.switchTo().defaultContent();
        browser.switchTo().frame(1);
        //browser.switchTo().frame(browser.findElement(by.tagName('iframe')));

        browser.sleep(2000);

        //expect(element(by.id('ultraconversionbutton')).isPresent()).toBe(true);

        if (element(by.id('okTryNewLearn')).isPresent()) {
        //if (element(by.linkText('Maybe Later')).isPresent()) {
            //tryNewButton.click();
            element(by.id('okTryNewLearn')).click();
            //alert("1");
        }
        else {
            element(by.id('ultraconversionbutton')).click();
            browser.sleep(2000);
            element(by.id('okTryNewLearn')).click();
        }

        /**
        element(by.id('ultraconversionbutton')).click();
        element(by.id('okTryNewLearn')).click();
        **/
        browser.sleep(2000);


        //element(by.css('.modal-footer-button.success.ng-scope')).click();

        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});
