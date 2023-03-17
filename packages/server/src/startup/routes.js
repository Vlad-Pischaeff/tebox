'use strict';

const express = require('express');
const path = require('path');
const ROUTER = require('#s/routes/index');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = app => {
    app.use('/upload', express.static(path.join(__dirname, '..', '/public/upload')));
    app.use('/fonts', express.static(path.join(__dirname, '..', '/public/fonts' )));

    // iframe Web-panel
    app.use('/client', express.static(path.join(__dirname, '../../..', 'webpanel', 'build' )));
    app.use('/static', express.static(path.join(__dirname, '../../..', 'webpanel', 'build', 'static' )));
    app.get('/client', (req, res) => {
        console.log('✅ iFrame client req...\n',
                    '\tto ...\t', req.headers.host,
                    '\n\tfrom ...\t', req.headers.referer, req.url, req.originalUrl);
        res.sendFile(path.resolve(__dirname, '../../..', 'webpanel', 'build', 'index.html'));
    })

    app.use('/api', ROUTER.usersRouter);
    app.use('/api', ROUTER.todosRouter);
    app.use('/api', ROUTER.notesRouter);
    app.use('/api', ROUTER.answersRouter);
    app.use('/api', ROUTER.websitesRouter);
    app.use('/api', ROUTER.uploadRouter);

    if (isProduction) {
        app.use('/', express.static(path.join(__dirname, '../../..', 'dashboard', 'build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../..', 'dashboard', 'build', 'index.html'));
        });
    }
};
