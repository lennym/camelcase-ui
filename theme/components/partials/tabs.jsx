const { Component, h } = require('preact');
const { Link } = require('preact-router/match');

const TabUrl = require('../mixins/tab-url');

class Tabs extends Component {

  render() {
    const tabs = this.props.getTabs() || [];
    return (
      <ul class="tabs">
      {
        tabs && tabs.map(tab => {
          const link = this.buildUrl(tab.key);
          return <li class={tab.key === this.props.tab && 'selected'}>
            <Link href={link}>{tab.label}</Link>
          </li>
        })
      }
      </ul>
    )
  }

}

module.exports = TabUrl(Tabs);
