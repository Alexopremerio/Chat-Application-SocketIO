/*
  Funktionalitet för ingångssidan 
     *notis - Aktiva rum renderas av servern.
*/
var signIn = (function() {

  var formElm = null;
  var roomInput = null;
  var nameInput = null;

  /*
    Initierar element
  */
  function init() {
    formElm = document.getElementById('form-submit');
    activeRooms = document.getElementById("active-rooms");
    roomInput = document.getElementById("room").children[0];
    nameInput = document.getElementById("name").children[0];
    if (activeRooms.children.length > 0) joinActiveRoom(activeRooms.children);
  }

  /*
    Kontroll om namn är angivet vid klick av ett aktivt rum.
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

  /*
    Publika funktioner
  */
  return {
    init: init
  }
}());


window.addEventListener('load', signIn.init);
