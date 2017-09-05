const { Component, h } = require('preact');
const { Link } = require('preact-router/match');

const TabUrl = require('../mixins/tab-url');

class Sidebar extends Component {

  render() {
    const tabs = this.props.getTabs() || [];
    return <div class="sidebar">
      <ul>
      {
        tabs && tabs.map(tab => {
          const link = this.buildUrl(tab.key);
          return <li class={tab.key === this.props.tab && 'selected'}>
            <Link href={link}>{tab.label}</Link>
          </li>
        })
      }
      </ul>
    </div>;
  }

}

module.exports = TabUrl(Sidebar);
