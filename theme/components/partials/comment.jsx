const { Component, h } = require('preact');
const moment = require('moment');
const Markdown = require('preact-markdown');

const Timestamp = require('./timestamp');
const AttachmentList = require('./attachment-list');

class Comment extends Component {

  render() {
    const metadata = this.props.metadata || {};
    const className = `comment ${this.props.isNew ? 'new-comment' : ''}`;
    return <blockquote class={className}>
      {
        metadata.state && <span class="status">{metadata.state}</span>
      }
      {
        metadata.task && <span class="status task">Task: {metadata.task.id}</span>
      }
      <Timestamp timestamp={this.props.createdAt} user={this.props.createdBy} />
      <div class="comment-body">
        <Markdown markdown={this.props.comment} />
      </div>
      {
        !!this.props.attachments.length && (
          <div>
            <AttachmentList files={this.props.attachments} reference={this.props.reference} />
          </div>
        )
      }
    </blockquote>;
  }

}

module.exports = Comment;
