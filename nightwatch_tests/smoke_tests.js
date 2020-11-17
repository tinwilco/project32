module.exports = {
  "1. Hedwig logo - is it visible": function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    const cssSelector = "#root > div > div > div > img";
    browser.assert.visible("#root > div > div > div > img");
  },

  "2. Hello How are you feeling today": function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    

    const cssSelector = "#root > div > div > div > h2";
    browser.assert.containsText("#root > div > div > div > h2", "feeling");
    
  },

  "3. Please select from the images below": function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    const cssSelector = "#root > div > div > div > p";
    browser.expect.element("#root > div > div > div > p").to.be.visible;
  },

  "4. Mood images are present": function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    
    const cssSelector = "#root > div > div > div > div";
    browser.expect.element("#root > div > div > div > div").to.be.visible;
    
  },

  "5. Who are you text": function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    const cssSelector = "#root > div > div > div > label";
    browser.expect.element("#root > div > div > div > label").to.be.visible;

  },

  "6. Enter name in username field": function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    browser.pause(2 * 1000);
    const cssSelector = "#usernameInputTextBox";

    browser.setValue(cssSelector, "Helens_Test_Name");
    browser.clearValue("#usernameInputTextBox");
    browser.click ("#usernameInputTextBox");
    browser.keys ("Helen's 2nd test");
    
    browser.pause(2 * 1000);
  },

  "7. Select a mood": function(browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    browser.pause(2 * 1000);
    const cssSelector = "#usernameInputTextBox";

    browser.setValue(cssSelector, "Helens_Test_Name");
    browser.clearValue("#usernameInputTextBox");
    browser.click ("#usernameInputTextBox");
    browser.keys ("Helen's 2nd test");

  },

  "8. Please select from the options below is not there": function(browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    const cssSelector = "#root > div > div > div > div > button.EmojiButton_EmojiButton__1_DRA.EmojiButton_EmojiButton_selected__2Nkuv > span";
    browser.click ("#root > div > div > div > div > button:nth-child(1) > span");
    browser.expect.element("#root > div > div > div > p").to.be.not.present;
    
  },

  "9. Text stating 'Click here to see team model'": function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    browser.pause(2 * 1000);
    const cssSelector = "#root > div > div > button";
    browser.expect.element("#root > div > div > button").to.be.visible;
    browser.end();
  },
};
