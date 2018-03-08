/*
  Kommunikation mellan server och klient.
  Lyssnar på event och skickar.
*/
var chatApp = (function() {


  var _socket = io();

  /*
    Initierar applikation
  */
  function init() {
    connectUser();
  }

  /*
    Lyssnar på event från server och skickar event om ny klient.
  */
  function connectUser() {

    _socket.on('userInRoom', function(users) {
      
      domOutput.printOnlineUsers(users);
    })

    _socket.emit('userJoin');
    _socket.on('welcomeUser', function(msg) {
      domOutput.printMessage(msg.from, msg.text, utils.getTime(msg.time))
    });

    _socket.on('newMessage', function(msg) {
      domOutput.printMessage(msg.from, msg.text, utils.getTime(msg.time))
    });

    _socket.on('reconnect', function() {
      console.log("reconnecting ")
    })
    _socket.on('connect_error', function(error) {
      console.log('error', error);
    });

    _socket.on('disconnect', function(err) {
      console.log('you have been disconnected', err);
    })

  }

  /*
    Skickar meddelande till server.
  */
  function sendMessage(msg) {
    _socket.emit('sendMessage', {
      text: msg
    });
  }
  
  /*
    Publika funktioner
  */
  return {
    init: init,
    sendMessage: sendMessage
  };
})();

window.addEventListener('load', chatApp.init);
