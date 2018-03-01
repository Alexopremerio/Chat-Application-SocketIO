
const socketIO = require('socket.io');

var {Users} = require('./users.js');
var {newMessage} = require('./message.js');
var {server} = require('./server.js');



function getParams(uri){
    var temp = [];
    uri.split("&").forEach(function(item){temp.push(item.split("=")[1]);}); 
    return temp;
}


var io = socketIO(server);
io.on('connection', (socket) => {
  //  console.log(" sockets connected ", io.engine.clientsCount);
    socket.on('userJoin', () => {
        
     //   console.log("26", server.postData);
        socket.user = Users.createUserObj(getParams(server.postData),socket.id);
        
       // socket.user = client;
        socket.join(socket.user.room);  
        Users.add(socket.user);
      //  console.log(" 29 ",Users.getUser(socket.user.room));
       // io.to(socket.user.room).emit('userInRoom',(Users.getUser(socket.user.room)));
      //  console.log("31 ROOM ", socket.user.room);
        updateOnlineList(socket.user.room);
        socket.emit('welcomeUser', (newMessage("Admin",`Welcome ${socket.user.name}`)));
        socket.broadcast.to(socket.user.room).emit('welcomeUser', (newMessage('Admin',`${socket.user.name} joined the room`)));
    });

    socket.on('sendMessage', (msg) => {
     //   console.log("RAD 36",msg);
        io.to(socket.user.room).emit('newMessage', (newMessage(socket.user.name,msg.text)));
    })

    var updateOnlineList = (room) =>{
     //   console.log('51 ',Users.getUser(room));
        io.to(room).emit('userInRoom',(Users.getUser(room)));
    }
    
    socket.on('disconnect', (err) => {
      //  console.log("disconnected server", err);
        var room = socket.user.room;
     //   console.log("51 dis USER = ",socket.user);
        Users.remove(socket.user);
        server.postData = "undefined";
        
        // socket.user.room undefined in updateOnlineList
        
        updateOnlineList(room);
    })

    socket.on('reconnecting', (id) => {
         //   console.log("48",id);
    })

});

const port = process.env.PORT || 3000;
server.listen(port, () => { console.log(`Server is up on ${port}`); })
   