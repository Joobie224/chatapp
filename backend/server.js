const express = require('express');
const app = express();
const cors = require('cors')
const socketio = require('socket.io');

app.use(cors());




// app.listen(...) returns the server that it created
const server = app.listen(3000);

// socketio requires a server
// socketio turns your server into a 'socket server'

const io = socketio(server, {
    cors: {
        origin: 'https://chatapp-w1le.onrender.com',
    }
});

const messages = [];

io.on('connection', (socket) => {
    // when a connection is made to the server, what can you do to send all the messages to the client that was connected?
    socket.emit('allMessages', messages);

    socket.on('sendMessage', (data) => {
        messages.push(data);
        io.emit('allMessages', messages);
    })
})