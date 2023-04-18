'use strict';

const config = require('@tebox/config/server');
let privateKey, certificate, credentials, server;

const fs = require('fs');
const express = require('express');
const app = express();

const isHTTPs = config.SERVER_PROTO === "http" ? false : true;

if (isHTTPs) {
    privateKey = fs.readFileSync('./keys/privkey.pem', { encoding: 'utf8', flag: 'r' });
    certificate = fs.readFileSync('./keys/cert.pem', { encoding: 'utf8', flag: 'r' });
    credentials = { key: privateKey, cert: certificate };
    server = require('https').createServer(credentials, app);
} else {
    server = require('http').createServer(app);
}

require('#s/startup/db')();
require('#s/startup/cors')(app);
require('#s/startup/bodyParser')(app);
require('#s/startup/routes')(app);
require('#s/startup/server')(server);
require('#s/startup/ws')(server);
