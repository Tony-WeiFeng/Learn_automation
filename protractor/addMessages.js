/**
 * Created by rzeng on 7/23/15.
 * This page includes 2 test cases.
 */

describe('Protractor Demo App', function() {

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

    it('Send a message in Course Outline', function() {
        var Recipient = 'Tony Feng';
        // Navigate to Courses        

        element(by.partialLinkText("Courses")).click();
        // Click on specify course
        var courseName = 'Ben_Test_C';
        var searchName = 'tony';
        element(by.cssContainingText('.ng-binding.ng-isolate-scope', courseName)).click();

        // Click on Message icon.
        element(by.css('[title="Messages"]')).click();
        browser.sleep(2000);

        // Click on + icon
        element(by.css('[aria-label="New Message"]')).click();

        browser.sleep(3000);

        sendMessageToRecipient(searchName, Recipient, 'Automation content', 'true');

        // Assert
        var latestMessageParticipantsElement = element.all(by.css('[users="conversation.participants"]')).get(1);
        expect(latestMessageParticipantsElement.getText()).toEqual(contextUsername + ' and ' + Recipient);
    });

    it('Send a message in Base Message', function(){
        var courseID = '1231222aa';
        var searchName = 'sun';
        var fullName = 'yiling sun';
        var messageContent = 'Automation message send in Base';


        // Navigate to base message page.
        element(by.partialLinkText("Messages")).click();
        browser.sleep(3000);

        // Click on add message icon
        clickAddMessageIconByCourseID(courseID);

        // Add new message panel is opened and search specify recipient.
        sendMessageToRecipient(searchName,fullName,messageContent,'true');

        // Assert
        expect(getLatestParticipantsByCourseID(courseID).getText()).toEqual(contextUsername + ' and ' + fullName);
        expect(getLatestMessageContentByCourseID(courseID).getText()).toEqual(messageContent);

       browser.sleep(3000);
    });

    // Send message to a specify recipient.
    function sendMessageToRecipient(searchName,fullName,messageContent,isAllowReply) {
        // After click "+" message icon.
        // Add new message panel is opened and search specify recipient.
        var recipientInput = element(by.id('participant-list'));
        var messageTextarea = element(by.id('message-reply'));
        var sendButton = element(by.partialButtonText('Send'));
        var isAllowReplyCheckBox = element(by.id('allow-replies'));

        recipientInput.clear();
        recipientInput.sendKeys(searchName);

        var specifyRecipient = element(by.cssContainingText('.participant-name', fullName));
        specifyRecipient.click();

        // Input the Message
        messageTextarea.clear();
        messageTextarea.sendKeys(messageContent);

        if(isAllowReply == false) {
            // Set Allow Reply to yes
            if(isAllowReplyCheckBox.getAttribute('checked').toBe("checked")){
                isAllowReplyCheckBox.click();
            }
        }
        else {
            // Set Allow Reply to no
            if(isAllowReplyCheckBox.getAttribute('checked') === null){
                isAllowReplyCheckBox.click();
            }
        }
        // Click Send button
        sendButton.click();
        browser.sleep(2000);
    }

    // Click add message icon by course ID on Base Message page.
    function clickAddMessageIconByCourseID(courseID) {
        var addMessageIcon = browser.driver.findElement(by.xpath("//div[div[div[a[text()='" + courseID + "']]]]//button[@aria-label=\'New Message\']"));
        addMessageIcon.click();
    }

    // Get latest message participan list by course ID on Base Message page.
    function getLatestParticipantsByCourseID(courseID) {
        var latestParticipant = browser.driver.findElement(by.xpath("//div[div[div[div[div[a[text()='" + courseID + "']]]]]]//bb-usernames"));
        return latestParticipant;
    }

    // Get latest message content by course ID on Base Message page.
    function getLatestMessageContentByCourseID(courseID) {
        var latestParticipant = browser.driver.findElement(by.xpath("//div[div[div[div[div[a[text()='" + courseID + "']]]]]]//div[@class=\'preview ng-binding\']"));
        return latestParticipant;
    }
});
