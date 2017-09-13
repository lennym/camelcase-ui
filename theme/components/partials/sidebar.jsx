const { Component, h } = require('preact');

class Sidebar extends Component {

  render() {
    return <div class="sidebar">
      { this.props.getSidebar() }
    </div>;
  }

}

module.exports = Sidebar;
