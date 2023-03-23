const config = {
    SERVER_PORT:            process.env.REACT_APP_SERVER_PORT,
    SERVER_ADDR:            process.env.REACT_APP_SERVER_ADDR,
    SERVER_PROTO:           process.env.REACT_APP_SERVER_PROTO,
    WEBSOCKET_PROTO:        '',
    WEBSOCKET_ADDR:         '',
    LIFETIME:               '10m',

    SMTP_HOST:              process.env.SMTP_HOST,
    SMTP_PORT:              process.env.SMTP_PORT,
    SMTP_USER:              process.env.SMTP_USER,
    SMTP_PASS:              process.env.SMTP_PASS,

    REQUEST_AUTHKEY:        'Authorization',
    ACCESS_JWT_SECRET:      process.env.ACCESS_JWT_SECRET,
    ACCESS_JWT_LIFETIME:    process.env.ACCESS_JWT_LIFETIME,
    REFRESH_JWT_SECRET:     process.env.REFRESH_JWT_SECRET,
    REFRESH_JWT_LIFETIME:   process.env.REFRESH_JWT_LIFETIME,

    MDB_SERVER:             process.env.MDB_SERVER,
    MDB_DATABASE:           process.env.MDB_DATABASE,

    JWT_HEADER:             {
                                alg: 'RS256',
                                typ: 'JWT'
                            },
};

config.WEBSOCKET_PROTO = config.SERVER_PROTO === 'https' ? 'wss' : 'ws';

const { WEBSOCKET_PROTO, SERVER_ADDR, SERVER_PORT } = config;

config.WEBSOCKET_ADDR = `${WEBSOCKET_PROTO}://${SERVER_ADDR}:${SERVER_PORT}/ws`;

export default config;
