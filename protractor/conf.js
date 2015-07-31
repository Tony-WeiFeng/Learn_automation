/**
 * Created by tfeng on 7/6/15.
 */

// conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['addCourses.js','addUser.js','courseConvert.js','enrollment.js'],
    //specs: ['addCourses.js','courseConvert.js'],
    //specs: ['courseConvert.js'],
    //specs: ['enrollment.js'],
    //specs: ['addCourses.js'],

    
    // capabilities: {
    //    browserName: 'chrome'
    // },

    //Preparation before starting the tests

    onPrepare: function() {

        // global.isAngularSite = function (flag) {
        //  browser.ignoreSynchronization = !flag;
        // }


        //Set window size before starting the tests
        browser.driver.manage().window().setSize(1920, 1200);
        //browser.driver.manage().window().maxisize();

        var folderName = (new Date()).toString().split(' ').splice(1, 4).join('-');
        var mkdirp = require('mkdirp');
        var newFolder = "./reports/" + folderName;
        require('jasmine-reporters');

        mkdirp(newFolder,function(err) {
            if (err) {
                console.error(err);
            } else {
                jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(newFolder, true, true));
            }
        });
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000,
        isVerbose: true,
        includeStackTrace: true
    }
};