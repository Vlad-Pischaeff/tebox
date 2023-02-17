'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true,
        default: Date.now()
    },
    type: {
        type: String,
        required: true,
        default: 'answer'
    }
});

module.exports = model('Answers', schema);
