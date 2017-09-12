const { Component, h } = require('preact');
const moment = require('moment');

const Api = require('../mixins/api');

class WatchButton extends Component {

  isWatching() {
    return this.props.case.watchers.filter(watcher => watcher.id === this.props.user.id).length;
  }

  subscribe(e) {
    e.preventDefault();
    e.stopPropagation();
    const options = {
      method: this.isWatching() ? 'DELETE' : 'PUT'
    };
    return this.saveData(`/api/case/${this.props.case.reference}/watch`, {}, options)
      .then(json => {
        if (json.ok) {
          this.props.dispatch({ type: 'SUBSCRIBE', case: json });
        } else {
          this.props.dispatch({ type: 'ERROR', error: json });
        }
      });
  }

  render() {
    if (!this.props.case) {
      return;
    }
    const className = ['watch'];
    if (this.isWatching()) {
      className.push('watching');
    }
    return (<a class={className.join(' ')} onClick={(e) => this.subscribe(e)}></a>);
  }

}

module.exports = Api(WatchButton);
