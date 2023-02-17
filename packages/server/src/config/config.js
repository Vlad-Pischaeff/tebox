'use strict';

const config = {};

config.HOST = 'http://localhost:3000';
config.LIFETIME = '10m';

config.SMTP_HOST = process.env.SMTP_HOST;
config.SMTP_PORT = process.env.SMTP_PORT;
config.SMTP_USER = process.env.SMTP_USER;
config.SMTP_PASS = process.env.SMTP_PASS;

config.REQUEST_AUTHKEY = 'Authorization';
config.ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
config.ACCESS_JWT_LIFETIME = process.env.ACCESS_JWT_LIFETIME;
config.REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;
config.REFRESH_JWT_LIFETIME = process.env.REFRESH_JWT_LIFETIME;
config.JWT_HEADER = {
    alg: 'RS256',
    typ: 'JWT'
};

config.MDB_SERVER = process.env.MDB_SERVER;
config.MDB_DATABASE = process.env.MDB_DATABASE;

module.exports = config;
