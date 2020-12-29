const socketio = require('socket.io');
const config = require('config');

const ALLOWED_ORIGIN = config.get('allowedOrigin');

function createSocketServer(server) {
    const socketServer = socketio(server, {
        cors: {
            origin: ALLOWED_ORIGIN,
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    socketServer.on('connection', function (socket) {
        console.log('New Connection');

        // Quand on arrive sur la page ChatScreen, par défault on est dans la room global (pilotes + admins)
        var myRoom = 'Officiel'
        socket.join(myRoom)
        console.log('JE SUIS DANS ROOM : ', myRoom)

        // Listen if user is changing chat room
        socket.on('changeRoom', function (roomsInfo) {

            socket.join(roomsInfo.newRoom)
            myRoom = roomsInfo.newRoom
            console.log('JE SUIS DANS ROOM : ', myRoom)
        })

        // Listen another event
        socket.on('messageToChannel', function (messageInfo) {
            console.log('in ROOM : ', messageInfo)
            socketServer.to(myRoom).emit('messageFromChannel', { messageInfo, room: myRoom })
        })
    })

    return socketServer;
}

module.exports = createSocketServer;