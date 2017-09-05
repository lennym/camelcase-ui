const { Component, h } = require('preact');

class Input extends Component {

  componentDidMount() {
    this.props.onInput({
      name: this.props.name,
      value: this.props.value || ''
    });
  }

  onInput(e) {
    this.props.onInput({
      name: this.props.name,
      value: e.target.value || ''
    });
  }

  render() {
    return (
      <input
        type={this.props.inputType}
        name={this.props.name}
        id={this.props.name}
        value={this.props.value}
        onInput={(e) => this.onInput(e)}
        />
    );
  }

}

module.exports = Input;
