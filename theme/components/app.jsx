const { Component, h } = require('preact');
const { connect } = require('preact-redux');

const { Router } = require('preact-router');

const NotFound = require('./pages/not-found');
const Case = require('./pages/case');
const Dashboard = require('./pages/dashboard');
const Create = require('./pages/create-case');
const Search = require('./pages/search');
const Settings = require('./pages/settings');

class App extends Component {

  render() {
    const cases = this.props.cases || [];
    return (
      <Router url={this.props.url}>
        <Dashboard path="/dashboard" {...this.props}/>
        <Case path="/view/:reference/:tab" {...this.props}/>
        <Create path="/create-case" {...this.props}/>
        <Search path="/search" {...this.props}/>
        <Settings path="/settings" {...this.props}/>
      </Router>
    );
  }
}

module.exports = App;
