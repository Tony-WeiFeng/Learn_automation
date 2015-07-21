/**
 * Created by cjin on 4/11/15.
 */
describe('Protractor Demo App', function() {
    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('https://localhost');
    });
    it('Add a term', function() {
        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');


        element(by.id('entry-login')).click();
        browser.sleep(3000);

        element.all(by.css('.link-text.ng-scope.ng-binding')).get(7).click();
        browser.sleep(1000);

        browser.switchTo().frame(browser.findElement(by.tagName('iframe')));
        //element(by.css('.portletList a')).click();
        //element(by.cssContainingText('.collapsible', 'Users')).click();
        element(by.id("nav_admin_term_list")).click();
        // $('#nav_list_users').locator().click();
        //element(by.partialLinkText("Users")).click();
        element(by.partialLinkText("Create Term")).click();
        element(by.name('name')).sendKeys('protractor test1');
        element(by.id('durationType_d')).click();
        element(by.name('daysOfUse')).sendKeys('1');
        element(by.name('bottom_Submit')).click();
        browser.sleep(3000);
        var result = element(by.cssContainingText('.inventory.sortable', 'protractor test1'));
        expect(result.getText()).
            toEqual('5');

        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});