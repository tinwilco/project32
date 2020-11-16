module.exports = 

{
    "1. Hedwig logo": function (browser) {
        browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
              
        const cssSelector = "#root > div > div > div > img"
        browser.assert.visible("#root > div > div > div > img");
                                        },

   
    "2. Hello How are you feeling today": function (browser) {
        browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
        browser.pause(2 * 1000)
        
        const cssSelector = "#root > div > div > div > h2"
        browser.pause(2 * 1000)
                                                            },

    
        "3. Please select from the images below": function (browser) {
            browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
                     
            const cssSelector = "#root > div > div > div > p"
            browser.pause(2 * 1000)
                                                                 },

    "4. Mood images": function (browser) {
        browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
        browser.pause(2 * 1000)
        
        const cssSelector = "#root > div > div > div > div"
        browser.pause(2 * 1000)
                                        },

    "5. Who are you text": function (browser) {
        browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
              
        const cssSelector = "#root > div > div > div > label"
                                            },

    "6. Enter name in username field": function (browser) {
        browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
        browser.pause(2 * 1000)
        const cssSelector = "#usernameInputTextBox"
       

        browser.setValue(cssSelector,"Helens_Test_Name")
        browser.pause(2 * 1000)
                                                        },

    "7. Text stating 'Click here to see team model'": function (browser) {
        browser.url("https://project32.s3.eu-west-2.amazonaws.com/index.html");
        browser.pause(2 * 1000)
        const cssSelector = "#root > div > div > button"
        browser.end()
                                                                         },                                               
};