const request = require('request-promise');
const cheerio = require('cheerio');
//https://medium.com/@stefanhyltoft/scraping-html-tables-with-nodejs-request-and-cheerio-e3c6334f661b

async function main() {
 const result = await request.get("http://codingwithstefan.com/table-example");
 const $ = cheerio.load(result);
 $("body > table > tbody > tr > td").each((index, element) => {
   console.log($(element).text());
 });
}
 
main();