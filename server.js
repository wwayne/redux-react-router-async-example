var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

// https://github.com/glenjamin/webpack-hot-middleware
// so that hot loader can work on a same server that started by express
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(3001, 'localhost', function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at http://localhost:3001');
});