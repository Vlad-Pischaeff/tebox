'use strict';

const express = require('express');

const app = express();
const server = require('http').createServer(app);

require('#s/startup/env');
require('#s/startup/db')();
require('#s/startup/cors')(app);
require('#s/startup/bodyParser')(app);
require('#s/startup/routes')(app);
require('#s/startup/server')(server);
require('#s/startup/ws')(server);
