


var ChatApp = (function(){

    var _messageDOM = null;
    var _sendDOM = null;
    var _textDOM = null;
    var _userObj = {};
    var _socket = io('http://localhost:3000/');
   console.log(_socket);
    function init(){
    
       _messageDOM = document.getElementById('messages');
       _textDOM = document.getElementById('text');
       _sendDOM = document.getElementById('send');

       
       connectUser(getParams(window.location.search.substr(1)));
       _sendDOM.addEventListener('click', function(){
        sendMessage();
       });
    }

    function connectUser(userProp){
        userObj = {
            user: userProp[0],
            room: userProp[1],
            id: _socket.id
        };
    
        _socket.on('serverr',function(server){
            console.log(server);
        })
        _socket.emit('userJoin', userObj);
        _socket.on('welcomeUser', function(msg){
                console.log(_socket.id);
                
                printMessage(msg.from,msg.text,getTime(msg.time));
            });

        _socket.on('connect', function(){
            console.log('connected to the server');
        })
        _socket.on('newMessage', function(msg) {
            console.log(msg);
            printMessage(msg.from,msg.text,getTime(msg.time));
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


    
 

    function sendMessage(){
        _socket.emit('sendMessage',{
            from: userObj.user,
            text: _textDOM.value,
            room: userObj.room
        });
      
        
    }

    function printMessage(from,text,time){
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.innerHTML = time;
        li.innerHTML = from + " : " + text;
        li.appendChild(span);
        _messageDOM.appendChild(li);
        
    }


    function getTime(ms){
    var date = new Date(ms);
    var time =date.toString().split(" ");
    return time[4].slice(0,5);
    }
    

   


    function getParams(uri){
        var temp = [];
        uri.split("&").forEach(function(item){temp.push(item.split("=")[1]);}); 
        return temp;
    }


    return {
        init: init
    };
})();

window.addEventListener('load',ChatApp.init);