const socketIOClient = require('socket.io-client');

const socket = socketIOClient("http://192.168.1.26:3000");

socket.on('sendMessageToAll', (msg) => {
    console.log('Message received', msg)
})