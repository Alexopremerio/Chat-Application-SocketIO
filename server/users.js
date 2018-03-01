
 const Users = {

    userList: [],

    add: (userObj) => {
         Users.userList.push(userObj);
         console.log("UserList", Users.userList);
     },
 
     getUser:  (room) => {
        var user = Users.userList.filter((users) => users.room == room);
        return user;
     },

     remove: (userObj) => {
       var user =  Users.userList.splice(Users.userList.indexOf(userObj), 1);
       console.log("Removed user", user);
     },

     createUserObj: (postData,userId) => {
      var userObj = {
        name: postData[0],
        room: postData[1],
        id: userId
      };
      return userObj;
     }

 }

  



module.exports = {Users};

