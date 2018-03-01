
 const path = require('path');
 const fs = require('fs');

    function view(templateName, values, response) {       

        var fileContents = fs.readFileSync('public/' + templateName + '.html', {encoding: "utf8"});
        reponse.write(fileContents);
        
      }


      function render(res,filename,parentRoute) {
        var extname = path.extname(filename)
        var extMime = {
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.html': 'text/html'
           };
           var mimeType = extMime[extname];
           console.log("MIMETYPE" ,mimeType);
           res.writeHead(200, {'Content-Type': mimeType});
            console.log("READ CSS FILE !!!!");
            var fileContents = fs.readFileSync('public/'+parentRoute+'/' + filename, {encoding: "utf8"});
            res.write(fileContents);
            res.end();
        }


module.exports = {render};