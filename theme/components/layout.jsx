const { Component, h } = require('preact');

const Sidebar = require('./partials/sidebar');
const Header = require('./partials/header');
const Footer = require('./partials/footer');
const Spinner = require('./partials/spinner');
const Alert = require('./partials/alert');

class Layout extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'CLEAR_ERROR' });
  }

  render() {
    const children = this.props.children;
    return (
      <div class="grid">
        <Header {...this.props} />
        { this.props.getTabs && (<Sidebar {...this.props} />) }
        <div class="main">
          { this.props.error && (<Alert state="error" error={this.props.error} />) }
          <div class="content">
            { !this.props.loading && children }
            { this.props.loading && (<Spinner />) }
          </div>
        </div>
        <Footer />
      </div>
    )
  }

}

module.exports = Layout;
