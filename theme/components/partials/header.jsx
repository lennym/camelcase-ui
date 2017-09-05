const { Component, h } = require('preact');
const { Link } = require('preact-router/match');

class Header extends Component {

  render() {
    return (
      <header>
        <h1><a href="/dashboard">{this.props.title}</a></h1>
        <ul class="menu">
          <li><Link activeClassName="selected" href="/dashboard"><span>Dashboard</span></Link></li>
          <li><Link activeClassName="selected" href="/search"><span>Search</span></Link></li>
          <li><Link activeClassName="selected" href="/settings"><span>Settings</span></Link></li>
        </ul>
        <div class="user-profile">
          <p>
            <img class="avatar" src={this.props.user.picture} />
            {this.props.user.displayName}
            <a href="/logout">Log out<span class="icon"/></a>
          </p>
        </div>
      </header>
    );
  }

}

module.exports = Header;
