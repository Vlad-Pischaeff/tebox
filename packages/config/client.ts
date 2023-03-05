const config = {
    SERVER_PORT:        5000,
    SERVER_ADDR:        'localhost',
    WS_PROTO:           window.location.protocol === 'https:'
                            ? 'wss:'
                            : 'ws:',
    WEBSOCKET_ADDR:     '',
    HOST:               'http://localhost:3000',
    LIFETIME:           '10m',

    SMTP_HOST:          process.env.SMTP_HOST,
    SMTP_PORT:          process.env.SMTP_PORT,
    SMTP_USER:          process.env.SMTP_USER,
    SMTP_PASS:          process.env.SMTP_PASS,

    REQUEST_AUTHKEY:        'Authorization',
    ACCESS_JWT_SECRET:      process.env.ACCESS_JWT_SECRET,
    ACCESS_JWT_LIFETIME:    process.env.ACCESS_JWT_LIFETIME,
    REFRESH_JWT_SECRET:     process.env.REFRESH_JWT_SECRET,
    REFRESH_JWT_LIFETIME:   process.env.REFRESH_JWT_LIFETIME,

    JWT_HEADER: {
        alg: 'RS256',
        typ: 'JWT'
    },

    MDB_SERVER:         process.env.MDB_SERVER,
    MDB_DATABASE:       process.env.MDB_DATABASE,
};

const { WS_PROTO, SERVER_ADDR, SERVER_PORT } = config;

config.WEBSOCKET_ADDR = `${WS_PROTO}//${SERVER_ADDR}:${SERVER_PORT}/ws`;

export default config;
