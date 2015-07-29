// this function includes all locate operation.

var locate = function (object){
     if(object.action == 'click') {
     	if(object.type == 'id') {
           element(by.id(object.locator)).click();
     	}
     	if(object.type == 'css') {	
           element(by.css(object.locator)).click();
     	}
     	if(object.type == 'xpath') {
     		browser.driver.findElement(by.xpath(object.locator)).click();
     	}
     	if(object.type == 'linkText') {
     		browser.driver.findElement(by.linkText(object.locator)).click();
     	}
     	if(object.type == 'name') {
     		element(by.name(object.locator)).click();
     	}
     }

     if (object.action == 'sendKeys') {
     	if(object.type == 'id') {
           element(by.id(object.locator)).sendKeys(object.sendKeys);
     	}
     	if(object.type == 'name') {
     		element(by.name(object.locator)).sendKeys(object.sendKeys);
     	}
     }
     if (object.action == 'switchToIframe') {
     	if (object.type == 'tagName') {
		     browser.switchTo().frame(browser.findElement(by.tagName(object.locator)));
     	}
     	if (object.type == 'xpath') {
		     browser.switchTo().frame(browser.driver.findElement(by.xpath(object.locator)));
     	}
     }
 }

module.exports.locate = locate;