const url = 'localhost:5000';
const { createProxyMiddleware } = require('http-proxy-middleware');

const httpProxy = createProxyMiddleware({
    target: `http://${url}`, 
    changeOrigin: true,
});

module.exports = function(app) {
    app.use('/api', httpProxy);
};