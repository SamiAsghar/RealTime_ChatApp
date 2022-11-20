const io=require('socket.io')(8000);
const users={};

// socket.emit ==> Client.js

// socket.broadcast.emit ==> Index.js/Server

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        // console.log("beeeee");
    
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
    })

    socket.on('send',message=>{

        let data={message:message,name:users[socket.id]};       
        socket.broadcast.emit('receive',data)
    })
    
    socket.on("disconnect", message => {
        socket.broadcast.emit('user-left',users[socket.id]);
        delete users[socket.id]
      });
})