const { Component, h } = require('preact');

class CommandBar extends Component {

  render() {
    return (
      <div class="command-bar">
        <p class="label">{this.props.title}</p>
        <div class="commands">
          {this.props.children}
        </div>
      </div>
    );
  }

}

module.exports = CommandBar;
