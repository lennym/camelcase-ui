const proxy = require('express-http-proxy');

module.exports = settings => proxy(settings.api, {
  limit: '20mb',
  proxyReqOptDecorator: (opts, req) => {
    opts.headers.Authorization = `Bearer ${req.user.access_token}`;
    return opts;
  }
});
