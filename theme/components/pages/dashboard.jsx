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
    return this.refresh();
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
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
    url.query = url.query || {};
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
    return {
      open: {
        url: '/api/cases',
        query: { state: ['backlog', 'in-progress'] }
      },
      tasks: '/api/cases',
      watching: '/api/cases'
    };
  }

  selected(filter) {
    return filter === this.props.dashboard.filter ? 'selected' : '';
  }

  setFilter(filter) {
    this.setState({ page: 1 });
    this.props.dispatch({ type: 'DASHBOARD_FILTER', filter });
  }

  render() {
    const list = this.props.dashboard[this.props.dashboard.filter];
    const counts = Object.keys(this.getFilters()).reduce((map, key) => {
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
            <li onClick={() => this.setFilter('tasks')} class={this.selected('tasks')}>
              <span class="count">{counts.tasks}</span><label>cases with pending tasks</label>
            </li>
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
