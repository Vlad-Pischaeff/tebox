'use strict';

const express = require('express');
const answersRouter = express.Router();
const controller = require('#s/controllers/answersController')();
const auth = require('#s/middleware/auth');

answersRouter.route('/answers')
    .get(auth, controller.getAnswers)
    .post(auth, controller.addAnswer);

answersRouter.route('/answers/:id')
    .patch(auth, controller.updateAnswer)
    .get(auth, controller.getAnswer)
    .delete(auth, controller.deleteAnswer);

module.exports = answersRouter;
