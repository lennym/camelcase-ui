const { h } = require('preact');

module.exports = props => (
  <div class={`alert ${props.state}`}>
    <p>{props.error.message}</p>
  </div>
);
