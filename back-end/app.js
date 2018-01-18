'use strict';

const mongoose = ('mongoose');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

/* Controllers */
const userController = require('./controllers/b2c/user-controller.js');

const environment = process.env.NODE_ENV || 'development';

module.exports = environment => {
    const app = express();
    const config = require(path.join(__dirname, `config/${environment}`));

    /* prepare database credentials */
    let userCredentials = null;
    if(environment === 'production') {
        userCredentials = `${config.DB_USER}:${config.DB_PASSWORD}@`;
    } else {
        userCredentials = '';
    }

    /* connect to the database */
    // const dbURI = `mongodb://${userCredentials}${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
    // require(path.join(__dirname, 'models'))(mongoose, dbURI, config.DEBUG);

    /* configuration of application constants */
    app.set('environment', environment);
    app.set('secret', config.JWT_SECRET);
    app.set('DEBUG', config.DEBUG);

    app.use(logger('dev'));
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

    app.post('/api/test', userController.testAPI);
    app.get('/api/test', userController.testAPI);
    app.patch('/api/test', userController.testAPI);
    app.put('/api/test', userController.testAPI);

    app.use(jsonHttpErrorHandler);

    return app;
};

function jsonHttpErrorHandler(err, req, res, next) {
    if(req.app.get('DEBUG')) {
        console.error(err);
    }

    switch(err.status) {
        case 400:
        case 422:
            res.status(err.status)
                .json({
                    message: 'request invalid',
                    success: 0,
                    error: err.errors
                });
            break;
        case 403:
            res.status(err.status)
                .json({
                    message: 'access denied',
                    success: 0,
                    error: err.errors
                });
            break;
        case 404:
            res.status(err.status)
                .json({
                    message: 'resource not found',
                    success: 0,
                    error: err.errors
                });
            break;
        case 500:
        default:
            res.status(err.status || 500)
                .json({
                    message: 'internal error',
                    success: 0
                });
            break;
    }
}
