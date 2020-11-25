const hedwig_logo_cssSelector = "#root > div > div > div > img";
const hello_how_are_you_feeling_text_cssSelector =
  "#root > div > div > div > h2";
const select_from_images_text_cssSelector = "#root > div > div > div > p";
const select_mood_images_cssSelector = "#root > div > div > div > div";
const who_are_you_text_cssSelector = "#root > div > div > div > label";
const select_from_the_options_below_text_cssSelector =
  "#root > div > div > div > p";
const click_here_to_see_team_model_cssSelector = "#root > div > div > button";
const return_to_mood_entry_cssSelector = "#root > div > div > button";
const user_name_input_box_cssSelector =
  "#root > div > div > div > #usernameInputTextBox";
const submit_button_cssSelector = "#root > div > div > div > button";

module.exports = {
  tags: ["end_to_end"],

  "1. Add a name, change name, Select a mood and ensure submit button is enabled": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    browser.setValue(
      user_name_input_box_cssSelector,
      "Helens 1st automation Test"
    );
    await browser.clearValue(user_name_input_box_cssSelector);

    browser.setValue(
      user_name_input_box_cssSelector,
      "Helen's 2nd automation test"
    );
    await browser.click(submit_button_cssSelector);
    browser.waitForElementVisible(submit_button_cssSelector,8000);
  },

  "2. Check name appears in sentence when submit button is enabled ": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    browser.setValue(user_name_input_box_cssSelector, "Barry automation");

    await browser.click(select_mood_images_cssSelector);
    browser.assert.containsText(
      hello_how_are_you_feeling_text_cssSelector,
      "Hello Barry automation, How are you feeling today?"
      
    );
    browser.waitForElementVisible(submit_button_cssSelector,8000);
    
  },
  "3. Check name appears in sentence when submit button is disabled ": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    browser.clearValue(user_name_input_box_cssSelector);

    browser.setValue(user_name_input_box_cssSelector, "Dominic automation");

    browser.assert.containsText(
      hello_how_are_you_feeling_text_cssSelector,
      "Hello Dominic automation, How are you feeling today?"
    );
    browser.assert.attributeEquals(
      submit_button_cssSelector,
      "disabled",
      "true"
    );

    browser.end();
  },
};
