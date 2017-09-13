const { Component, h } = require('preact');
const { route } = require('preact-router');

const Api = require('../mixins/api');

const Tabs = require('../partials/tabs');

const Overview = require('../partials/case/overview');
const Comments = require('../partials/case/comments');
const Details = require('../partials/case/details');
const Activity = require('../partials/case/activity');
const Attachments = require('../partials/case/attachments');
const WatchButton = require('../partials/watch-button');

const Layout = require('../layout');

class Case extends Component {

  componentDidMount() {
    this.timeout = setInterval(() => this.refresh({ spinner: false }), 20000);
    return this.refresh();
  }

  refresh(options) {
    return this.fetchData(`/api/case/${this.props.reference}`, options)
      .then(json => {
        if (json.ok) {
          this.props.dispatch({ type: 'OPEN_CASE', case: json });
        } else {
          route('/dashboard');
        }
      });
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
    this.props.dispatch({ type: 'CLOSE_CASE' });
  }

  getTabs() {
    const comments = this.props.activecase && this.props.activecase.comments;
    const attachments = this.props.activecase && this.props.activecase.attachments;
    const commentcount = comments ? comments.length : '-';
    const attachmentcount = attachments ? attachments.length : '-';
    return [
      { key: 'overview', label: 'Workflow' },
      { key: 'details', label: 'Full case details' },
      { key: 'activity', label: 'Activity logs' },
      { key: 'attachments', label: `Attachments (${attachmentcount})` },
      { key: 'comments', label: `Comments (${commentcount})` },
    ];
  }

  getSidebar() {
    return <Tabs {...this.props} getTabs={() => this.getTabs()} />
  }

  renderSection() {
    const tab = this.props.tab;
    switch (tab) {
      case 'comments':
        return <Comments {...this.props} />;
      case 'details':
        return <Details {...this.props} />;
      case 'activity':
        return <Activity {...this.props} />;
      case 'attachments':
        return <Attachments {...this.props} onUpdate={() => this.refresh()} />;
      default:
        return <Overview {...this.props} onUpdate={() => this.refresh()} />;
    }
  }

  render() {
    if (!this.props.activecase) {
      return;
    }
    const activecase = this.props.activecase;

    return (
      <Layout {...this.props} getSidebar={() => this.getSidebar()}>
        <div class="case">
          <div class="header">
            <h1>{activecase.displayName} ({this.props.reference})
            <WatchButton case={activecase} user={this.props.user} dispatch={this.props.dispatch} />
            </h1>
            <span class={`status status-${activecase.state}`}>{activecase.state}</span>
          </div>
          { this.renderSection() }
        </div>
      </Layout>
    );
  }

}

module.exports = Api(Case);
