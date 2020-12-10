const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const dataBaseTest = require('../controllers/dataBaseTest');
const socketTest = require('../controllers/socketTest');


router.get('/', home);
router.get('/db/test', dataBaseTest);
router.get('/socket-test', socketTest);

module.exports = router;