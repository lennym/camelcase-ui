'use strict';

require('babel-core/register')({
  presets: ['preact'],
  extensions: ['.jsx'],
  ignore: false
});

const morgan = require('morgan');
const {h} = require('preact');
const {render} = require('preact-render-to-string');
const {pick} = require('lodash');

const boilerplate = require('./boilerplate');
const App = require('../theme/components/app');
const Api = require('./api');
const ApiProxy = require('./api-proxy');
const Auth = require('./auth');


module.exports = settings => {
  const ui = boilerplate(settings);
  const api = Api(settings);

  ui.use('/', Auth(settings));

  ui.use('/api', ApiProxy(settings));

  ui.use(morgan('tiny'));

  ui.use('/dashboard', (req, res, next) => {
    api.get('/case', req.user.access_token)
      .then(cases => {
        res.locals.cases = cases;
        next();
      })
      .catch(next);
  });

  ui.use('/view/:reference', (req, res, next) => {
    api.get(`/case/${req.params.reference}`, req.user.access_token)
      .then(activecase => {
        if (!activecase) {
          return res.redirect('/dashboard');
        }
        res.locals.activecase = activecase;
        next();
      })
      .catch(next);
  });

  ui.get('/', (req, res) => res.redirect('/dashboard'));

  ui.use((req, res, next) => {
    api.get('/settings', req.user.access_token)
      .catch(next)
      .then(settings => {
        res.locals.title = settings.title;
        res.locals.schema = settings.schema;
        res.locals.states = settings.states;
        res.locals.user = pick(req.user, ['displayName', 'picture']);
        res.locals.url = req.url;
        res.render('index', {
          content: render(h(App, res.locals)),
          state: JSON.stringify(res.locals)
        });
      })
      .catch(next)

  });

  ui.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.render('error', { error: err });
  });

  return {
    listen: (port) => {
      ui.listen(port);
    }
  };

};