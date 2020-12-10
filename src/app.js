const express = require('express');
const morgan = require('morgan');
const http = require('http');
const createError = require('http-errors');

const indexRouter = require('./routers/index');
const userRouter = require('./routers/user');
const mapRouter = require('./routers/map');
const adminRouter = require('./routers/admin');
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
    app.use('/', indexRouter);
    app.use('/user', userRouter);
    app.use('/map', mapRouter);
    app.use('/admin', adminRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    return server;
}



module.exports = buildApp;