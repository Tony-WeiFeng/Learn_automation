/**
 * Created by tfeng on 7/6/15.
 */

describe('Enrollment', function() {
	
	var test_server = 'https://localhost';

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.driver.manage().deleteAllCookies();
        browser.sleep(3000)
        browser.get(test_server);
    });

    it('Enroll tony1 as an instructor in course Java', function() {
        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');

        element(by.id('entry-login')).click();
        browser.sleep(5000);

        //element.all(by.css('.link-text.ng-scope.ng-binding')).get(7).click();
        element(by.repeater('tool in base.tools').row(8)).click();
        browser.sleep(1000);

        browser.switchTo().frame(browser.findElement(by.tagName('iframe')));
        element(by.id('nav_list_courses')).click();
        browser.sleep(2000);

        //Option selection
        var select = element(by.id('courseInfoSearchKeyString'));
        select.$('[value="CourseId"]').click();

        var select = element(by.name('courseInfoSearchOperatorString'));
        select.$('[value="Equals"]').click();

        element(by.id('courseInfoSearchText')).sendKeys('J00001',protractor.Key.ENTER);
        //element(by.css('.button-4')).click();
        //element(by.partialLinkText("J001")).click();
        browser.sleep(100);


        //console.log(element(by.linkText('J00001')));
        element(by.linkText('J00001')).click();
		browser.sleep(2000);

        browser.switchTo().defaultContent();
		
        //In Perview mode, the element can be found but not clickable, so I have to confirm course to Ultra manualy.
        //element(by.css('[ng-click="$parent.$close()"]')).click();

        //Confirm to Ultra
        //element(by.css('[ng-click="conversionStatusBarController.backToClassic()"]')).click();
        element(by.css('[analytics-id="course.outline.roster.name"]')).click();
        
        //seems after click on the add button, browser need sleep a moment, otherwise the "Roster" page will not be fully opened
        browser.sleep(500);

        element(by.css('[title="Add People"]')).click();
        element.all(by.css('[bb-peek-sref="enroll-users"]')).get(0).click();
        browser.sleep(500);
        //element(by.cssContainingText('course.roster.enroll.enrollPeople','Enroll People')).click();   //seems cssContainingText does not work well here.

        //Search peopel in Enroll People peek panel
        element(by.model('courseRosterEnroll.searchValue')).sendKeys('tony1');
        //element(by.css('[title="Search"]')).click();

        element(by.css('[ng-click="courseRosterEnroll.searchButtonClicked()"]')).click();
        browser.sleep(2000);

        element(by.cssContainingText('.user-handle','tony1')).click();

        //Select user role as Instructor 
        var select = element(by.model('uiUser.role'));
        select.$('[value="4"]').click();

        element(by.cssContainingText('.ng-binding','Save')).click();

        //element(by.css('.modal-footer-button.success.ng-scope')).click();

        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});

