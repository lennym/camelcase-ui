const { Component, h } = require('preact');

const Input = require('./input');

class Select extends Input {

  render() {
    return (
      <select
        name={this.props.name}
        id={this.props.name}
        onInput={e => this.onInput(e)}
        >
          <option value="" selected={!this.props.value && 'selected'}>Select...</option>
        {
          this.props.enum.map(opt => (
            <option value={opt} selected={opt===this.props.value && 'selected'}>{opt}</option>
          ))
        }
      </select>
    );
  }

}

module.exports = Select;
