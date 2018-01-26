const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');

const path = require('path');
const socketIO = require('socket.io');





const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
var app = connect();
app.use(serveStatic(publicPath));
var server = http.createServer(app);


var io = socketIO(server);
io.on('connection', (socket) => {
    var username;
    console.log(' Connected');
    socket.on('userJoin', (data) => {
        
        username = data;
        console.log(`user ${username} connected`);
        socket.emit('welcomeUser', ({
            from: 'Admin',
            text: `Welcome ${username}.`
        }));
        socket.broadcast.emit('welcomeUser', { from: 'Admin', text: `${username} joined the room`})
    });

    socket.on('sendMessage', (msg) => {
        socket.emit('newMessage', msg);
        socket.broadcast.emit('newMessage', msg);
    })
    
    
     
    socket.on('disconnect', () => {

    })
});
server.listen(port, () => { console.log(`Server is up on ${port}`); })
