const { Component, h } = require('preact');

const Form = require('./form');
const DetailsTable = require('./details-table');
const Api = require('../mixins/api');

class Task extends Component {

  toggle() {
    this.setState({ expanded: !this.props.complete || !this.state.expanded });
  }

  close() {
    this.setState({ expanded: false });
  }

  completeTask(data) {
    const props = {
      complete: true,
      metadata: data,
      comment: data.comment
    };
    this.updateData(`/api/case/${this.props.reference}/task/${this.props._id}`, props)
      .then(json => {
        if (json.ok) {
          this.props.dispatch({ type: 'RESET_FORM' });
          this.props.dispatch({ type: 'UPDATE_TASK', task: json });
          this.props.onUpdate();
        } else {
          this.props.dispatch({ type: 'ERROR', error: json, id: 'task-completion' });
        }
      });
  }

  getClassName() {
    const classes = ['activity', 'task'];
    classes.push(this.state.expanded ? 'expanded' : 'collapsed');
    classes.push(this.props.complete ? 'complete' : 'incomplete');
    return classes.join(' ');
  }

  render() {
    const schema = Object.assign({}, this.props.schema, {
      comment: {
        inputType: 'textarea',
        label: 'Comment'
      }
    });

    const className = this.getClassName();
    const metadata = Object.keys(this.props.metadata || {}).map(key => ({
      label: schema[key].label,
      value: this.props.metadata[key]
    }));

    return <blockquote class={className} onClick={() => this.toggle()}>
      {
        this.props.complete && <span class="status task">Complete</span>
      }
      <h4>{this.props.name}</h4>
      {
        this.props.description && <p>{this.props.description}</p>
      }
      {
        !this.props.complete && this.state.expanded && (
          <Form
            {...this.props}
            id="task-completion"
            onSubmit={data => this.completeTask(data)}
            onCancel={() => this.close()}
            class="inline-form"
            schema={schema}
            submit="Complete task"
            cancel="cancel"
            />
        )
      }
      {
        this.props.complete && this.state.expanded && (
          <div class="metadata">
            <h4>Metadata</h4>
            <DetailsTable rows={metadata} showEmpty={false} />
          </div>
        )
      }
    </blockquote>;
  }

}

module.exports = Api(Task);
