/*
  Hantering av grafiska element
*/
var domOutput = (function() {

  // DOM element
  var messageDOM = null;
  var textDOM = null;
  var sendDOM = null;
  var onlineUsers = null;
  
  /*
    Initierar element och händelselyssare
  */
  function init() {
    messageDOM = document.getElementById('messages');
    textDOM = document.getElementById('textMsg');
    sendDOM = document.getElementById('sendMsg');
    onlineUsers = document.getElementById('onlineUsers');
    sendDOM.addEventListener('click', eventMessage);
    window.addEventListener('keypress', eventMessage);
  }

  /*
    När använadre skickar meddelande
  */
  function eventMessage(e) {
    if (e.type == "click" || e.keyCode == 13) {
      if (textDOM.value == "") return;
      chatApp.sendMessage(textDOM.value);
      textDOM.value = "";
    }
  }

  /*
    Markup och utskrivning av meddelanden
  */
  function printMessage(from, text, time) {
    var li = document.createElement('li');
    var divUpper = document.createElement('div');
    var divLower = document.createElement('div');
    var spanName = document.createElement('span');
    var spanMsg = document.createElement('span');
    var spanTime = document.createElement('span');

    divUpper.appendChild(spanName);
    divUpper.appendChild(spanTime);
    divLower.appendChild(spanMsg);

    spanName.innerHTML = from;
    spanMsg.innerHTML = text;
    spanTime.innerHTML = time;

    li.appendChild(divUpper);
    li.appendChild(divLower);

    messageDOM.appendChild(li);
    autoScroll();
  }

  /*
    Utskrivning av användare i ett rum
  */
  function printOnlineUsers(arr) {
    onlineUsers.innerHTML = "";
    arr.forEach(function(item) {
      var li = document.createElement('li');
      var span = document.createElement('span');
      if(item.takenIndex != "") item.name = item.name + '(' + item.takenIndex + ')';
      span.innerHTML = item.name;
      li.appendChild(span);
      onlineUsers.appendChild(li);
    });
  }

  /*
    Scrollar chattfönstret automatiskt så senaste meddelanden syns.
  */
  function autoScroll() {
    var msgWrapper = document.getElementsByClassName('content')[0];
    var msg = document.getElementById('messages');
    var lastMsgHeight = msg.lastElementChild.offsetHeight;
    if (msgWrapper.clientHeight + msgWrapper.scrollTop + lastMsgHeight <= msgWrapper.scrollHeight) {
      console.log('scroll');
      msgWrapper.scrollTop = msgWrapper.scrollHeight;
    }
  }


  /*
    Publika funktioner
  */
  return {
    init: init,
    printMessage: printMessage,
    printOnlineUsers: printOnlineUsers
  }

}());

window.addEventListener('load', domOutput.init);
