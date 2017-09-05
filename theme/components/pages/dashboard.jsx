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
      recent: c => c.isOpen && moment(c.createdAt).add(1, 'day').isAfter(moment())
    };
    filter = filter || this.props.dashboard.filter;
    filter = filter && FILTERS[filter] ? filter : 'tasks';
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
    const open = this.filter('open').length;
    const tasks = this.filter('tasks').length;
    const recent = this.filter('recent').length;
    return (
      <Layout {...this.props}>
        <div class="dashboard">
          <ul class="stats">
            <li onClick={() => this.setFilter('tasks')} class={this.selected('tasks')}>
              <span class="count">{tasks}</span><label>cases with pending tasks</label>
            </li>
            <li onClick={() => this.setFilter('open')} class={this.selected('open')}>
              <span class="count">{open}</span><label>open cases</label>
            </li>
            <li onClick={() => this.setFilter('recent')} class={this.selected('recent')}>
              <span class="count">{recent}</span><label>recently created cases</label>
            </li>
          </ul>
          <CaseList {...this.props} cases={cases} />
        </div>
      </Layout>
    );
  }

}

module.exports = Api(Dashboard);