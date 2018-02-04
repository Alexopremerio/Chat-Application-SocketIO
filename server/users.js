 const Users = {

    userList: [],

    add: (userObj) => {
         Users.userList.push(userObj);
         console.log("UserList", Users.userList);
     },
 
     getUser:  (id) => {
        var user = Users.userList.filter((users) => users.id == id);
        return user[0];
     },

     remove: (userObj) => {
       var user =  Users.userList.splice(Users.userList.indexOf(userObj), 1);
       console.log("Removed user", user);
     }

 }

  



module.exports = {Users};

