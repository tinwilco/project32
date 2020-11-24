module.exports = {
  tags: ["admin"],

  "1. Check that when i press Manager, click here, I see 'return to mood entry' page ": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    const cssSelector = "#root > div > div > button";
    await browser.click("#root > div > div > button");

    browser.assert.visible("#root > div > div > button");
  },

  "2. Check manager can see daily moods and return back ": async function (
    browser
  ) {
    browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
    const cssSelector = "#root > div > div > button";
    await browser.click("#root > div > div > button");

    browser.assert.visible("#root > div > div > button");
    await browser.click("#root > div > div > button");

    browser.expect.element("#root > div > div > div > p").to.be.visible;

    browser.end();
  },
};
