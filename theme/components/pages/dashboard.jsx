const qs = require('querystring');

const { Component, h } = require('preact');
const { Link } = require('preact-router/match');
const moment = require('moment');

const Api = require('../mixins/api');

const Layout = require('../layout');
const CaseList = require('../partials/case-list');

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.props.dashboard = this.props.dashboard || {};
    this.setState({ page: 1 });
  }

  componentDidMount() {
    this.timeout = setInterval(() => this.refresh({ spinner: false }), 20000);
    this.fetchData('/api/saved-search', { spinner: false })
      .then(json => {
        if (json.ok) {
          this.props.dispatch(Object.assign({ type: 'UPDATE_SAVED_SEARCH' }, json));
        }
      });
    return this.refresh();
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.savedSearch && this.props.savedSearch) {
      this.loadView('savedsearch', { spinner: false });
    }
  }

  refresh(options) {
    Object.keys(this.getFilters()).forEach(key => this.loadView(key, options));
  }

  loadView(prop, options) {
    let url = this.getFilters()[prop];
    if (!url) {
      return;
    }
    if (typeof url === 'string') {
      url = { url };
    }
    url.query = Object.assign({}, url.query);
    url.query.page = this.state.page || 1;
    return this.fetchData(`${url.url}?${qs.stringify(url.query)}`, options)
      .then(json => {
        this.props.dispatch(Object.assign({ type: 'LOAD_DASHBOARD_VIEW', view: prop }, json));
      });
  }

  loadMore() {
    this.setState({ page: this.state.page + 1 });
    this.loadView(this.props.dashboard.filter, { spinner: false });
  }

  getFilters() {
    const filters = {
      open: {
        url: '/api/cases',
        query: { state: ['backlog', 'in-progress'] }
      },
      watching: '/api/cases/watching'
    };
    if (this.props.savedSearch) {
      filters.savedsearch = {
        url: '/api/cases',
        query: this.props.savedSearch
      }
    }
    return filters;
  }

  selected(filter) {
    return filter === this.props.dashboard.filter ? 'selected' : '';
  }

  setFilter(filter) {
    this.setState({ page: 1 });
    this.props.dispatch({ type: 'DASHBOARD_FILTER', filter });
    this.loadView(filter, { spinner: false });
  }

  render() {
    const filters = this.getFilters();
    const list = this.props.dashboard[this.props.dashboard.filter];
    const counts = Object.keys(filters).reduce((map, key) => {
      return Object.assign(map, {
        [key]: this.props.dashboard[key] ? this.props.dashboard[key].total : '-'
      });
    }, {});
    return (
      <Layout {...this.props}>
        <div class="dashboard">
          <ul class="stats">
            <li onClick={() => this.setFilter('watching')} class={this.selected('watching')}>
              <span class="count">{counts.watching}</span><label>cases you are watching</label>
            </li>
            {
              !!filters.savedsearch && (
                <li onClick={() => this.setFilter('savedsearch')} class={this.selected('savedsearch')}>
                  <span class="count">{counts.savedsearch}</span><label>cases matching your saved search</label>
                </li>
              )
            }
            <li onClick={() => this.setFilter('open')} class={this.selected('open')}>
              <span class="count">{counts.open}</span><label>open cases</label>
            </li>
          </ul>
          {
            this.props.dashboard[this.props.dashboard.filter] && (
              <CaseList {...this.props} filter={true} list={list} loadMore={() => this.loadMore()} />
            )
          }
        </div>
      </Layout>
    );
  }

}

module.exports = Api(Dashboard);
