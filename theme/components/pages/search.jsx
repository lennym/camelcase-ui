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
    this.setState({ searched: false, page: 1 });
  }

  componentDidMount() {
    this.props.dispatch({ type: 'RESET_SEARCH_RESULTS' });
  }

  updateQuery(prop, val) {
    this.setState({ page: 1 });
    this.props.dispatch({ type: 'UPDATE_SEARCH_QUERY', prop, val });
  }

  onSearch(e) {
    e && e.preventDefault();
    this.search();
  }

  search(options) {
    this.setState({ searched: true });
    const query = Object.assign({
      page: this.state.page || 1
    }, this.props.search);
    this.fetchData(`/api/cases?${qs.stringify(query)}`, options)
      .then(json => {
        this.props.dispatch(Object.assign({ type: 'RECEIVE_SEARCH_RESULTS' }, json));
      });
  }

  loadMore() {
    this.setState({ page: this.state.page + 1 });
    this.search({ spinner: false });
  }

  reset() {
    this.setState({ page: 1 });
    this.props.dispatch({ type: 'RESET_SEARCH_QUERY' });
  }

  renderForm() {
    const fields = Object.keys(this.props.schema).filter(key => this.props.schema[key].index);
    return (
      <form onSubmit={e => this.onSearch(e)}>
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
          this.state.searched && (
            <div>
              {
                !!this.props.results.cases.length && (<p>Showing 1-{this.props.results.cases.length} of {this.props.results.total} cases</p>)
              }
              <CaseList {...this.props} list={this.props.results} loadMore={() => this.loadMore()} />
            </div>
          )
        }
        {
          !this.state.searched && this.renderForm()
        }
      </Layout>
    )
  }

}

module.exports = Api(Search);
