'use strict';

const express = require('express');
const additionalRouter = express.Router();
const controller = require('#s/controllers/additionalController')();
const auth = require('#s/middleware/auth');

additionalRouter.route('/extra/:id')
    .get(auth, controller.getOnlineUsersNumber)

additionalRouter.route('/mngsites/:id')
    .get(auth, controller.getMonitoredWebsites)

module.exports = additionalRouter;
