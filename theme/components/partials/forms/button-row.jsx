const { Component, h } = require('preact');

class ButtonRow extends Component {

  render() {
    return (
      <div class="form-row button-row">
        { this.props.children }
        { this.props.cancel && (
          <input
            type="button"
            class="button button-clear"
            value={this.props.cancel}
            onClick={e => this.props.onCancel(e)}
            disabled={this.props.disabled}
            />
          ) }
        { this.props.submit && (
          <input
            type="submit"
            class="button"
            value={this.props.submit}
            disabled={this.props.disabled}
            />
          ) }
      </div>
    );
  }

}

module.exports = ButtonRow;
