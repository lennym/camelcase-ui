const { Component, h } = require('preact');
const moment = require('moment');

class Timestamp extends Component {

  render() {
    const timestamp = moment(this.props.timestamp);
    return (
      <p class="timestamp" title={timestamp.format('Do MMMM YYYY, HH:mma')}>{this.props.user.type}: {this.props.user.name} - {timestamp.fromNow()}</p>
    );
  }

}

module.exports = Timestamp;
