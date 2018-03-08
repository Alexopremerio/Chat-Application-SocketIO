/*
  Utils 
*/
var utils = (function() {

  /*
    Konverterar meddelandes tid från server.
  */
  function getTime(ms) {
    var date = new Date(ms);
    var time = date.toString().split(" ");
    return time[4].slice(0, 5);
  }

  /*
    Publika funktioner
  */
  return {
    getTime: getTime,
  }
}())
