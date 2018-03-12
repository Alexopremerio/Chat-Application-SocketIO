/*
 Node core moduler
*/
const path = require('path');
const fs = require('fs');

/*
  Renderar samtliga filer 
*/
var render = (res, filename, parentRoute, values) => {

  res.writeHead(200, {
    'Content-Type': getContentType(filename)
  });
  fs.readFile('public' + parentRoute + '/' + filename, 'utf-8',(err,data) => {
    if(err) throw err;
    data = replaceContent(values, data);
  res.write(data);
  res.end();
  })
  
}

/*
 Error vid fel sökväg
*/
var errMsg = (res, msg) => {
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.write(msg);
  res.end();
}

/*
 tar filändelse och pararihop med rätt MIME typ
*/
var getContentType = filename => {
  var extMime = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
  };
  var fileType = path.extname(filename);
  return extMime[fileType];
}

/*
 Template renderare. Byter ut markörer i HTML filer till önskvärd data
*/
var replaceContent = (values, file) => {

  for (let val in values) {
    if (Array.isArray(values[val]) === true) {
      file = file.replace("{{" + val + "}}", replaceContentArray(values[val]));
    } else {
      file = file.replace("{{" + val + "}}", values[val]);
    }
  }
  return file;
}

/*
 Template renderare för aktiva rum på ingångssidan
*/
var replaceContentArray = arr => {
  var rooms = "";
  arr.forEach((key) => rooms += "<button>" + key + "</button>");
  return rooms;
}


/*
 Export
*/
module.exports.errMsg = errMsg;
module.exports.rend = render;
