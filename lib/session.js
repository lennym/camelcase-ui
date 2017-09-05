'use strict';

const redis = require('redis');
const session = require('express-session');
const connectRedis = require('connect-redis');
const cookieParser = require('cookie-parser');
const Router = require('express').Router;

module.exports = settings => {

  settings = Object.assign({
    ttl: 3600,
    secure: false,
    name: 'camelcase',
    host: 'localhost'
  }, settings);

  const cookies = cookieParser(settings.secret, {
    path: '/',
    httpOnly: true,
    secure: settings.secure
  });

  const RedisStore = connectRedis(session);
  const client = redis.createClient({
    host: settings.host,
    port: 6379
  });

  client.on('connecting', function redisConnecting() {
    console.log('Connecting to redis');
  });

  client.on('connect', function redisConnected() {
    console.log('Connected to redis');
  });

  client.on('reconnecting', function redisReconnecting() {
    console.log('Reconnecting to redis');
  });

  client.on('error', function clientErrorHandler(e) {
    console.error(e);
  });

  const store = new RedisStore({
    client: client,
    ttl: settings.ttl,
    secret: settings.secret
  });

  const opts = {
    store,
    name: settings.name,
    cookie: {
      secure: settings.secure
    },
    secret: settings.secret,
    saveUninitialized: true,
    resave: true,
  };

  const router = Router();
  router.use(cookies);
  router.use(session(opts));
  return router;
};