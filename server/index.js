const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

const { AvatarGenerator } = require('random-avatar-generator');
const generator = new AvatarGenerator();

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users')

const chatBot = { username :" Chat Bot", avatar :generator.generateRandomAvatar()};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {

    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id, username, room, generator.generateRandomAvatar());
        socket.join(user.room);
        //Wellcome new user
        socket.emit('message',formatMessage(chatBot.username,"Wellcome to the chat",chatBot.avatar))
        socket.broadcast.to(user.room).emit('message',formatMessage("Chat Bot",`${user.username} has joined to chat`))

    })  
    
      //Listen for chat message
    socket.on('chat-message',msg=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg,user.avatar));
    })

    socket.on('disconnect',()=>{
        console.log('A user disconnected')
    })
});

http.listen(PORT,console.log(`Server started on port ${PORT}`))