// YOUR CODE HERE:


var message = {
  username: 'taylor',
  text: 'whatsup',
  roomname: 'myRoom'
};
var loggedInAs;
var rooms = ["SELECT ALL"];

var currentRoom = 'all';

var send = function(message) {
  $.ajax({
    url: this.server+"/messages", 
    type: "POST",
    data: JSON.stringify(message),
    contentType: "application/json",
    success: function(data) {
      console.log('chatterbox: message sent');
    },
    error: function(data) {
      console.error('chatterbox: Failed to send message');
    },
  });
};


var fetch = function() {
  $.ajax({
    url: this.server+"/messages",
    type: "GET",
    contentType: "application/json",
    success: function(data) {
      data.forEach(function(message){
        for (var key in message) {
          message[key] = _.escape(message[key]);
        }
        addMessage(message);
        rooms.push(message.roomname);
      });
      addRooms(rooms.sort());
    },
    error: function(data) {
      console.error('chatterbox: Failed to receive message');
    }
  });
};

var clearMessages = function() {
  $('#chats').empty();
};

var addMessage = function(message) {
  var child = "<div class='"+message.roomname+" tweet'><div class='"+message.username+" username'>"+message.username+"</div><div>"+message.text+"</div></div>";
  $('#chats').append(child);
  //check if the room name exists
};

var addRoom = function(roomname) {
  var child = "<div class=roomname>"+roomname+"</div>";
  $('#roomSelect').append(child); 
};

var addRooms = function(array) {
  _.uniq(array).forEach(function(item) {
    addRoom(item);
  });
};

var addFriend = function(friendName) {
  var child = "<div>"+friendName+"</div>";
  $('#friends').append(child);
  $('.'+friendName).parent().css("font-weight", "bold");
};


var handleSubmit = function(newMessage) {
  var toSend = {
    username: loggedInAs, // GOOD
    text: newMessage, //
    roomname: currentRoom
  };
  app.send(toSend);
};

var app = {
  init: function() {
    loggedInAs = window.location.search.split('=')[1];
    $("#main").on('click', '.username', function() {
      var thisDiv = $(this);
      app.addFriend(thisDiv[0].innerHTML);
    });
    $( "#send" ).unbind('submit').bind('submit', function( event ) {
      event.preventDefault();
      var newMessage = $("#message").val();
      app.handleSubmit(newMessage);
    });
    app.fetch();
    $('#roomSelect').on('click', '.roomname', function() {
      currentRoom = $(this)[0].innerHTML;
      $('.tweet').hide();
      $("."+currentRoom).show();
      if (currentRoom === 'SELECT ALL') {
        $('.tweet').show();
      };
    });
    $( "#createRoom" ).unbind('submit').bind('submit', function( event ) {
      event.preventDefault();
      var newRoom = $("#newRoom").val();
      addRoom(newRoom);
    });
    var sendUser = {newuser: loggedInAs};
    $.ajax({
    url: this.server+"/users", 
    type: "POST",
    data: JSON.stringify(sendUser),
    contentType: "application/json",
    success: function(data) {
      
      console.log('chatterbox: user joined');
    },
    error: function(data) {
      console.error('chatterbox: user failed to join');
    },
  });
    
  },
  server: "http://127.0.0.1:3000/classes",
  send: send,
  fetch: fetch,
  clearMessages: clearMessages,
  addMessage: addMessage,
  addRoom: addRoom,
  addFriend: addFriend,
  handleSubmit: handleSubmit
};

$(document).ready(app.init());
setInterval(function(){
  app.clearMessages();
  app.fetch();}, 20000);
