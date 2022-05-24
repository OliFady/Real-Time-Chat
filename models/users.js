const users = []

const addUser = ({id,username,room}) => {

    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const user = {id,username,room}
    users.push(user);
    return {user}
}

/*addUser({
    id: 20,
    username: 'Oliver',
    room : 'JavaScript'
})*/

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {

    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports= {
    addUser,
    getUser,
    getUsersInRoom
}