const { Component, h } = require('preact');

const Layout = require('../layout');

class Settings extends Component {

  render() {
    return (
      <Layout {...this.props}>
        <div class="dashboard-message">
          <h1>Settings</h1>
        </div>
      </Layout>
    );
  }

}

module.exports = Settings;
