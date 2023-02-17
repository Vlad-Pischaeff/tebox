'use strict';

const express = require('express');
const controller = require('#s/controllers/uploadController')();
const uploadRouter = express.Router();

/** old version
const routes = () => {

    uploadRouter.route('/upload')
        .post(controller.upload);

    return uploadRouter;
};

module.exports = routes;
*/

uploadRouter.route('/upload')
    .post(controller.upload);

module.exports = uploadRouter;
