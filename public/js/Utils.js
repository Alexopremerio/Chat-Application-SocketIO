var Utils = (function(){

    function getTime(ms){
        var date = new Date(ms);
        var time =date.toString().split(" ");
        return time[4].slice(0,5);
    }
        
    
    function getParams(uri){
        var temp = [];
        uri.split("&").forEach(function(item){temp.push(item.split("=")[1]);}); 
        return temp;
    }

    return {
        getTime: getTime,
        getParams: getParams
    }
}())