const { combineReducers } = require('redux');

const cases = require('./cases');
const activecase = require('./activecase');
const caseview = require('./case-view');
const caselist = require('./case-list');
const form = require('./form');
const loading = require('./fetch');
const error = require('./error');
const tabs = require('./tabs');
const dashboard = require('./dashboard');

module.exports = combineReducers({
  cases,
  activecase,
  caseview,
  caselist,
  form,
  loading,
  error,
  tabs,
  dashboard,
  title: state => state || '',
  url: state => null,
  schema: state => state || {},
  states: state => state || {},
  user: state => state || {}
});