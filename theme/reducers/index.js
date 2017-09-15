const { combineReducers } = require('redux');

const activecase = require('./activecase');
const caseview = require('./case-view');
const form = require('./form');
const loading = require('./fetch');
const error = require('./error');
const tabs = require('./tabs');
const dashboard = require('./dashboard');
const search = require('./search');
const results = require('./search-results');
const savedSearch = require('./saved-search');

module.exports = combineReducers({
  activecase,
  caseview,
  form,
  loading,
  error,
  tabs,
  dashboard,
  search,
  results,
  savedSearch,
  title: state => state || '',
  url: state => null,
  schema: state => state || {},
  states: state => state || {},
  user: state => state || {}
});