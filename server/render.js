
 const path = require('path');
 const fs = require('fs');

     var render = (res,filename,parentRoute) => {
      
           res.writeHead(200, {'Content-Type': getContentType(filename)});
             var fileContents = fs.readFileSync('public/'+parentRoute+'/' + filename, {encoding: "utf8"});
            res.write(fileContents);
            res.end();
        }
    
var errMsg = (res,msg) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write(msg, (err)=> res.end());
   }





    var getContentType = (filename)=> {
        var extMime = {
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.html': 'text/html'
           };
        var fileType = path.extname(filename);
        return extMime[fileType];
    }



module.exports.errMsg = errMsg;
module.exports.rend = render;