const users = [];

//Join user to chat

function userJoin(id, username, room, avatar) {
    const user = { id, username, room, avatar };
    users.push(user);
    return user;
}

function getCurrentUser(id){
    return users.find(user=>user.id === id);
}


module.exports = {
    userJoin,
    getCurrentUser
}