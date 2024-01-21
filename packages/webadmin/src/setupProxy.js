const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('@tebox/config/server');

const ADDR = config.SERVER_ADDR;
const PROTO = config.SERVER_PROTO;
const PORT = config.SERVER_PORT || 5001;
const PROXY = `${PROTO}://${ADDR}:${PORT}`;

const httpProxy = createProxyMiddleware({
    target: PROXY,
    changeOrigin: true,
});

module.exports = function(app) {
    app.use('/api', httpProxy);
};
