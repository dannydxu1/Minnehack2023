const cheerio = require('cheerio'); 
 
const $ = cheerio.load('<h2 class="title">Hello world</h2>') // Load markup 
 
// Use a selector to grab the title class from the markup and change its text 
$('h2.title').text('Hello there!'); 
$('h2').addClass('welcome'); // Add a 'welcome' class to the markup 
 
console.log($.html()); // The html() method renders the document