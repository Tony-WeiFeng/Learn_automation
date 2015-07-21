/**
 * Created by cjin on 4/12/15.
 */
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

        element.all(by.css('.link-text.ng-scope.ng-binding')).get(7).click();
        browser.sleep(1000);

        browser.switchTo().frame(browser.findElement(by.tagName('iframe')));
        element(by.id('nav_list_clubs')).click();
        element(by.partialLinkText("Create Organization")).click();
        browser.sleep(2000);
        element.all(by.css('.actionMenuItem')).get(0).click();

        element(by.name('courseName')).sendKeys('Java');
        element(by.name('courseId')).sendKeys('J00002');
        element(by.id('available_yes')).click();
        element(by.name('bottom_Submit')).click();
        browser.sleep(3000);


        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});

