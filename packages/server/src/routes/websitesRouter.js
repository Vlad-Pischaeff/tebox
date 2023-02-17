'use strict';

const express = require('express');
const websitesRouter = express.Router();
const controller = require('#s/controllers/websitesController')();
const auth = require('#s/middleware/auth');

websitesRouter.route('/websites')
    .get(auth, controller.getWebsites)
    .post(auth, controller.addWebsite);

websitesRouter.route('/websites/:id')
    .patch(auth, controller.updateWebsite)
    .get(auth, controller.getWebsite)
    .delete(auth, controller.deleteWebsite);

module.exports = websitesRouter;
