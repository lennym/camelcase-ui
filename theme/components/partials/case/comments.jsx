const { Component, h } = require('preact');

const Api = require('../../mixins/api');
const TabUrl = require('../../mixins/tab-url');

const Comment = require('../comment');
const Form = require('../form');

class Comments extends Component {

  addComment(data) {
    data.case = this.props.activecase._id;
    return this.saveData(`/api/case/${this.props.reference}/comment`, data)
      .then(json => {
        if (json.ok) {
          this.props.dispatch({ type: 'RESET_FORM' });
          this.props.dispatch({ type: 'COMMENT_SAVED', comment: json });
        } else {
          this.props.dispatch({ type: 'ERROR', error: json, id: 'comment' });
        }
      });
  }

  render() {

    const commentSchema = {
      comment: {
        inputType: 'textarea',
        label: 'Add comment'
      }
    }
    const title = this.props.subtitle || 'All Comments';
    const activecase = this.props.activecase || {};
    const comments = activecase.comments || [];
    const count = this.props.count || 0;
    const showForm = this.props.commentform !== false;

    return (
      <div>
        <h3>{title}</h3>
        <div class="comment-list">
        {
          comments.slice(-1 * count).map(comment => {
            return <Comment {...comment} reference={this.props.reference} />;
          })
        }
        {
          !comments.length && (
            <p>No comments</p>
          )
        }
        </div>
        {
          showForm && (
            <Form
              {...this.props}
              id="comment"
              class="inline-form"
              onSubmit={(d) => this.addComment(d)}
              schema={commentSchema}
              submit="Add comment"
              />
          )
        }{
          !showForm && (
            <p><a href={this.buildUrl('comments')}>View all comments</a></p>
          )
        }
      </div>
    )
  }

}

module.exports = TabUrl(Api(Comments));
