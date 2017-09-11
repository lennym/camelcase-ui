'use strict';

const path = require('path');
const express = require('express');
const staticserver = require('serve-static');
const consolidate = require('consolidate');

const session = require('./session');

module.exports = settings => {
  const app = express();

  app.set('views', path.resolve(__dirname, '../views'));
  app.engine('html', consolidate.mustache);
  app.set('view engine', 'html');

  if (settings.assets) {
    console.log('Mounting static server on', settings.assets);
    app.use('/public', staticserver(settings.assets));
  }
  app.use('/public', staticserver(path.resolve(__dirname, '../public')));
  app.get('/favicon.ico', (req, res) => res.sendFile(path.resolve(__dirname, '../public/favicon.ico')));

  app.use(session(settings.session));

  return app;
}