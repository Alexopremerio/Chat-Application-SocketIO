


var ChatApp = (function(){

    var _socket = io();

    function init(){
       connectUser();
    }

    function connectUser(){
        
        // Lista clienter 
        _socket.on('userInRoom', function(users){
            DomOutput.userObject(users);
        })

        _socket.emit('userJoin');
        _socket.on('welcomeUser', function(msg){
                // init DOM references
                DomOutput.printMessage(msg.from,msg.text,Utils.getTime(msg.time))
            });

        _socket.on('newMessage', function(msg) {
            DomOutput.printMessage(msg.from,msg.text,Utils.getTime(msg.time))
        });

        _socket.on('reconnect', function(){
            console.log("reconnecting ")
        })
        _socket.on('connect_error', function(error) {
            console.log('error',error);
          });

        _socket.on('disconnect', function(err){
            console.log('you have been disconnected',err);
        })

    }
    
    function sendMessage(msg){
        _socket.emit('sendMessage',{
            text: msg
        });
    }
       

    return {
        init: init,
        sendMessage: sendMessage
    };
})();

window.addEventListener('load',ChatApp.init);