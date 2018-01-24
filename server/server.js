const http = require('http');
//const path = require('path');
const socketIO = require('socket.io');
const static = require('node-static');


// webb roten
const fileServer = new static.Server('./public');
// process.env.PORT för Heroku 
const port = process.env.PORT || 3000;


// Skapar server https://www.npmjs.com/package/node-static
var server = http.createServer((req, res) => {
    req.addListener('end', () => {
        fileServer.serve(req, res , (e, response) => {
            // om fil inte finns
            if(e && (e.status == 404)) {
                fileServer.serveFile('./file-not-found.html', 404, {}, req, res);
            }
        });
    }).resume();
})

var io = socketIO(server);
server.listen(port, () => {
     console.log(`Server is up on ${port}`);
    
    
})
