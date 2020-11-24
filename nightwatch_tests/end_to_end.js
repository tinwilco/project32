module.exports = {
  tags: ["end_to_end"],

  "1. Add a name, change name, Select a mood and ensure submit button is enabled": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    const cssSelector = "#root > div > div > div > #usernameInputTextBox";

    browser.setValue(cssSelector, "Helens 1st automation Test");
    await browser.clearValue(cssSelector);

    browser.setValue(cssSelector, "Helen's 2nd automation test");
    await browser.click("#root > div > div > div > div > button");
    browser.expect
      .element("#root > div > div > div > button")
      .to.not.have.attribute("disabled");
  },

  "2. Check name appears in sentence when submit button is enabled ": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    const cssSelector = "#root > div > div > div > #usernameInputTextBox";

    browser.setValue(cssSelector, "Barry automation");

    await browser.click("#root > div > div > div > div > button");
    browser.assert.containsText(
      "#root > div > div > div > h2",
      "Hello Barry automation, How are you feeling today?"
    );
    browser.expect
      .element("#root > div > div > div > button")
      .to.not.have.attribute("disabled");
  },
  "3. Check name appears in sentence when submit button is disabled ": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    const cssSelector = "#root > div > div > div > #usernameInputTextBox";
    browser.clearValue("#usernameInputTextBox");

    browser.setValue(cssSelector, "Dominic automation");

    browser.assert.containsText(
      "#root > div > div > div > h2",
      "Hello Dominic automation, How are you feeling today?"
    );
    browser.assert.attributeEquals(
      "#root > div > div > div > button",
      "disabled",
      "true"
    );

    browser.end();
  },
};
