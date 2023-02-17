'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = app => {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(cookieParser());
};
