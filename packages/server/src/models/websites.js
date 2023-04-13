'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    site: {
        type: String,
        required: true,
        trim: true
    },
    key: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    onlineUsers: {
        type: [String],
        default: []
    }
});

module.exports = model('Websites', schema);
