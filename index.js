const express = require('express');
const app = express();
const http = require ('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const port = process.env.PORT || 3000;
const {generateMessage} = require('./models/messages')
const {addUser,getUser,getUsersInRoom} = require('./models/users.js')


require('./routes')(app);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + 'views');



io.on('connection', (socket) => {
    console.log('Hello new User')
    
    socket.on('join', ({username, room}) =>{

        const {user} = addUser({ id: socket.id, username, room})


        socket.join(user.room)

        socket.emit('message',generateMessage('Welcome'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
    })

    socket.on('sendMessage',(message)=>{
        const user = getUser(socket.id)

        io.emit('message',generateMessage(message))

    })

    socket.on('sendLocation',(coords)=>{
        io.emit('message',` https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
    })


server.listen(port,()=>{    //Listen on Server not app
    console.log("Listening on "+port);
})