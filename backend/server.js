var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
var port = 5000

io.on('connection', (socket) => {

    socket.on("join",user=>{
        socket.emit('myId',socket.id)
        socket.emit('newMsg',{id:socket.id,msg:`Welcome to the room ${user.username}`})
        socket.broadcast.to(user.room).emit('newMsg',{id:socket.id,msg:`Mr ${user.username} join the room`})
        socket.join(user.room)

        socket.on("chatMsg",(msg)=>{
            io.to(user.room).emit('newMsg',msg)
        
          })
        socket.on('disconnect',()=>{
            console.log(user)
        })
    })
})

http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })