const { Component, h } = require('preact');
const qs = require('querystring');

const Api = require('../mixins/api');

const Layout = require('../layout');
const FormRow = require('../partials/forms/form-row');
const ButtonRow = require('../partials/forms/button-row');
const StateSelector = require('../partials/search/state-selector');
const CaseList = require('../partials/case-list');

class Search extends Component {

  constructor(props) {
    super(props);
    this.setState({ searched: false });
  }

  componentDidMount() {
    this.props.dispatch({ type: 'LOAD_CASES', cases: [] });
  }

  updateQuery(prop, val) {
    this.props.dispatch({ type: 'UPDATE_SEARCH_QUERY', prop, val });
  }

  search(e) {
    e.preventDefault();
    this.setState({ searched: true });
    const query = qs.stringify(this.props.search);
    this.fetchData(`/api/cases?${query}`)
      .then(json => {
        this.props.dispatch({ type: 'LOAD_CASES', cases: json });
      });
  }

  reset() {
    this.props.dispatch({ type: 'RESET_SEARCH_QUERY' });
  }

  renderForm() {
    const fields = Object.keys(this.props.schema).filter(key => this.props.schema[key].index);
    return (
      <form onSubmit={e => this.search(e)}>
        <FormRow
          name="reference"
          inputType="text"
          label="Reference"
          value={this.props.search.reference}
          onInput={e => this.updateQuery('reference', e.value)}
          />
        {
          fields.map(field => {
            return <FormRow
              {...this.props.schema[field]}
              value={this.props.search[field]}
              onInput={e => this.updateQuery(field, e.value)}
              />
          })
        }
        <StateSelector states={this.props.states} checked={this.props.search.state} onInput={states => this.updateQuery('state', states)} />
        <ButtonRow cancel="Reset" onCancel={() => this.reset()} submit="Search" />
      </form>
    );
  }

  render() {
    const sidebar = this.state.searched && (() => this.renderForm());
    const className = this.state.searched && 'full-page';
    return (
      <Layout {...this.props} getSidebar={sidebar} className={className}>
        <h1>Search</h1>
        {
          this.state.searched && <CaseList {...this.props} />
        }
        {
          !this.state.searched && this.renderForm()
        }
      </Layout>
    )
  }

}

module.exports = Api(Search);
