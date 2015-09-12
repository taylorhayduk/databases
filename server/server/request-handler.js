/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require("url");


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type' : "application/json"// Seconds.
};

var data = {'results': []};
var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

 

  var pathname = url.parse(request.url).pathname;
  var headers = defaultCorsHeaders;

  var sendResponse = function(response, data, statusCode) {
    statusCode = statusCode || 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
  };

  var actions = {
    
    "OPTIONS" : function(request, response) {
      sendResponse(response, "placeholder", 200);
    },
    
    "GET" : function(request, response){
      sendResponse(response,data, 200);
    },
    
    "POST": function(request, response){
      var requestBody ="";
      request.on('data', function(data) {
        requestBody+= data;
      });
      request.on('end',function() {
        requestBody = JSON.parse(requestBody);
        data.results.push(requestBody); // this should be changed to post to model then to database
        
      });
      sendResponse(response, data, 201)
    } 
  };

  if ((request.method === "GET" || request.method === "POST") && pathname.match(/classes/) === null) {
    sendResponse(response, "Not Found", 404);
  }
  else{
    
    if(actions[request.method]){
      actions[request.method](request,response);
    }
    else{
      sendResponse(response,"Not Found", 404);
    }
  }
};

var handler = {};
handler.requestHandler = requestHandler;

module.exports = handler;

