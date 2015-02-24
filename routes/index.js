var express = require('express');
var router = express.Router();
var http = require("http");
var config = require('../config');
var SkPublishAPI = require('../skupublishapi');
var api = new SkPublishAPI(config.baseUrl, config.apiKey);

var https = require("https");
var config = require('../config');
var SkPublishAPI = require('../skupublishapi');
var api = new SkPublishAPI(config.baseUrl, config.apiKey);

api.setRequestHandler({
  executeRequest: function(options, cb) {
    https.request(options, cb).end();
  },
  prepareGetRequest: function(serverName, uri, accessKey) {
    var headers = {
      'accessKey': accessKey,
      'Content-Type': 'application/json'
    };

    var options = {
      hostname: serverName,
      method: 'GET',
      path: uri,
      headers: headers
    };

    return options;
  }
});
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('yo man');
  res.send('this is neat');
});

router.get('/getEntry/:entryId', function(req, res, next) {
  var data = '';
  api.doAsync('getEntry', function(res) {
    res.on('data', function(chunk) {
			console.log(chunk.toString('utf8'));
      data += chunk.toString('utf8');
    });
  }, config.dictionaryCode, req.params.entryId, "json");
	res.send(data.toString('utf8'));
  console.log(data);
});

module.exports = router;
