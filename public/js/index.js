

var ChatApp = (function(){

    var _messageDOM = null;
    var _sendDOM = null;
    var _textDOM = null;
    var _user = null;
    const socket = io();
    function init(){
        var params = [];
       params = getParams(window.location.search.substr(1));
       connectUser(params[0]);

       _messageDOM = document.getElementById('messages');
       _textDOM = document.getElementById('text');
       _sendDOM = document.getElementById('send');
       _sendDOM.addEventListener('click', function(){
           console.log("CLICK");
        sendMessage(_user,_textDOM.value);
       })
       
    }

    function connectUser(user){
         _user = user;
        socket.on('connect', function(){
            
            console.log('connected');
            socket.emit('userJoin', _user);
            socket.on('welcomeUser', function(msg){
                console.log(msg);
                printMessage(msg.from,msg.text);
            });
        
        });

        socket.on('newMessage',function(msg){
            printMessage(msg.from,msg.text);
        });
        console.log('ssdasds');
          

        socket.on('disconnect', function(){
            console.log('you have been disconnected');
        })

    }

    
    function printMessage(from,text){
        var li = document.createElement('li');
        li.innerHTML = from + " : " + text;
        console.log(li);
        _messageDOM.appendChild(li);
        
    }

    function sendMessage(_from,_text){
        var msg = {
            from: _from,
            text: _text
        }
        socket.emit('sendMessage', msg);
    }

    function newMessage(msg){
        console.log(msg);
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