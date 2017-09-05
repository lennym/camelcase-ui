const { Component, h } = require('preact');

const Layout = require('../layout');

class Search extends Component {

  render() {
    return (
      <Layout {...this.props}>
        <div class="dashboard-message">
          <h1>Search</h1>
        </div>
      </Layout>
    );
  }

}

module.exports = Search;
