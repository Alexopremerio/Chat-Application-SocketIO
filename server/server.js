/*
  Node core moduler
*/
const http = require('http');
const url = require('url');
const path = require('path');
const querystring = require('querystring');

/*
  Importerade filer
*/
var render = require('./render.js');
var {Users} = require('./users.js');
var {register} = require('./register.js');

/*
  Skapa server 
*/
var server = http.createServer((req, res) => {

 
  // .css och .js filer
  if (path.extname(req.url) === ".css" || path.extname(req.url) === ".js") {
    var filename = req.url.split("/");
    render.rend(res, filename[2], filename[1]);
  }

   // HTML filer
   route(req, res);

});


/*
  hanterar URI vägar och använadre uppgifter.
*/
var route = (req, res) => {

  // Ingångssida
  if (req.url === "/") {
  
    var obj = {
      rooms: Users.activeRooms()
    };
    render.rend(res, 'index.html', '/html', obj);
    return;
  }


  // chat sida, kontroll om använadre kommit dit via post request eller inte.
   else if (req.url === "/chat") {

    if (req.method == 'POST') {
      req.on('data', (data) => {
        server.postdata = authUser(querystring.parse(data.toString()));
        render.rend(res, 'chatroom.html', '/html', server.postdata);
      });
    }
    // om inget post request, skicka tbx anväandre till ingångssida
     else {
      var obj = {
        rooms: Users.activeRooms()
      };
      render.rend(res, 'index.html', '/html', obj);
    }
    
  }
  // Om sökväg inte finns
 /*  else {
        var found = register.find(item => item == req.url);
        if(typeof found == 'undefined') render.errMsg(res,"Wrong path, try '/' or '/chat' ")
      }*/
}

/*
  Om användares namn existerar i valt rum lägg till indexerad siffra
*/
var authUser = user => {
  var usersInRoom = Users.getUser(user.room);
  if (usersInRoom.length == 0) {
    return user;
  } else {
    var result = usersInRoom.filter((activeUser) => activeUser.name == user.name);
    user.nameIndex = result.length;
  }
  return user;
}

/*
  Export
*/
module.exports = {
  server
};
