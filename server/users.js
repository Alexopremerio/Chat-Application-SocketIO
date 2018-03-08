/*
  Lagring av användare 
*/
const Users = {

  userList: [],

  /*
    Lägger till använadre i lista
  */
  add: (userObj) => {
    Users.userList.push(userObj);
    console.log("UserList", Users.userList);
  },

  /*
    Hämtar samliga användare i ett rum
  */
  getUser: (room) => {
    var user = Users.userList.filter((users) => users.room == room);
    return user;
  },

  /*
    Tar bort använadre
  */
  remove: (userObj) => {
    var user = Users.userList.splice(Users.userList.indexOf(userObj), 1);
    console.log("Removed user", user);
  },

  /*
    Lista med rum som har använadre i sig
  */
  activeRooms: () => {
    var rooms = [];
    Users.userList.forEach((item) => {
      if (rooms.indexOf(item.room) < 0) rooms.push(item.room);
    })
    return rooms;
  },

  /*
    använadre objektet som sparas in.
  */
  createUserObj: (postData, userId) => {
    var userObj = {
      name: postData.name,
      room: postData.room,
      id: userId,
      takenIndex: postData.nameIndex || ""
    };
    return userObj;
  }

}




/*
  Exports
*/
module.exports = {
  Users
};
