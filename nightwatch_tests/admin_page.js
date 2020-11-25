
const return_to_mood_entry_cssSelector = "#root > div > div > button";
const select_from_images_text_cssSelector = "#root > div > div > div > p";

module.exports = {
  tags: ["admin_page"],

  "1. Check that when i press Manager, click here, I see 'return to mood entry' page ": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    
    await browser.click(return_to_mood_entry_cssSelector);

    browser.assert.visible(return_to_mood_entry_cssSelector);
  },

  "2. Check manager can see daily moods and return back ": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    
    await browser.click(return_to_mood_entry_cssSelector);

    browser.assert.visible(return_to_mood_entry_cssSelector);
    await browser.click(return_to_mood_entry_cssSelector);

    browser.expect.element(select_from_images_text_cssSelector).to.be.visible;

    browser.end();
  },
};
