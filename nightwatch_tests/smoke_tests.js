const hedwig_logo_cssSelector = "#root > div > div > div > img";
const hello_how_are_you_feelin_text_cssSelector =
  "#root > div > div > div > h2";
const select_from_images_text_cssSelector = "#root > div > div > div > p";
const select_mood_images_cssSelector = "#root > div > div > div > div";
const who_are_you_text_cssSelector = "#root > div > div > div > label";
const select_from_the_options_below_text_cssSelector =
  "#root > div > div > div > p";
const click_here_to_see_team_model_cssSelector = "#root > div > div > button";
const return_to_mood_entry_cssSelector = "#root > div > div > button";

module.exports = {
  tags: ["smoke_tests"],

  "1. Hedwig logo - is it visible": async function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    await browser.assert.visible(hedwig_logo_cssSelector);
  },

  "2. Hello How are you feeling today": async function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    await browser.assert.containsText(
      hello_how_are_you_feelin_text_cssSelector,
      "feeling"
    );
  },

  "3. Please select from the images below": async function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    await browser.expect.element(select_from_images_text_cssSelector).to.be
      .visible;
  },

  "4. Mood images are present": async function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    await browser.expect.element(select_mood_images_cssSelector).to.be.visible;
  },

  "5. Who are you text": async function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    await browser.expect.element(who_are_you_text_cssSelector).to.be.visible;
  },

  "6. Please select from the options below is not there": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    const cssSelector =
      "#root > div > div > div > div > button.EmojiButton_EmojiButton__1_DRA.EmojiButton_EmojiButton_selected__2Nkuv > span";
    await browser.click(
      "#root > div > div > div > div > button:nth-child(1) > span"
    );
    await browser.expect.element(select_from_the_options_below_text_cssSelector)
      .to.be.not.present;
  },

  "7. Text stating 'Click here to see team model'": async function (browser) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");

    browser.assert.visible(click_here_to_see_team_model_cssSelector);
    browser.end();
  },
};
