const { Component, h } = require('preact');
const { Link } = require('preact-router/match');

const Layout = require('../layout');

class Main extends Component {

  render() {
    return (
      <Layout {...this.props}>
        <div class="dashboard-message">
          <h1>Page not found</h1>
          <p><Link href="/dashboard" className="button button-large">Return to dashboard</Link></p>
        </div>
      </Layout>
    );
  }

}

module.exports = Main;
