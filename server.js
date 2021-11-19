const express = require("express");
const app = express();
const port = 8000;
const server = app.listen(port, () => console.log(`Droppin eaves on port ${port}...`));

// Hook up server to socket
const io = require("socket.io")(server, {cors: true});

const clients = [];

io.on("connection", (socket) => {
    socket.on("chat", inputMessage => {
        console.log("Got message: " + inputMessage);
        io.emit("send chat", inputMessage);
    })
    socket.on("login", userAdded => {
        clients.push({"id":socket.id, "user": userAdded});
        io.emit("userList", clients);
    })
    socket.on("disconnect", something => {
        let id = socket.id;
        for (let i =0; i < clients.length; i++){
            if (clients[i].id == id){
                clients[i] = clients[clients.length - 1]
                clients.pop();
                break
            }
        }
        io.emit("userList", clients);
    })
});


