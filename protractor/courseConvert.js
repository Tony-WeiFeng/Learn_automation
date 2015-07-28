/**
 * Created by tfeng on 7/10/15.
 */
 var EC = protractor.ExpectedConditions;

describe('Course Convert', function() {

    var test_server = 'https://localhost';

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        // browser.driver.manage().deleteAllCookies();
        // browser.sleep(3000);
        browser.get(test_server);
        browser.sleep(1000);
    });

    function loginUltra(userName,password) {
        element(by.id('user_id')).sendKeys(userName);
        element(by.id('password')).sendKeys(password);

        element(by.id('entry-login')).click();
        browser.sleep(5000);
    }

    function adminSearchCourseById(courseId) {
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

        element(by.id('courseInfoSearchText')).clear();
        element(by.id('courseInfoSearchText')).sendKeys(courseId,protractor.Key.ENTER);
        //element(by.css('.button-4')).click();
        //element(by.partialLinkText("J001")).click();
        browser.sleep(2000);
    }

    it('Convert Course from Classic to Ultra', function() {

        var userName = 'administrator';
        var password = 'changeme';
        var courseId = 'J00001';

        loginUltra(userName,password);
        adminSearchCourseById(courseId);

        //console.log(element(by.linkText('J00001')));
        element(by.linkText(courseId)).click();

        //Waiting for open classic course
        browser.sleep(5000);



        browser.switchTo().defaultContent();
        browser.switchTo().frame(1);
        //browser.switchTo().frame(browser.findElement(by.tagName('iframe')));

        //element(by.cssContainingText('.ng-scope','OK')).click();
        //element(by.name('modal-footer')).click();
        
        //Convert course
        element(by.id('okTryNewLearn')).click();
        browser.sleep(5000);
        //Log out
        element(by.repeater('tool in base.tools').row(9)).click();
        browser.sleep(5000);

        browser.get('https://localhost');
        //Re-login
        loginUltra(userName,password);
        //Search and open the course again 
        adminSearchCourseById(courseId);
        browser.sleep(5000);       
        element(by.linkText(courseId)).click();
        browser.switchTo().defaultContent();
        browser.sleep(2000);

        //Click Ok button on Attention dialog
        element(by.name('modal-footer')).click();
        browser.sleep(2000);
        //element(by.cssContainingText('.ng-scope','Use the Ultra Course')).click();
        element(by.css('[ng-click="conversionStatusBarController.useTheNewExperience()"]')).click();
        browser.sleep(1000);

        //close course
        element(by.css('[class="bb-close"]')).click();
        browser.sleep(2000);
        
        //back to stream page
        element(by.css('[class="button round secondary icon admin-back-button"]')).click();
        browser.sleep(2000);
        //log out
        element(by.repeater('tool in base.tools').row(9)).click();
        browser.sleep(2000);
        //expect(element(by.id('ultraconversionbutton')).isPresent()).toBe(true);



        /**
        element(by.id('ultraconversionbutton')).click();
        element(by.id('okTryNewLearn')).click();
        **/
        //browser.sleep(2000);




        //element(by.css('.modal-footer-button.success.ng-scope')).click();

        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
    });
});

