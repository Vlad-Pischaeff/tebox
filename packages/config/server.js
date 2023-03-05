const { env } = process;

module.exports = {
    SERVER_PORT:        5000,
    SERVER_ADDR:        'localhost',
    HOST:               'http://localhost:3000',
    LIFETIME:           '10m',

    SMTP_HOST:          env.SMTP_HOST,
    SMTP_PORT:          env.SMTP_PORT,
    SMTP_USER:          env.SMTP_USER,
    SMTP_PASS:          env.SMTP_PASS,

    REQUEST_AUTHKEY:        'Authorization',
    ACCESS_JWT_SECRET:      env.ACCESS_JWT_SECRET,
    ACCESS_JWT_LIFETIME:    env.ACCESS_JWT_LIFETIME,
    REFRESH_JWT_SECRET:     env.REFRESH_JWT_SECRET,
    REFRESH_JWT_LIFETIME:   env.REFRESH_JWT_LIFETIME,

    JWT_HEADER: {
        alg: 'RS256',
        typ: 'JWT'
    },

    MDB_SERVER:         env.MDB_SERVER,
    MDB_DATABASE:       env.MDB_DATABASE,
};
