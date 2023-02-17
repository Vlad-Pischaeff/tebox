'use strict';

const express = require('express');
const todosRouter = express.Router();
const controller = require('#s/controllers/todosController')();
const auth = require('#s/middleware/auth');

todosRouter.route('/todos')
    .get(auth, controller.getTodos)
    .post(auth, controller.addTodo);

todosRouter.route('/todos/:id')
    .patch(auth, controller.updateTodo)
    .get(auth, controller.getTodo)
    .delete(auth, controller.deleteTodo);

module.exports = todosRouter;
