var http = require("http");

var config = require('./config');
var SkPublishAPI = require('./skupublishapi');
var api = new SkPublishAPI(config.baseUrl, config.apiKey);

api.setRequestHandler({

  executeRequest: function(options, cb) {
    http.request(options, cb)
  },

  prepareGetRequest: function(serverName, uri, accessKey) {
    var headers = {
      'Host': serverName,
      'accessKey': accessKey,
      'Content-Type': 'application/json'
    };

    var options = {
      url: uri,
      method: 'GET',
      headers: headers
    };

    return options;
  }

})
