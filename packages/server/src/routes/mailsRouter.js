'use strict';

const express = require('express');
const mailsRouter = express.Router();
const controller = require('#s/controllers/mailsController')();
const auth = require('#s/middleware/auth');

mailsRouter.route('/mails')
    .get(auth, controller.getMails)
    .put(auth, controller.addMail);

mailsRouter.route('/mails/:id')
    .patch(auth, controller.updateMail)
    .get(auth, controller.getMail)
    .delete(auth, controller.deleteMail);

module.exports = mailsRouter;
