



const render = require('./render.js');
console.log("6",render);
var route = (req,res)=> {

    // homepage
    if(req.url === "/") {
    render.rend(res,'index.html','/html');
    return;
    }
    // chat page
     else if (req.url === "/chat") {
        if(req.method == 'POST'){
            req.on('data', (data) => {
              console.log("POST DADATA",data);
            });
        }
        console.log('/chat : ', req.url);
        render.rend(res,'chatroom.html','/html');
        return;
        } 
    }

module.exports = {route};