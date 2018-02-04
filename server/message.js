

var newMessage = (from,text) => {
    return {
        from,
        text,
        time: Date.now()
    };
}

module.exports = {newMessage};