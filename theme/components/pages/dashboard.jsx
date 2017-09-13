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
  }

  componentDidMount() {
    this.props.dispatch({ type: 'LOAD_CASES', cases: [] });
    this.timeout = setInterval(() => this.refresh({ spinner: false }), 20000);
    return this.refresh();
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  refresh(options) {
    return this.fetchData('/api/cases', options)
      .then(json => {
        this.props.dispatch({ type: 'LOAD_CASES', cases: json });
      });
  }

  filter(filter) {
    const FILTERS = {
      open: c => c.isOpen,
      tasks: c => c.isOpen && c.openTasks,
      watching: c => c.isOpen && c.watchers.filter(w => w.id === this.props.user.id).length
    };
    filter = filter || this.props.dashboard.filter;
    filter = filter && FILTERS[filter] ? filter : 'watching';
    const cases = this.props.cases || [];
    return cases.filter(FILTERS[filter]);
  }

  selected(filter) {
    return filter === this.props.dashboard.filter ? 'selected' : '';
  }

  setFilter(filter) {
    this.props.dispatch({ type: 'DASHBOARD_FILTER', filter });
  }

  render() {
    const cases = this.filter();
    const watching = this.filter('watching').length;
    const open = this.filter('open').length;
    const tasks = this.filter('tasks').length;
    return (
      <Layout {...this.props}>
        <div class="dashboard">
          <ul class="stats">
            <li onClick={() => this.setFilter('watching')} class={this.selected('watching')}>
              <span class="count">{watching}</span><label>cases you are watching</label>
            </li>
            <li onClick={() => this.setFilter('tasks')} class={this.selected('tasks')}>
              <span class="count">{tasks}</span><label>cases with pending tasks</label>
            </li>
            <li onClick={() => this.setFilter('open')} class={this.selected('open')}>
              <span class="count">{open}</span><label>open cases</label>
            </li>
          </ul>
          <CaseList {...this.props} cases={cases} filter={true} />
        </div>
      </Layout>
    );
  }

}

module.exports = Api(Dashboard);
