const { Component, h } = require('preact');
const Markdown = require('preact-markdown');

const Timestamp = require('./timestamp');
const DetailsTable = require('./details-table');
const AttachmentList = require('./attachment-list');

class Activity extends Component {

  constructor(props) {
    super(props);
    this.setState({ toggled: false });
  }

  getMessage(type) {
    if (type === 'create') {
      return 'Case created';
    } else if (type === 'state') {
      return `State updated: ${this.props.metadata.state}`;
    } else if (type === 'task') {
      return `Task complete: ${this.props.metadata.task}`;
    }
  }

  getMetadata(type) {
    if (type === 'attachment' || type === 'comment') {
      return null
    }
    const omit = ['comment', type];
    return Object.keys(this.props.metadata || {}).filter(key => !omit.includes(key) && this.props.metadata[key]);
  }

  render() {
    const type = this.props.type.split(':')[0];
    const message = this.getMessage(type);
    const meta = this.getMetadata(type);
    let className = `activity ${type}`;

    const canToggle = !this.state.toggled && meta && !!meta.length;
    if (canToggle) {
      className += ' can-toggle';
    }
    const toggle = () => {
      this.setState({ toggled: canToggle && !this.state.toggled });
    }

    return <blockquote class={className} onClick={() => toggle()}>
      <Timestamp timestamp={this.props.createdAt} user={this.props.user} />
      {
        type === 'state' && <span class="status">Status: {this.props.type.split(':')[2]}</span>
      }
      {
        type === 'create' && <span class="status">new</span>
      }
      {
        type === 'task' && <span class="status task">Task: {this.props.type.split(':')[1]}</span>
      }
      {
        type === 'comment' && <span class="status comment">Comment</span>
      }
      {
        type === 'attachment' && <span class="status attachment">Attachment</span>
      }
      { message && <label>{message}</label> }
      {
        type === 'comment' && (
          <blockquote>
            <div class="comment-body">
              <Markdown markdown={this.props.metadata ? this.props.metadata.comment : ''} />
            </div>
          </blockquote>
        )
      }
      {
        type === 'attachment' && (
          <AttachmentList files={[this.props.metadata]} reference={this.props.reference} />
        )
      }
      {
        canToggle && (
          <div class="toggle-indicator"></div>
        )
      }
      {
        meta && this.state.toggled && !!meta.length && (
          <div class="metadata">
            <h4>Metadata</h4>
            <DetailsTable rows={meta.map(key => ({ label: key, value: this.props.metadata[key] }))} />
          </div>
        )
      }
    </blockquote>;
  }

}

module.exports = Activity;
