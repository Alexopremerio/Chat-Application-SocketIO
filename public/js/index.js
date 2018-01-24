var ChatApp = (function () {
    var socket;
    function init(){
        socket = io();
        
        socketIO();
        
    }

    function socketIO(){
        console.log(socket);
        console.log('this: ' +this);
        socket.emit('hello', 'heelll');


    }
    return {
        init: init
    };
})();

window.addEventListener('load',ChatApp.init);