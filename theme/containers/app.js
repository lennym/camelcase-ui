const { connect } = require('preact-redux');

const App = require('../components/app');

module.exports = connect(state => state)(App);
