const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
//https://medium.com/@stefanhyltoft/scraping-html-tables-with-nodejs-request-and-cheerio-e3c6334f661b

// scrape candidates
async function main() {
  console.log(
    "Now printing the candidates from the Minnesota 2022 Governor Election"
  );
  console.log();
  const govenors = [
    "Tim_Walz",
    "Scott_Jensen_(Minnesota)",
    "Steve_Patterson",
    "Hugh_McTavish",
    "James_McCaskel",
    "Gabrielle_Prosser",
  ];
  const selectors = [
    "#mw-content-text > div > p:nth-child(11)",
    "#mw-content-text > div > p:nth-child(9)",
    "#mw-content-text > div > p:nth-child(9)",
    "#mw-content-text > div > p:nth-child(10)",
    "#mw-content-text > div > p:nth-child(9)",
    "#mw-content-text > div > p:nth-child(9)",
  ];
  const allInfo = [];
  for (let i = 0; i < govenors.length; i++) {
    var link = "https://ballotpedia.org/" + govenors[i];
    await console.log(link);
    await getCandidateInfo(link, selectors[i]);
  }
}

/** find political party function  */
async function getCandidateInfo(link, selector) {   
    const susArr = [];
  const bioArr = [];
  const infoArr = [];
  const result = await request.get(link);
  const $ = cheerio.load(result);
  $("#mw-content-text > div > p:nth-child(6)").each((index, element) => {
    const basicData = $(element).text().replace(/\s+/g, " ").trim();
    console.log(basicData);
    bioArr.push(basicData);
    susArr.push(basicData)
  });
  $(selector).each((index, element) => {
    const bioData = $(element).text();
    console.log(bioData);
    bioArr.push(bioData);
    susArr.push(bioData)
  });

 
}

main();

/*
 await fs.writeFile("candidateData.json", JSON.stringify(bioArr, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file successfully!");
  });
*/
