



var DomOutput = (function() 
{
    var messageDOM = null;
    var textDOM = null;
    var sendDOM = null;
    var onlineUsers = null;
    var roomTitle = null;
    // message output
    
    function init(){
      messageDOM = document.getElementById('messages');
      textDOM = document.getElementById('text');
      sendDOM = document.getElementById('send');
      onlineUsers = document.getElementById('onlineUsers');
      roomTitle = document.getElementById('RoomName');
      sendDOM.addEventListener('click', function(){
          ChatApp.sendMessage(textDOM.value);
      });
    }

    function printMessage(from,text,time){
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.innerHTML = time;
        li.innerHTML = from + " : " + text;
        li.appendChild(span);
        messageDOM.appendChild(li);
    }

    function userObject(arr){
        printOnlineUsers(arr);
        printRoomName(arr[0].room);
    }

    function printOnlineUsers(arr){
        onlineUsers.innerHTML = "";
        arr.forEach(function(item) {
            var li = document.createElement('li');
            var span = document.createElement('span');
            span.innerHTML = item.name;
            li.appendChild(span);
            onlineUsers.appendChild(li);
        });
    }

    function printRoomName(room) {
        roomTitle.innerHTML = "";
        var title = document.createElement('h2')
        title.innerHTML = room;
        roomTitle.appendChild(title);
    }

    return {
        init: init,
        printMessage: printMessage,
        userObject: userObject
    }

}());

window.addEventListener('load',DomOutput.init);