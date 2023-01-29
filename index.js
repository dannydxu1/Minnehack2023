const request = require('request-promise');
const cheerio = require('cheerio');
//https://medium.com/@stefanhyltoft/scraping-html-tables-with-nodejs-request-and-cheerio-e3c6334f661b

async function main() {
 const result = await request.get("https://ballotpedia.org/Tim_Walz");
 const $ = cheerio.load(result);
 $("#mw-content-text > div > p:nth-child(11)").each((index, element) => {
   console.log($(element).text());
 });
}
 
main();