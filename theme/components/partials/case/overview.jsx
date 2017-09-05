const { Component, h } = require('preact');

const Comment = require('../comment');
const Details = require('./details');
const ControlPanel = require('./control-panel');
const Comments = require('./comments');

class Overview extends Component {

  render() {

    const activecase = this.props.activecase || {};

    return (
      <div>
        <ControlPanel {...this.props} />
      </div>
    )
  }

}

module.exports = Overview;
