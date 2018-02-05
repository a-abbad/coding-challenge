'use strict';

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const environment = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, `config/${environment}`));

/* get routes */
const b2cRoutes = require('./routes/b2c');


const app = express();

const allowedDomains = (environment === 'production') ? config.ALLOWED_DOMAINS : '*';

/* prepare database credentials */
let userCredentials = null;
if(environment === 'production') {
    userCredentials = `${config.DB_USER}:${config.DB_PASSWORD}@`;
} else {
    userCredentials = '';
}

/* connect to mongodb database */
const dbURI = `mongodb://${userCredentials}${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
require(path.join(__dirname, 'models'))(mongoose, dbURI, config.DEBUG);

/* configure global constants */
app.set('environment', environment);
app.set('secret', config.JWT_SECRET);
app.set('DEBUG', config.DEBUG);

/* set up middlewares */
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(expressValidator());
app.use(allowCrossDomain(allowedDomains));
app.use(jsonHttpErrorHandler);
app.disable('etag');

/* set up APIs */
app.use('/api/b2c', b2cRoutes);

module.exports = app;

function allowCrossDomain(domain) {
    return function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, OPTIONS, PATCH');
        res.header('Access-Control-Allow-Headers', 'Cache-Control, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, token');

        if(req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    };
}

function jsonHttpErrorHandler(err, req, res, next) {
    if(req.app.get('DEBUG')) {
        console.error(err);
    }

    switch(err.status) {
        case 400:
        case 422:
            res.setHeader('Content-Type', 'application/json');
            res.status(200)
                .json({
                    title: 'request invalid',
                    success: 0
                });
            break;
        case 403:
            res.status(err.status)
                .json({
                    title: 'access denied',
                    message: err.message,
                    success: 0,
                    error: err.details
                });
            break;
        case 404:
            res.status(err.status)
                .json({
                    title: 'resource not found',
                    message: err.message,
                    success: 0,
                    error: err.details
                });
            break;
        case 500:
            res.status(err.status || 500)
                .json({
                    title: 'internal error',
                    success: 0
                });
            break;
        default:
            err.success = 0;
            res.status(err.status || 500)
                .json(err);
            break;
    }
}
