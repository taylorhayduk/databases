var db = require('../db');




module.exports = {
  messages: {
    get: function(callback) {
      var getQuery = 'SELECT messages.text, users.username FROM messages LEFT JOIN users ON messages.userID=users.userID;'
      db.query(getQuery, function(err, results) {
        //if (err) throw er
        callback(results);
      });
    },
    post: function (params, callback) {
      var postQuery = 'INSERT INTO messages (text, userID, roomID) values (?, (select userID from users where username = ? limit 1), (select roomID from rooms where roomname = ? limit 1))';
      db.query(postQuery, params, function(err, results){
        callback(results);
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (params, callback) {
      var postQuery = 'INSERT INTO users (username) values ( ? )';
      db.query(postQuery, params, function(err, results){
        callback(results);
      });
    }
  }
};

module.exports.messages.get(function(res){
  console.log(res);
});

