/**
 * Created by tfeng on 7/6/15.
 */
describe('Creadte Course', function() {
	var test_server = 'https://localhost';

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        //isAngularSite(false);
        browser.driver.manage().deleteAllCookies();
        browser.get(test_server);
    });

    // afterEach(function() {
    // 	browser.close();
    // });
    it('Create a Course Java (J00001)', function() {
        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');

        element(by.id('entry-login')).click();
        browser.sleep(5000);

        //element.all(by.css('.link-text.ng-scope.ng-binding')).get(7).click();
        element(by.repeater('tool in base.tools').row(8)).click();

        browser.sleep(5000);
        browser.switchTo().frame(browser.findElement(by.tagName('iframe')));
        element(by.id('nav_list_courses')).click();
        element(by.partialLinkText("Create Course")).click();
        element.all(by.css('.actionMenuItem')).get(0).click();

        element(by.name('courseName')).sendKeys('Java');
        element(by.name('courseId')).sendKeys('J00001');
        element(by.id('available_no')).click();
        element(by.name('bottom_Submit')).click();

        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});

