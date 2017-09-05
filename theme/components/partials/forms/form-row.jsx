const { Component, h } = require('preact');

const Textarea = require('./textarea');
const Input = require('./input');
const Select = require('./select');
const Upload = require('./upload');

class FormRow extends Component {

  renderInput() {
    switch (this.props.inputType) {
      case 'textarea':
        return <Textarea {...this.props} />;
      case 'select':
        return <Select {...this.props} />;
      case 'upload':
        return <Upload {...this.props} />;
      default:
        return <Input {...this.props} />;
    }
  }

  render() {
    const className = ['form-row'];
    if (this.props.error) {
      className.push('error');
    }
    return (
      <div class={className.join(' ')}>
        { this.props.label && (<label for={this.props.name}>{this.props.label}</label>) }
        { this.props.error && (<p class="error-message">{this.props.error.message}</p>) }
        { this.renderInput() }
      </div>
    );
  }

}

module.exports = FormRow;
