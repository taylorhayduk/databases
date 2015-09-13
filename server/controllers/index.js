var models = require("../models");
var bluebird = require("bluebird");
var url = require("url");




module.exports = {
  messages: {
    get: function (req, res) {  
      models.messages.get(function(results){
        res.json(results);
      });
    },
      
    post: function (req, res) { 
      var params = [ req.body.text, req.body.username, req.body.roomname ];
      models.messages.post(params, function(err, results){
        res.json(results);
      });
        
    }  // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {console.log('THIS IS USERS/GET');},
    post: function (req, res) {
      console.log('THIS IS USERS/POST'+ req.body.newuser);
      var params = [req.body.newuser];
      console.log(params);
      models.users.post(params, function(err, results){
        res.json(results);
      });
    }
  }
};

