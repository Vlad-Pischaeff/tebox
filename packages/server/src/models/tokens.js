'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    refreshToken: {
        type: String,
        required: true
    }
});

module.exports = model('Tokens', schema);
