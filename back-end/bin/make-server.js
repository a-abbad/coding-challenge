'use strict';

const SECURE_SSL = process.env.SECURE_SSL || false;

module.exports = function (app) {
    let server = null;

    if (SECURE_SSL) {
        const path = require('path');
        const https = require('https');
        const fs = require('fs');

        const serverOptions = {
            key: fs.readFileSync(path.join(__dirname, '../config', 'ca.key')),
            cert: fs.readFileSync(path.join(__dirname, '../config', 'ca.crt')),
            passphrase: fs.readFileSync(path.join(__dirname, '../config', 'passphrase')).toString()
        };

        server = https.createServer(serverOptions, app);
    } else {
        const http = require('http');
        server = http.createServer(app);
    }

    return server;
};