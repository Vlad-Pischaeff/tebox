const config = {
    SERVER_PORT: process.env.REACT_APP_SERVER_PORT,
    SERVER_ADDR: process.env.REACT_APP_SERVER_ADDR,
    SERVER_PROTO:
        process.env.NODE_ENV === "development"
            ? "http"
            : process.env.REACT_APP_SERVER_PROTO,
    URL: "",
    SERVER_URL: "",
    WEBSOCKET_URL: "",
    LIFETIME: "10m",

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,

    REQUEST_AUTHKEY: "Authorization",
    ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET,
    ACCESS_JWT_LIFETIME: process.env.ACCESS_JWT_LIFETIME,
    REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
    REFRESH_JWT_LIFETIME: process.env.REFRESH_JWT_LIFETIME,

    MDB_SERVER: process.env.MDB_SERVER,
    MDB_DATABASE: process.env.MDB_DATABASE,

    JWT_HEADER: {
        alg: "RS256",
        typ: "JWT",
    },
};

const ADDR = process.env.NODE_ENV === "development"
                ? 'localhost'
                : config.SERVER_ADDR;

const PORT = process.env.NODE_ENV === "development"
                ? 3000
                : config.SERVER_PORT;

config.URL = `${config.SERVER_PROTO}://${ADDR}:${PORT}`;

// for use with Nginx reverse proxy
// config.URL = `${config.SERVER_PROTO}://${ADDR}`;

config.SERVER_URL = `${config.SERVER_PROTO}://${config.SERVER_ADDR}:${config.SERVER_PORT}`;

const WS_PROTO = config.SERVER_PROTO === 'https' ? 'wss' : 'ws';

config.WEBSOCKET_URL = `${WS_PROTO}://${config.SERVER_ADDR}:${config.SERVER_PORT}/ws`;

export default config;
