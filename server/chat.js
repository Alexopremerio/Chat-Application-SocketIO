/* 
 Socker.io bibliotek för chat funktionalitet
*/
const socketIO = require('socket.io');

/*
  Importerade lokala filer
*/
var {
  Users
} = require('./users.js');
var {
  newMessage
} = require('./message.js');
var {
  server
} = require('./server.js');

// init chat
var io = socketIO(server);

// anslutning till chat
io.on('connection', (socket) => {

  /*
   Lyssnar på klienter som ansluter
  */
  socket.on('userJoin', () => {
    socket.user = Users.createUserObj(server.postdata, socket.id);
    userJoin(socket.user.room)
    Users.add(socket.user);
    updateOnlineList(socket.user.room);

    // notis till ny använadre och andra i rummet
    socket.emit('welcomeUser', (newMessage("Admin", `Welcome ${socket.user.name}`)));
    socket.broadcast.to(socket.user.room).emit('welcomeUser', (newMessage('Admin', `${socket.user.name} joined the room`)));
  });

  // inkommande medelande, skickar ut till samtliga i rummet.
  socket.on('sendMessage', (msg) => {
    io.to(socket.user.room).emit('newMessage', (newMessage(socket.user.name, msg.text)));
  })

  /*
   Lägg till använadre
  */
  var userJoin = (user) => {
    socket.join(user);
  }

  /* 
  Uppdatera listan av användare i ett rum
  */
  var updateOnlineList = room => io.to(room).emit('userInRoom', (Users.getUser(room)));

  // Användare lämnar rummet: tar bort använadre och uppdatera listan.
  socket.on('disconnect', (err) => {
    var room = socket.user.room;
    Users.remove(socket.user);
    updateOnlineList(room);
  })
  socket.on('reconnecting', (id) => {})
});

// Server port
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
})
