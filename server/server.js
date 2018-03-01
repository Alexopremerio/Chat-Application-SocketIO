

const http = require('http');
const url = require('url');

const path = require('path');


const {routing} = require('./route.js');
const {render} = require('./render.js');





   
var server = http.createServer((req, res)=> {
    if(req.method == 'POST'){
        req.on('data', (data) => {
            server.postData = data.toString();
            console.log('server file ', server.postData);
        });
    }
       
    if(path.extname(req.url) === ".css" || path.extname(req.url) === ".js"){
        var filename = req.url.split("/");
        render(res,filename[2],filename[1]);
    }
    console.log("URLS :",req.url);
    routing(req,res);
    });

    
  /*  function style(request, response,filename,parentRoute) {
        var extname = path.extname(filename)
        var extMime = {
            '.js': 'application/javascript',
            '.css': 'text/css'  
           };
           var mimeType = extMime[extname];
           console.log("MIMETYPE" ,mimeType);
            response.writeHead(200, {'Content-Type': mimeType});
            console.log("READ CSS FILE !!!!");
            var fileContents = fs.readFileSync('public/'+parentRoute+'/' + filename, {encoding: "utf8"});
            
            response.write(fileContents);
          response.end();
        }
    var home = function(req,res){

        if(req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        view("index",{}, res);
        res.end();
        
        } else if (req.url === "/chat") {
            console.log('/chat : ', req.url);
            res.writeHead(200, {'Content-Type': 'text/html'});
            view("chatroom",{}, res);
            res.end();
            } else {
                error404(res);
            }


    }

 
 

    function view(templateName, values, response) {       

        var fileContents = fs.readFileSync('public/' + templateName + '.html', {encoding: "utf8"});
        reponse.write(fileContents);
        
      }*/

module.exports = {server};
//module.exports.postData = postData;
