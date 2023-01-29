const cheerio = require('cheerio'); 
const axios = require("axios")
const stats = [];
const profits = []; 
const breakdown = [];
var testsPassed = 0;
var pe = 0;
var eps = 0;
var ass = 0;
var lia = 0;


async function getInfo(testURL) {
  axios.get(testURL).then(urlResponse =>  {
    const $ = cheerio.load(urlResponse.data);


  });

}

async function getSummary(urlSum) {
    axios.get(urlSum).then(urlResponse =>  {
       
        const $ = cheerio.load(urlResponse.data);
    
        $("tr.Bxz\\(bb\\)").each((i, element) => {
            const link = $(element)
            .find("td.Ta\\(end\\)")
            .text()
            stats.push(link)
            console.log(link)
        });
    //if bored in future, find a way to find using data-test attribute
        for (let i = 0; i < stats.length; i++) {
            if( i==10)  {
                pe = stats[i]
            console.log("PE RATIO(TTM):" + stats[i]);   
            }
            if( i==11)  {
                eps = stats[i]
            console.log("EPS(TTM): " + stats[i]);   
            }
        }
    });
    
}


async function getFinancials(urlFin) {
    axios.get(urlFin).then(urlResponse =>  {

    
        const $ = cheerio.load(urlResponse.data);
    
        $("div.Ta\\(c\\).Py\\(6px\\).Bxz\\(bb\\).BdB").each((i, element) => {
            const link = $(element)
            .find("span")
            .text()
            profits.push(link)
          //  console.log(link)
        });
    
        for (let i = 1; i < 4; i++) {
            console.log(profits[i]+": "+profits[14+i]);
        }
       
        
    });
}

async function getBal(urlBal) { 
    axios.get(urlBal).then(urlResponse =>  {
    
        const $ = cheerio.load(urlResponse.data);
    
        $("div.Ta\\(c\\).Py\\(6px\\).Bxz\\(bb\\).BdB").each((i, element) => {
            const link = $(element)
            .find("span")
            .text()
            breakdown.push(link)
          //  console.log(link)
        });
        for (let i = 0; i < breakdown.length; i++) {
            if( i==4)  {
            ass = breakdown[i];
            console.log("TOTAL ASSETS: " + breakdown[i]);   
            }
            if( i==8)  {
            lia = breakdown[i];
            console.log("TOTAL LIABILITIES: " + breakdown[i]);   
            }
        }
        
    });
}

async function getPassed() {
    let year1 = profits[15].replace(/,/g,'') 
    let year2= profits[16].replace(/,/g,'') 
    let year3 = profits[17].replace(/,/g,'') 

    //tests PE ratio
    if (pe < 25 ) {
        testsPassed++;
        console.log("CRITERION [1] MET: PE under 25")
    } else {
        console.log("CRITERION [1] FAILED: PE under 25")
    }

    //tests Earnings per share
    if (eps > 2) {
        testsPassed++;
        console.log("CRITERION [2] MET: EPS over 2")
    } else {
        console.log("CRITERION [2] FAILED: EPS over 2")
    }

    //tests 3 years of net profit
    if (year1 > 0  && year2 > 0 && year3 > 0) {
        testsPassed++;
        console.log("CRITERION [3] MET: 3 YEARS OF NET PROFIT")
    } else {
        console.log("CRITERION [3] FAILED: 3 YEARS OF NET PROFIT")
    }

    //test Asset to Liability ratio
    ass = ass.replace(/,/g,'') 
    lia = lia.replace(/,/g,'') 
    let ratio = ass/lia
    if (ass/lia > 2 ) {
        testsPassed++;
        console.log("CRITERION [4] MET: ASSET:LIABILITY RATIO IS 2:1 OR BETTER (ratio is "+ratio+")")
    } else {
        console.log("CRITERION [4] FAILED: ASSET:LIABILITY RATIO IS NOT 2:1 OR BETTER(ratio is "+ratio+")")
    }
    if (testsPassed>=3) { 
        console.log("I would recommend this stock.")
    } else {
        console.log("I would NOT recommend this stock.")
    }
}
async function getAdvice(TICKER) {
  //  console.log(testsPassed)
     console.log("*****")
    await getSummary("https://finance.yahoo.com/quote/"+TICKER+"?p="+TICKER+"&.tsrc=fin-srch")
    await  getFinancials("https://finance.yahoo.com/quote/"+TICKER+"/financials?p="+TICKER)
    await getBal("https://finance.yahoo.com/quote/"+TICKER+"/balance-sheet?p="+TICKER) 
    //very dumb solution
    setTimeout(() => {
        console.log("*****")
        getPassed()
    }, 2000); 
}

getAdvice("AAPL")