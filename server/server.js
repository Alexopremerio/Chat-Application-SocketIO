

const http = require('http');
const url = require('url');
const path = require('path');


const {route} = require('./route.js');

const render = require('./render.js');

var server = http.createServer((req, res)=> {
    if(req.method == 'POST'){
        req.on('data', (data) => {
            server.postData = data.toString();
        });
    }

       // handle css and js files
    if(path.extname(req.url) === ".css" || path.extname(req.url) === ".js"){
        var filename = req.url.split("/");
        render.rend(res,filename[2],filename[1]);
    }
    
    // route html files
    route(req,res);
    });

module.exports = {server};

