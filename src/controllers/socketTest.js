//// A simple route for testing the connection of web soket with the front ////

function socketTest(req, res) {
    req.dependencies.socketServer.emit('sendMessageToAll', { message: 'COUCOU' });
    res.json({ message: 'Welcome' });
}

module.exports = socketTest;