



const {render} = require('./render.js');

var routing = (req,res)=> {

    // homepage
    if(req.url === "/") {
    render(res,'index.html','/html');
    return;
    }
    // chat page
     else if (req.url === "/chat") {
        console.log('/chat : ', req.url);
        render(res,'chatroom.html','/html');
        return;
        } else {
            console.log(" ERRROROREOREOREROROE");
          //  err404(res);
        }
    }

var err404 = (res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Error 404: file not found', (err)=> res.end());
   }



module.exports = {routing};