'use strict';

const mongoose = require('mongoose');
const config = require('@tebox/config/server');
const { MDB_SERVER, MDB_DATABASE } = config;
const { HELPER } = require('#s/services/websocketService');

const uri = `mongodb://${MDB_SERVER}:27017/${MDB_DATABASE}`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 3000,
    serverSelectionTimeoutMS: 5000,
    family: 4
};

module.exports = async () => {
    mongoose.set('strictQuery', true);

    mongoose.set('toJSON', {
        virtuals: true,
        versionKey: false
    });

    await mongoose.connect(uri,options)
        .then(
            () => {
                HELPER.runWebSitesHashReduce();
                console.log(`🧶 connected to -> ${uri}`);
            },
            err => {
                console.log('❌ DB CONNECTION ERROR', err);
            }
        );
};
