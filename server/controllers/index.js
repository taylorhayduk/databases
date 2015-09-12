var models = require("../models");
var bluebird = require("bluebird");
var url = require("url");


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type" : "application/json"// Seconds.
};

var data = {"results": []};
//var pathname = url.parse(request.url).pathname;
var headers = defaultCorsHeaders;

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

module.exports = {
  messages: {
    get: function (request, response) {  sendResponse(response,data, 200);}, // a function which handles a get request for all messages
    post: function (request, response) { 
      data.results.push(request.body);
      console.log(data.results);
      sendResponse(response, data, 201);
        
    }  // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {console.log("something is working");},
    post: function (req, res) {console.log("something is working");}
  }
};

