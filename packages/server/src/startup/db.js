'use strict';

const mongoose = require('mongoose');
const config = require('@tebox/config/server');
const { MDB_SERVER, MDB_DATABASE } = config;

module.exports = async () => {
    try {
        mongoose.set('strictQuery', true);

        mongoose.set('toJSON', {
            virtuals: true,
            versionKey: false
        });

        await mongoose.connect(
            `mongodb://${MDB_SERVER}:27017/${MDB_DATABASE}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 3000
            },
            () => { console.log('🧶 connected to db'); }
        );
    } catch(e) {
        console.log('DB CONNECTION ERROR', e);
    }
};
