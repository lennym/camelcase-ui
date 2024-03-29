const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const express = require('express');
const router = express.Router();

module.exports = settings => {

  const CALLBACK_URL = '/callback';

  const opts = {
    domain: settings.auth.domain,
    clientID: settings.auth.clientId,
    clientSecret: settings.auth.clientSecret,
    callbackURL: `${settings.host}${CALLBACK_URL}`
  };

  // Configure Passport to use Auth0
  const strategy = new Auth0Strategy(opts, (accessToken, refreshToken, extraParams, profile, done) => {
    profile.access_token = accessToken;
    profile.isAdmin = profile._json['http://camelcase.io/isAdmin'];
    profile.isAuthorised = profile._json['http://camelcase.io/isAuthorised'];
    profile.id = profile._json.sub;
    return done(null, profile);
  });

  passport.use(strategy);

  // This can be used to keep a smaller payload
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  router.use(passport.initialize());
  router.use(passport.session());

  router.get('/', (req, res) => {
    res.render('login');
  });

  router.get(
    '/login',
    passport.authenticate('auth0', {
      clientID: settings.auth.clientId,
      domain: settings.auth.domain,
      redirectUri: opts.callbackURL,
      audience: settings.auth.audience,
      responseType: 'code',
      scope: 'openid profile'
    }),
    function(req, res) {
      res.redirect('/dashboard');
    }
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.get(
    CALLBACK_URL,
    passport.authenticate('auth0', {
      failureRedirect: '/'
    }),
    function(req, res) {
      res.redirect(req.session.returnTo || '/dashboard');
    }
  );

  router.use((req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.accepts(['html', 'json']) === 'json') {
        res.status(401);
        return next(new Error('Session expired'));
      }
      return res.redirect('/');
    }
    next();
  });

  router.use((req, res, next) => {
    if (req.user.isAdmin || req.user.isAuthorised) {
      return next();
    }
    res.status(403).render('unauthorised');
  });

  return router;

}
