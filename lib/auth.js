const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const express = require('express');
const {ensureLoggedIn} = require('connect-ensure-login');
const router = express.Router();

module.exports = settings => {

  const opts = {
    domain: settings.auth.domain,
    clientID: settings.auth.clientId,
    clientSecret: settings.auth.clientSecret,
    callbackURL: `${settings.host}/callback`;
  };

  // Configure Passport to use Auth0
  const strategy = new Auth0Strategy(opts, (accessToken, refreshToken, extraParams, profile, done) => {
    profile.access_token = accessToken;
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
      redirectUri: CALLBACK_URL,
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
    '/callback',
    passport.authenticate('auth0', {
      failureRedirect: '/'
    }),
    function(req, res) {
      res.redirect(req.session.returnTo || '/dashboard');
    }
  );

  router.use(ensureLoggedIn('/'));

  return router;

}
