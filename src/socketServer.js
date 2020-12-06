const socketio = require('socket.io');

function createSocketServer(server) {
    const socketServer = socketio(server);

    socketServer.on('connection', () => {
        console.log('New Connection');
    })

    return socketServer;
}

module.exports = createSocketServer;