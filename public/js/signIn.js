/*
    Hanterar post-request vid ansluting av ett aktivt rum.
*/
var signIn = (function() {

  var formElm = null;
  var roomInput = null;
  var nameInput = null;

  function init() {
    formElm = document.getElementById('form-submit');
    activeRooms = document.getElementById("active-rooms");
    roomInput = document.getElementById("room").children[0];
    nameInput = document.getElementById("name").children[0];
    if (activeRooms.children.length > 0) joinActiveRoom(activeRooms.children);
  }

  /*
    Sätter formulärets rums input till värdet av den valde knappen
  */
  function joinActiveRoom(activeRooms) {
    for (var i = 0; i < activeRooms.length; i++) {
      activeRooms[i].addEventListener('click', function() {

        if (nameInput.value == "") {
          return;
        } else {
          roomInput.value = this.innerText;
          formElm.submit();
        }
      })
    }
  }

  return {
    init: init
  }
}());

window.addEventListener('load', signIn.init);
