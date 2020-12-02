module.exports = {
  tags: ["admin_page"],

  "1. Check that when i press Manager, click here, I see 'return to mood entry' page ": async function (
    browser
  ) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    await browser.click(page.elements.returnToMoodEntry);

    browser.assert.visible(page.elements.returnToMoodEntry);
  },

  "2. Check manager can see daily moods and return back ": async function (
    browser
  ) {
    const page = browser.page.smileyAppLanding();
    page.navigate();

    await browser.click(page.elements.returnToMoodEntry);

    browser.assert.visible(page.elements.returnToMoodEntry);
    await browser.click(page.elements.returnToMoodEntry);

    await browser.expect.element(page.elements.selectFromTheImagesText).to.be.visible;

    browser.end();
  },
};
