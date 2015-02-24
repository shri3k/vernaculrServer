var fs = require('fs');
var key = null;
try {
  var data = fs.readFileSync('./keys.json');
  key = JSON.parse(data.toString('utf8')).key1;
} catch (e) {
  console.log("No keys!! \n Exiting..");
  process.exit(1);
}
module.exports = {
  "baseUrl": "dictionary.cambridge.org",
  "apiKey": key,
  "dictionaryCode": "american-english"
}
