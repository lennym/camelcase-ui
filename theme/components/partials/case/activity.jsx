const { Component, h } = require('preact');
const moment = require('moment');

const Api = require('../../mixins/api');
const ActivityRow = require('../activity');

class Activity extends Component {

  componentDidMount() {
    this.timeout = setInterval(() => this.refresh({ spinner: false }), 20000);
    return this.refresh({ spinner: false });
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  refresh(options) {
    return this.fetchData(`/api/case/${this.props.reference}/activity`, options)
      .then(json => {
        if (json.ok) {
          this.props.dispatch({ type: 'LOAD_ACTIVITY', activity: json });
        } else {
          this.props.dispatch({ type: 'ERROR', error: json });
        }
      });
  }

  render() {
    if (!this.props.activecase) {
      return;
    }
    const activity = this.props.activecase.activity || [];
    return ( <div>
      <h3>Activity logs</h3>
      { activity.map(line => (<ActivityRow {...line} reference={this.props.reference} />)) }
    </div> )
  }

}

module.exports = Api(Activity);
