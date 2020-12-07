const express = require('express');
const morgan = require('morgan');
const http = require('http');
const createError = require('http-errors');

const router = require('./routers');
const createSocketServer = require('./socketServer');

function buildApp() {
    const app = express();

    const server = http.createServer(app);

    const socketServer = createSocketServer(server);

    // Middlewares
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use((req, res, next) => {
        req.dependencies = { socketServer };
        next();
    })

    // Routers
    app.use('/', router);
    app.use('/user', router);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    return server;
}



module.exports = buildApp;