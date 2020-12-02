module.exports = {
  tags: ["smoke_tests"],

  "1. Hedwig logo - is it visible": async function (browser) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    await browser.assert.visible(page.elements.hedwigLogo);
  },

  "2. Hello How are you feeling today": async function (browser) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    await browser.assert.containsText(
      page.elements.helloHowAreYouFeelingText,
      "feeling"
    );
  },

  "3. see text - Please select from the images below": async function (
    browser
  ) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    await browser.expect.element(page.elements.selectFromTheImagesText).to.be
      .visible;
  },

  "4. Mood images are present": async function (browser) {
    const page = browser.page.smileyAppLanding();
    page.navigate();
    await browser.expect.element(page.elements.selectMoodImages).to.be.visible;
  },

  "5. Who are you text": async function (browser) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    await browser.expect.element(page.elements.whoAreYouText).to.be.visible;
  },

  "6. Please select from the options below is not there": async function (
    browser
  ) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    await browser.click(page.elements.selectMoodImageNeutral);

    await browser.expect.element(page.elements.selectFromTheOptionsBelowText).to
      .be.not.present;
  },

  "7. Text stating 'Click here to see team model'": async function (browser) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    browser.assert.visible(page.elements.clickHereToSeeTeamModel);
    browser.end();
  },
};
