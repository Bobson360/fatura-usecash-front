const proxy = [
  {
    context: '/api',
    target: 'http://localhost:8080',
    pathRewrite: {'^/api' : ''},
    secure: true,
    loglevel: 'debug',
    pathRewrite: { '^/api': '' }
  }
];
module.exports = proxy;
