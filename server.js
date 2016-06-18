'use strict';

var config = require('./webpack.config'),
    express = require('express'),
    historyApiFallback = require('connect-history-api-fallback'),
    path = require('path'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

var app = express(),
    compiler = webpack(config),
    port = process.env.PORT || 3000,
    staticDir = path.join(__dirname, 'dist'),
    staticIndex = path.join(staticDir, 'index.html');

app.use(historyApiFallback({
  verbose: false,
}));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

app.use(function(req, res) {
  res.sendFile(staticIndex);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log('Listening on port ' + port);
  }
});
