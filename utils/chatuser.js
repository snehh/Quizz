var userarray = [];

function addUser(username) {
    userarray.push(username)
}

function removeUser(username) {
    for(var i=0; i<user.length; i++){
        if(userarray[i] === username){
            userarray.splice(i,1)
            break;
        }
    }
}

module.exports = {addUser, removeUser}