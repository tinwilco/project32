const browserNameQA = "https://project32.s3.eu-west-2.amazonaws.com/index.html";


module.exports = {
  tags: ["end_to_end"],

  "1. Add a name, change name, Select a mood and ensure submit button is enabled": async function (
    browser
  ) {
    const page = browser.page.smileyAppLanding();
    page.navigate();
    

    browser.setValue(page.elements.userNameInputBox, "Helens 1st automation Test");
    await browser.clearValue(page.elements.userNameInputBox);

    browser.setValue(page.elements.userNameInputBox,
      "Helen's 2nd automation test"
    );
    await browser.click(page.elements.submitButton);
    browser.waitForElementVisible(page.elements.submitButton, 8000);
  },

  "2. Check name appears in sentence when submit button is enabled ": async function (
    browser
  ) {
    const page = browser.page.smileyAppLanding();
    page.navigate();
    
    browser.setValue(page.elements.userNameInputBox, "Barry automation");

    await browser.click(page.elements.selectMoodImages);
    browser.assert.containsText(
      page.elements.helloHowAreYouFeelingText,
      "Hello Barry automation, How are you feeling today?"
    );
    browser.waitForElementVisible(page.elements.submitButton, 8000);
  },
  "3. Check name appears in sentence when submit button is disabled ": async function (
    browser
  ) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    browser.clearValue(page.elements.userNameInputBox);

    browser.setValue(page.elements.userNameInputBox, "Dominic automation");

    browser.assert.containsText(
      page.elements.helloHowAreYouFeelingText,
      "Hello Dominic automation, How are you feeling today?"
    );
    browser.assert.attributeEquals(page.elements.submitButtonWhenNotEnabled, "disabled", "true");

    browser.end();
  },
};
