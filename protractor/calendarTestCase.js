/**
 * Created by rzeng on 8/3/15.
 */

describe('Test cases for Calendar', function() {

	var test_server = 'https://localhost';
    var contextUsername;

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

        // Get context username
        var contextUser = element(by.css('[user="context.user"]'));
        contextUser.getText().then(function(name) {
            contextUsername = name;
        });
    });

    iit('Add a normal event ', function() {
        // Test Data
        var courseID = 'Rosaline_Course2';
        var eventTitle = 'Automation testing add event';
        var startTime = '3:00 PM';
        var endTime = '7:10 PM';
        var testDate = '8/4/15';
        var location = 'Room 1234';

        // Navigate to Courses        
        element(by.partialLinkText("Courses")).click();

        // Click on specify course        
        element(by.cssContainingText('.course-id.ng-scope', courseID)).click();

        // Click on Calendar icon.
        element(by.css('[title="Calendar"]')).click();
        browser.sleep(2000);

        // Click on add event button.
        var addIcon = element(by.id('course-new-event-button'));
        var addEventLink = element(by.cssContainingText('[role="button"]', 'Add Event'));
        addIcon.click();
        addEventLink.click();
        browser.sleep(2000);

        addEvent(eventTitle, testDate, startTime, testDate, endTime, false, false, location, 'Automation added.');

        // Assert
        var addedEvent = element(by.cssContainingText('.fc-title', eventTitle));
        expect(addedEvent.isPresent()).toBe(true);
        expect(getEventInfoByTitle(eventTitle).getText()).toBe(startTime + ' - ' + endTime + ' | ' + location);
        
    });

    it ('Edit Course Schedule', function() {
        // Test Data
        var courseID = 'Rosaline_Course2';
        var courseNickName = 'Automation Rosaline course2';

        // Navigate to Courses        
        element(by.partialLinkText("Courses")).click();

        // Click on specify course        
        element(by.cssContainingText('.course-id.ng-scope', courseID)).click();

        // Click on Calendar icon.
        element(by.css('[title="Calendar"]')).click();
        browser.sleep(2000);

        // Click on add event button.
        var addIcon = element(by.id('course-new-event-button'));
        var addEventLink = element(by.cssContainingText('[role="button"]', 'Edit Course Schedule'));
        addIcon.click();
        addEventLink.click();
        browser.sleep(2000);

        // Click Add Time
        var addTimeLink = element(by.cssContainingText('[role="button"]', 'Add time'));
        addTimeLink.click();

        editCourseSchedule(courseNickName, '8/8/15', '4:00 AM', '4:00 PM', false, 'Repeat Daily', 'Every 3 Days', null, '40', 'Room 555');

        browser.sleep(3000);

    });

    // Function for addEvent 
    // The time value is incorrect. TBD
    function addEvent(title, startDate, startTime, endDate, endTime, isAllDay, isRepeatEvent, location, description) {
        var titleInput = element(by.id('panel-title'));
        var startDateInput = element(by.id('start-date'));
        var startTimeInput = element(by.css('[name="start-time"]'));
        var endDateInput = element(by.id('end-date'));
        var endTimeInput = element(by.css('[name="end-time"]'));
        var allDayCheckBox = element(by.css('[name="all-day"]'));
        var repeatEventCheckBox = element(by.css('[name="repeat-event"]'));
        var locationInput = element(by.id('choose-location'));
        var descriptionInput = element(by.id('event-description'));

        var saveButton = element(by.buttonText('Save'));

        if (title != null) {
            titleInput.clear();
            titleInput.sendKeys(title);
        }
        if (startDate != null) {
            startDateInput.clear();
            startDateInput.sendKeys(startDate);
        }
        if (startTime != null) {
            startTimeInput.click();
            startTimeInput.clear();
            startTimeInput.sendKeys(startTime);
        }
        if (endDate != null) {
            endDateInput.clear();
            endDateInput.sendKeys(endDate);
        }
        if (endTime != null) {
            endTimeInput.click();
            endTimeInput.clear();
            endTimeInput.sendKeys(endTime);
        }
        if (isAllDay == true) {
            allDayCheckBox.click();
        }
        if (isRepeatEvent == true) {
            repeatEventCheckBox.click();
        }
        if (location != null) {
            locationInput.clear();
            locationInput.sendKeys(location);
        }
        if (description != null) {
            descriptionInput.clear();
            descriptionInput.sendKeys(description);
        }

        saveButton.click();
    }

    // Edit course schedule.
    function editCourseSchedule(courseNickName, startDate, startTime, endTime, isAllDay, repeatSelect, everySelect, endRepeatSelect, timesSelect, location) {
        var courseNickNameInput = element(by.css('[aria-label="Course Schedule Title"]'));
        var startDateInput = element(by.id('start-date'));
        var startTimeInput = element(by.css('[name="start-time"]'));
        var endTimeInput = element(by.css('[name="end-time"]'));
        var allDayCheckBox = element(by.css('[name="all-day"]'));
        var repeatSelectOption = element(by.css('[name="choose-event-repetition-select"]'));
        var everySelectOption = element(by.css('[name="event-repetition-number-select"]'));
        var endRepeatSelectOption = element(by.css('[name="choose-end-repeat-select"]'));
        var timesSelectOption = element(by.model('recurRules.count'));
        var locationInput = element(by.model('calendar.newItem.location'));

        var saveButton = element(by.buttonText('Save'));

        if (courseNickName != null) {
            courseNickNameInput.clear();
            courseNickNameInput.sendKeys(courseNickName);
        }
        if (startDate != null) {
            startDateInput.clear();
            startDateInput.sendKeys(startDate);
            browser.sleep(3000);
        }
        if (startTime != null) {
            startTimeInput.click();
            startTimeInput.clear();
            startTimeInput.sendKeys(startTime);
        }
        if (endTime != null) {
            endTimeInput.click();
            endTimeInput.clear();
            endTimeInput.sendKeys(endTime);
            browser.sleep(3000);
        }
        if (isAllDay == true) {
            allDayCheckBox.click();
        }
        if (repeatSelect != null) {
            element(by.cssContainingText('option', repeatSelect)).click();
        }
        if (everySelect != null) {
            element(by.cssContainingText('option', everySelect)).click();
        }
        if (endRepeatSelect != null) {
            element(by.cssContainingText('option', endRepeatSelect)).click();
        }
        if (timesSelect != null) {
            timesSelectOption.clear();
            timesSelectOption.sendKeys(timesSelect);
        }
        if (location != null) {
            locationInput.clear();
            locationInput.sendKeys(location);
        }

        saveButton.click();
    }

    // Get event information on Calendar. 
    // Return the element
    function getEventInfoByTitle (title) {
        var timePeriod = browser.driver.findElement(by.xpath("//div[div[a[text()='" + title + "']]]/div[@class='fc-time']"));
        return timePeriod;
    }

});
