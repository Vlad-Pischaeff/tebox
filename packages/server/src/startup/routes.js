'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');
const ROUTER = require('#s/routes/index');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = app => {
    app.use('/upload', express.static(path.join(__dirname, '..', '/public/upload')));
    app.use('/fonts', express.static(path.join(__dirname, '..', '/public/fonts' )));
    app.use('/test', express.static(path.join(__dirname, '..', '/public/test' )));
    app.use('/images', express.static(path.join(__dirname, '..', '/public/images' )));

    // tebutton
    app.use('/dist', cors(), express.static(path.join(__dirname, '../../..', 'tebutton', 'dist', 'tebutton' )));

    // iframe Web-panel
    app.use('/client', cors(), express.static(path.join(__dirname, '../../..', 'webpanel', 'build' )));
    app.use('/static', cors(), express.static(path.join(__dirname, '../../..', 'webpanel', 'build', 'static' )));
    app.get('/client', cors(), (req, res) => {
        console.log('✅ iFrame client req...\n',
                    '\tto ...\t', req.headers.host,
                    '\n\tfrom ...\t', req.headers.referer, req.url, req.originalUrl);
        res.sendFile(path.resolve(__dirname, '../../..', 'webpanel', 'build', 'index.html'));
    });

    app.use('/api', ROUTER.usersRouter);
    app.use('/api', ROUTER.todosRouter);
    app.use('/api', ROUTER.notesRouter);
    app.use('/api', ROUTER.mailsRouter);
    app.use('/api', ROUTER.answersRouter);
    app.use('/api', ROUTER.websitesRouter);
    app.use('/api', ROUTER.uploadRouter);
    app.use('/api', ROUTER.additionalRouter);

    if (isProduction) {
        app.use('/', express.static(path.join(__dirname, '../../..', 'webadmin', 'build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../..', 'webadmin', 'build', 'index.html'));
        });
    }
};
