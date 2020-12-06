const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const dataBaseTest = require('../controllers/dataBaseTest');

router.get('/', home);
router.get('/db/test', dataBaseTest);

router.post('/transponder', function (req, res) {
    console.log(req.body);
    res.json({ message: 'OK' })
})

router.get('/socket-test', (req, res) => {
    console.log('Ma route')
    req.dependencies.socketServer.emit('sendMessageToAll', { message: 'COUCOU' });

    res.json({ message: 'Welcome' });
})

module.exports = router;