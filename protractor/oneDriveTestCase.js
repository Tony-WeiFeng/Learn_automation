/**
 * Created by rzeng on 7/29/15.
 */

describe('Protractor Demo App', function() {

	var test_server = 'https://ben.local';

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.driver.manage().deleteAllCookies();
        browser.sleep(2000);
        browser.get(test_server);

        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');
        element(by.id('entry-login')).click();

        browser.sleep(3000);
        browser.ignoreSynchronization = false;
    });

    it('Upload file with OneDrive in Course Outline', function() {
        var courseName = 'Rosaline_course2';

        element(by.partialLinkText("Courses")).click();

        // Click on specify course        
        element(by.cssContainingText('.ng-binding.ng-isolate-scope', courseName)).click();

        clickOneDriveButton();
        // browser.sleep(50000);

        // One drive login page is a new tab, new html page. And it's not anglar js   
        browser.ignoreSynchronization = true;             
        browser.getAllWindowHandles().then(function (handles) {
            var mainHandle = handles[0];
            var oneDriveHandle = handles[1];
            browser.switchTo().window(oneDriveHandle).then(function () {
                browser.sleep(30000);
                // var emailTextbox = element(by.id('idDiv_PWD_UsernameExample'));
                var emailTextbox = browser.driver.findElement(by.name('loginfmt'));
                var passwordTextbox = browser.driver.findElement(by.name('passwd'));
                var signInButton = browser.driver.findElement(by.name('SI'));

                emailTextbox.clear();
                emailTextbox.sendKeys('mezengli@hotmail.com');
                passwordTextbox.clear();
                passwordTextbox.sendKeys('Rosaline1104');
                signInButton.click();

                browser.sleep(5000); // Actually, it will wait for the page loading automatically.

                // Switch back to main handle after login OneDrive
                browser.driver.switchTo().window(mainHandle);

                // Switch to OneDrive iframe
                browser.driver.switchTo().frame(0);
                var documentCheckBox = browser.driver.findElement(by.xpath('//div[@class="child"]//span[@class="selectArea"]'));
                var cancelButton = element(by.cssContainingText('[type="button"]', 'Cancel'));
                var OpenButton = element(by.cssContainingText('[type="button"]', 'Open'));
                // cancelButton.click();
                documentCheckBox.click();
                OpenButton.click();

                browser.sleep(5000);

                browser.switchTo().defaultContent();
                // Assert TBD
                var courseContentFirst = element(by.css('.content-title.ng-binding'));
                expect(courseContentFirst.getText()).toBe('Documents');

            })
        })

        // After login, it's an iframe.
        // browser.switchTo().frame(browser.findElement(by.tagName('iframe')));
        // var cancelButton = element(by.cssContainingText('[type="button"]', 'Cancel'));
        // cancelButton.click();
        // browser.sleep(3000);
    });
    
    // Open the OneDrive peek panel
    function clickOneDriveButton() {
        var oneDriveButton = element(by.css('[aria-label="Upload from OneDrive"]'));
        var addIcon = element(by.css('[aria-label="Add new content"]'));

        oneDriveButton.isDisplayed().then(function (isVisiable){
            if (isVisiable){
                oneDriveButton.click();
            }else{
                addIcon.click();
                oneDriveButton.click();
            }
        })
        
    }

});
