'use strict';

var express = require('express');
var pug = require('pug');
var images = require('./controllers/imagesearch.js');

var app = module.exports = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/search/:query', images.search);
app.get('/latest', images.latest);

app.listen(process.env.PORT || 8080, function () {
  console.log('App listening at ', process.env.PORT);
});