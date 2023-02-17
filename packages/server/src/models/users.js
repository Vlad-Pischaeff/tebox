'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        unique: true,
        required: true,
        default: function() {
            let n = this.name
                        .replace(/[^\w\d ]/gi, '')  // удаляем спецсимволы
                        .replace(/\s+/g, '_')       // заменяем пробелы
                        .toLowerCase();             // переводим в нижний регистр
            return '@' + n;
        }
    },
    alias: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: Date.now()
    },
    image: {
        type: String,
        required: false,
        default: ''
    },
    team: {
        type: [{
            member: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
                required: false,
                sparse: true
            },
            sites: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Websites',
                    required: false,
                    sparse: true
                }
            ]}
        ],
        required: false,
        default: []
    },
    greeting: {
        type: String,
        required: false,
        default: 'Welcome to our website...'
    },
});

module.exports = model('Users', schema);
