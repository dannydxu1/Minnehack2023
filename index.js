import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { addData, getBio } from "./sto.js";
const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
var fullDataArray = []; //global variable, bad practice but what can you do

async function main() {
  console.log(
    "Printing the candidates from the Minnesota 2022 Governor Election..."
  );
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
  for (let i = 0; i < govenors.length; i++) {
    var link = "https://ballotpedia.org/" + govenors[i];
    await console.log("Retrieving data from: " + link);
    await getBasicInfo(link);
    await getBioInfo(link, selectors[i]);
  }
  await fs.writeFile(
    "candidateData.json",
    JSON.stringify(fullDataArray, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data written to file successfully!");
    }
  );
  addToDataBase();
  getBio();

}

/** find political party function  */
async function getBasicInfo(link) {
  const result = await request.get(link);
  const $ = cheerio.load(result);
  $("#mw-content-text > div > p:nth-child(6)").each((index, element) => {
    const basicData = $(element).text().replace(/\s+/g, " ").trim();
    fullDataArray.push(basicData);
    console.log("BASIC: "+basicData);
    getParty(basicData);
  });
}

async function getBioInfo(link, selector) {
  const result = await request.get(link);
  const $ = cheerio.load(result);
  $(selector).each((index, element) => {
    const bioData = $(element).text();
    fullDataArray.push(bioData);
    console.log("BIO: "+bioData);
  });
}

async function getParty(data) {
  const start = data.indexOf("(");
  const end = data.indexOf(")");
  const tempString = data.substring(start + 1, end);
  fullDataArray.push(tempString);
  console.log("PARTY: " + tempString);
}

async function addToDataBase() {
  for (let i = 0; i < fullDataArray.length; i = i + 3) {
    let bio = fullDataArray[i];
    let party = fullDataArray[i + 1];
    let info = fullDataArray[i + 2];
    addData(bio, info, party);
  }
  return;
}
main();
