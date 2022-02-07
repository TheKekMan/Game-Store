const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/gamestore/api',
    createProxyMiddleware({
      target: 'http://localhost:5500',
      changeOrigin: true,
    })
  );
};