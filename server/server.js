const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');

const path = require('path');
const socketIO = require('socket.io');

var {Users} = require('./users.js');
var {newMessage} = require('./message.js');




const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = connect();
app.use(serveStatic(publicPath));
var server = http.createServer(app);


var io = socketIO(server);
io.on('connection', (socket) => {
    console.log(" sockets connected ", io.engine.clientsCount);
    socket.on('userJoin', (client) => {
         
        // fix if refresh page, clients dissconnect never fireds.
       // Users.remove(client);
        socket.user = client;
        socket.join(client.room);
        Users.add(socket.user);
         
        socket.emit('welcomeUser', (newMessage("Admin",`Welcome ${client.user}`)));
        socket.broadcast.to(client.room).emit('welcomeUser', (newMessage('Admin',`${client.user} joined the room`)));
    });

   

    socket.on('sendMessage', (msg) => {
        console.log("RAD 36",msg);
        io.to(msg.room).emit('newMessage', (newMessage(msg.from,msg.text)));
    })
    

    socket.on('disconnect', (err) => {
        console.log("disconnected server", err);
        Users.remove(socket.user);


    })

    socket.on('reconnecting', (id) => {
            console.log("48",id);
    })

});
server.listen(port, () => { console.log(`Server is up on ${port}`); })
   