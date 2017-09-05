const { Component, h } = require('preact');

const Input = require('./input');

class Textarea extends Input {

  render() {
    return (
      <textarea
        name={this.props.name}
        id={this.props.name}
        onInput={e => this.onInput(e)}
        value={this.props.value}
        />
    );
  }

}

module.exports = Textarea;
