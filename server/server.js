const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');

const path = require('path');
const socketIO = require('socket.io');




// process.env.PORT för Heroku 
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
var app = connect();
app.use(serveStatic(publicPath));
var server = http.createServer(app);


var io = socketIO(server);
io.on('connection', (socket) => {
    console.log(' Connected');
    socket.on('helllo', (data) => {
        console.log(data);
    })

    socket.on('disconnect', () => {

    })
});
server.listen(port, () => { console.log(`Server is up on ${port}`); })
