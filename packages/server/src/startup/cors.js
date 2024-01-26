'use strict';

const cors = require('cors');
const config = require("@tebox/config/server");
const {
    REACT_APP_SERVER_PROTO,
    REACT_APP_SERVER_ADDR,
    REACT_APP_SERVER_PORT,
    REACT_APP_NGINX_REVERSE_PROXY,
} = config;

const corsOptions = {
    origin: [
        `${REACT_APP_SERVER_PROTO}://${REACT_APP_SERVER_ADDR}:${REACT_APP_SERVER_PORT}`,
        `${REACT_APP_SERVER_PROTO}://${REACT_APP_SERVER_ADDR}`,
    ],
    credentials: true,
};

module.exports = (app) => {
    if (REACT_APP_NGINX_REVERSE_PROXY === "yes") {
        app.use(cors(corsOptions));
    } else {
        app.use(cors());
    }
};
