/**
 * Created by rzeng on 7/23/15.
 * This page includes 2 test cases.
 */

describe('Test Cases for Discussion', function() {

	var testServer = 'https://localhost';

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.driver.manage().deleteAllCookies();
        browser.sleep(2000);
        browser.get(testServer);

        element(by.id('user_id')).sendKeys('administrator');
        element(by.id('password')).sendKeys('changeme');
        element(by.id('entry-login')).click();

        browser.sleep(3000);
        browser.ignoreSynchronization = false;

    });

    it('Create a new Discussion', function(){
        var courseID = 'Rosaline_Course6';
        var title = 'Automation title';
        var content = 'Automation Content';

        // Navigate to discussion tab in course outline.
        element(by.partialLinkText("Courses")).click();
        browser.sleep(3000);
        element(by.cssContainingText('.course-id.ng-scope', courseID)).click();
        element(by.css('[title="Participation"]')).click();
        
        // Create a new discussion.
        addNewDiscussion(title, content, false, true);
        addNewDiscussion(title, content, false, true);

        // Assert 
        expect(getLatestDiscusstionTitle().getText()).toEqual(title);
        expect(getLatestDiscusstionContent().getText()).toEqual(content);

       browser.sleep(3000);
    });

    it('Delete a new Discussion', function(){
        var courseID = 'Rosaline_Course6';
        var title = 'Automation title';

        // Navigate to discussion tab in course outline.
        element(by.partialLinkText("Courses")).click();
        browser.sleep(3000);
        element(by.cssContainingText('.course-id.ng-scope', courseID)).click();
        element(by.css('[title="Participation"]')).click();
        browser.sleep(3000);

        // Click on delete button
        clickDeleteDiscussionIcon(title);

    });

    // TBD: ElementNotVisibleError in Line 86
    it('Edit an existed Discussion', function(){
        var courseID = 'Rosaline_Course6';
        var oldTitle = 'Automation title';
        var newTitle = 'Automation title update';
        var content = 'Automation content update';

        // Navigate to discussion tab in course outline.
        element(by.partialLinkText("Courses")).click();
        browser.sleep(3000);
        element(by.cssContainingText('.course-id.ng-scope', courseID)).click();
        element(by.css('[title="Participation"]')).click();
        browser.sleep(3000);

        // Click the discussion title to open the discussion panel and edit.
        // editDiscussion(oldTitle, newTitle, content, true, false);
        clickDiscussionName(oldTitle);
        browser.sleep(3000);
        var titleTextbox = element(by.css('[ng-click="panelHeader.onEditMode()"]'));
        // titleTextbox.click();
        // titleTextbox.clear();
        browser.sleep(2000);
        // titleTextbox.sendKeys(newTitle);
        // titleTextbox.sendKeys(protractor.Key.ENTER);
        // protractor.forceValue(titleTextbox, newTitle);
        titleTextbox.innerHTML = "LALALA";
        browser.sleep(3000);
        // + protractor.Key.CONTROL

        // Close the discussion details panel.
        element(by.css('.bb-close')).click();

    });

    it('Add comment and reply for an existed Discussion', function(){
        var courseID = 'Rosaline_Course6';
        var title = 'Automation title';
        var comment = 'Automation Comments';
        var reply = 'Automation add Reply';

        // Navigate to discussion tab in course outline.
        element(by.partialLinkText("Courses")).click();
        browser.sleep(3000);
        element(by.cssContainingText('.course-id.ng-scope', courseID)).click();
        element(by.css('[title="Participation"]')).click();
        browser.sleep(3000);

        // Click the discussion title to open the discussion panel and edit.
        // editDiscussion(oldTitle, newTitle, content, true, false);
        clickDiscussionName(title);
        browser.sleep(3000);
        
        // Add comments
        addComment(comment);       

        // Add Reply
        addReplyByComment(comment, reply);

        // Assert.
        var latestComment = element.all(by.css('[message="comment"]')).all(by.css('[name="comment-field"]')).first();
        expect(latestComment.getText()).toBe(comment);
        var latestReply = element.all(by.css('[message="comment"]')).all(by.css('[name="comment-field"]')).get(1);
        expect(latestReply.getText()).toBe(reply);
    });

    function addComment(comment) {
        var commentElement = element.all(by.css('[aria-label="Comment"]')).last();
        commentElement.clear();
        commentElement.sendKeys(comment);
        
        var saveButton = element.all(by.cssContainingText('[aria-disabled="false"]', 'Save')).last();
        saveButton.click();

        browser.sleep(3000);
    }

    function addReplyByComment(comment, newComment) {
        var replyTextBox = browser.driver.findElement(by.xpath("//div[div[div[bb-message[div[div[div[ng-switch[div[div[div[p[text()='" + comment + "']]]]]]]]]]]]//div[@aria-label='Reply']"));
        replyTextBox.clear();
        replyTextBox.sendKeys(newComment);
        var addReplyButton = element(by.cssContainingText('[aria-disabled="false"]','Add Reply'));
        addReplyButton.click();
        browser.sleep(2000);
    }

    // Delete discussion with title, if the title name duplicates, delete the first one. 
    // Delete discussion without confirmation dialog.
    function clickDeleteDiscussionIcon(title) {
        // Mouse move on discussion title.
        var discussionTitle = element(by.cssContainingText('.content-title.ng-scope.ng-binding', title));
        browser.driver.actions().mouseMove(discussionTitle).perform();
        // Click on ... -> Delete button
        var overLayIcon = browser.driver.findElement(by.xpath("//div[div[div[ng-switch[div[div[ng-switch[div[ng-switch[a[text()='" + title + "']]]]]]]]]]//a[@aria-label='Toggle more options menu']"));
        overLayIcon.click();
        browser.sleep(2000);
        var deleteIcon = browser.driver.findElement(by.xpath("//div[div[div[div[ng-switch[div[div[ng-switch[div[ng-switch[a[text()='" + title + "']]]]]]]]]]]//a[@aria-label='Delete']"));
        deleteIcon.click();
        browser.sleep(2000);
    }

    // Add a new discussion in New Discusstion panel.
    function addNewDiscussion(title, content, isHiddenFromStu, isDisplayCourseContent) {
        // Click on add Discussion icon
        clickAddIcon();
        newDiscussion(title, content, isHiddenFromStu, isDisplayCourseContent);
    }

    // Fill in details info in discussion panel.
    function newDiscussion(title, content, isHiddenFromStu, isDisplayCourseContent) {
        var titleTextbox = element(by.id('panel-title'));
        var contentTextbox = element(by.css('[name="discussion-description"]'));
        var saveButton = element(by.css('[type="submit"]'));
        var hiddenFromStuButton = element(by.css('.item-visibility.ng-scope'));
        var visiableToStuOption = element.all(by.css('[ng-click="contentVisibilitySelector.selectVisible()"]')).last();
        var displayCourseContent = element(by.css('[component-key="discuss.addoutline"]'));
        var displayCourseContentOption = element(by.id('add-discussion-to-outline'));

        titleTextbox.clear();
        titleTextbox.sendKeys(title);

        contentTextbox.click();
        contentTextbox.clear();
        contentTextbox.sendKeys(content);

        browser.sleep(2000);
        
        // Set if visiable to student
        if(isHiddenFromStu == false) {
            // Set to Visible to students
            hiddenFromStuButton.click();
            browser.sleep(2000);
            visiableToStuOption.click();
            browser.sleep(3000);
        }

        // Set if display on course content page. If statement need to be test.
        if(isDisplayCourseContent == false) {
            displayCourseContentOption.getAttribute('aria-checked').then(function(returnStr) {
                if(returnStr === 'true'){
                    displayCourseContentOption.click();
                }
            })
        } else {
            displayCourseContentOption.getAttribute('aria-checked').then(function(returnStr) {
                if(returnStr === 'false') {
                    displayCourseContent.click();
                }
            })                   
        }
        // Click a relative place on contentTextbox (blank place)
        browser.actions().mouseMove(contentTextbox, {x: 50, y: 50}).click().perform();
        saveButton.click();
        browser.sleep(2000);
    }

    // Click the add discussion icon.
    function clickAddIcon() {
        var addDiscussionIcon = element(by.cssContainingText('[bb-translate="course.engagement.createDiscussion"]', 'Create Discussion'));
        var addIcon = element(by.css('[aria-label="Add new discussion"]'));
        var addDiscussion = element(by.cssContainingText('[analytics-id="components.directives.add-content-button.createDiscussion"]', 'Discussion'));

        addDiscussionIcon.isDisplayed().then(function (isVisible){
            if (isVisible){
                addDiscussionIcon.click();
            }else {
                addIcon.click();
                addDiscussion.click();
            }
        })
    }

    // Click edit discussion icon.
    function clickDiscussionName(title) {
        // Mouse move on discussion title.
        // var discussionTitle = element(by.cssContainingText('.content-title.ng-scope.ng-binding', title));
        var discussionTitle = browser.driver.findElement(by.xpath("//a[text()='" + title + "']"));
        discussionTitle.click();
        browser.sleep(5000);
    }

    // Get the latest discussion record title.
    function getLatestDiscusstionTitle(){
        var latestDiscussionTitle = element(by.css('.content-title.ng-scope.ng-binding'));
        return latestDiscussionTitle;
    }

    // Get the latest discussion record content.
    function getLatestDiscusstionContent(){
        var latestDiscusstionContent = element(by.css('.js-description.ng-binding'));
        return latestDiscusstionContent;
    }

});
