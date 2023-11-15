// index.js
const puppeteer = require("puppeteer");
const http = require('http')

const port = 3000

// Write a response to the client 
async function pdf() {
    console.log("PDF")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/", {
        waitUntil: "networkidle2"
    });
    await page.setViewport({ width: 1680, height: 1050 });
    await page.pdf({
        path: "hacker_news.pdf",
        format: "A4"
    });

    await browser.close();
}

// Create a server object: 
const server = http.createServer(function (req, res) {


    // End the response  
    res.end()
})

// Set up our server so it will listen on the port 
server.listen(port, function (error) {

    // Checking any error occur while listening on port 
    if (error) {
        console.log('Something went wrong', error);
    }
    // Else sent message of listening 
    else {
        console.log('Server is listening on port ' + port);

        pdf()
    }
})