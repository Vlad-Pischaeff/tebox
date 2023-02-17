'use strict';

const express = require('express');
const notesRouter = express.Router();
const controller = require('#s/controllers/notesController')();
const auth = require('#s/middleware/auth');

notesRouter.route('/notes')
    .get(auth, controller.getNotes)
    .post(auth, controller.addNote);

notesRouter.route('/notes/:id')
    .patch(auth, controller.updateNote)
    .get(auth, controller.getNote)
    .delete(auth, controller.deleteNote);

module.exports = notesRouter;
