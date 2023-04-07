'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
    to: {           // ..site's key
        type: String
    },
    recipients: {
        type: [String],
        default: []
    },
    from: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
});

module.exports = model('Mails', schema);
