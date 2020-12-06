function socketTest(req, res) {
    console.log('Ma route')
    req.dependencies.socketServer.emit('sendMessageToAll', { message: 'COUCOU' });

    res.json({ message: 'Welcome' });
}

module.exports = socketTest;