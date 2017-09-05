const { Component, h } = require('preact');

const FormRow = require('./forms/form-row');
const ButtonRow = require('./forms/button-row');

class Form extends Component {

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch({ type: 'SUBMIT_FORM', id: this.props.id });
    this.props.onSubmit(this.props.form[this.props.id].values);
  }

  onCancel(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onCancel();
  }

  updateForm(e) {
    this.props.dispatch({ type: 'UPDATE_FORM', name: e.name, value: e.value, id: this.props.id });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'RESET_FORM' });
  }

  render() {
    const schema = this.props.schema;
    const form = this.props.form && this.props.form[this.props.id] || {};
    console.log(form.submitting);
    form.values = form.values || {};
    form.errors = form.errors || {};
    return (
      <form onSubmit={e => this.onSubmit(e)} class={this.props.class} novalidate>
        {
          Object.keys(schema).map(key => {
            return <FormRow {...schema[key]}
              name={key}
              value={form.values[key] || ''}
              error={form.errors[key]}
              onInput={e => this.updateForm(e)}
              />
          })
        }
        <ButtonRow disabled={form.submitting} submit={this.props.submit} cancel={this.props.cancel} onCancel={(e) => this.onCancel(e)}/>
      </form>
    );
  }

}

module.exports = Form;
