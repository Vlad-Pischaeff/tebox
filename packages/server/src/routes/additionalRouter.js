'use strict';

const express = require('express');
const additionalRouter = express.Router();
const controller = require('#s/controllers/additionalController')();
const auth = require('#s/middleware/auth');

// additionalRouter.route('/usrnumbers')
//     .get(auth, controller.getOnlineUsersNumber)

additionalRouter.route('/mngsites')
    .get(auth, controller.getMonitoredWebsites)

module.exports = additionalRouter;
