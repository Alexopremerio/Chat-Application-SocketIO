/*
  Meddelandes struktur, sätter timestamp.
*/
var newMessage = (from, text) => {
  return {
    from,
    text,
    time: Date.now()
  };
}

/*
  Export
*/
module.exports = {
  newMessage
};
