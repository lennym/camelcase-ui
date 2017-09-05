const { Component, h } = require('preact');
const { route } = require('preact-router');

const Api = require('../mixins/api');

const Layout = require('../layout');
const Form = require('../partials/form');

class CreateCase extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'RESET_FORM' });
  }

  onCancel() {
    history.back()
  }

  createCase(data) {
    return this.saveData(`/api/case`, data)
      .then(json => {
        if (json.ok) {
          this.props.dispatch({ type: 'RESET_FORM' });
          this.props.dispatch({ type: 'OPEN_CASE', case: json });
          route(`/view/${json.reference}/overview`);
        } else {
          this.props.dispatch({ type: 'ERROR', error: json, id: 'create-case' });
        }
      });
  }

  render() {
    return (
      <Layout {...this.props}>
        <Form
          {...this.props}
          id="create-case"
          onSubmit={(d) => this.createCase(d)}
          onCancel={() => this.onCancel()}
          submit="Create case"
          cancel="Cancel"
          />
      </Layout>
    );
  }

}

module.exports = Api(CreateCase);
