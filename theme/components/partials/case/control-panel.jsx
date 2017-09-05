const { Component, h } = require('preact');

const Api = require('../../mixins/api');

const CommandBar = require('../command-bar');
const Form = require('../form');
const Task = require('../task');

class ControlPanel extends Component {

  saveUpdate(data) {
    const state = this.props.caseview.targetState;
    const comment = data.comment;
    return this.updateData(`/api/case/${this.props.reference}`, { state, comment })
      .then(json => {
        if (json.ok) {
          this.props.dispatch({ type: 'TOGGLE_PROGRESS_FORM', state: null });
          this.props.dispatch({ type: 'RESET_FORM' });
          this.props.dispatch({ type: 'OPEN_CASE', case: json });
        } else {
          this.props.dispatch({ type: 'ERROR', error: json, id: 'state-change' });
        }
      });
  }

  cancelUpdate(state) {
    this.props.dispatch({ type: 'TOGGLE_PROGRESS_FORM', state: null });
  }

  updateProgress(state) {
    this.props.dispatch({ type: 'TOGGLE_PROGRESS_FORM', state: state });
    this.props.dispatch({ type: 'TOGGLE_TASK', task: null });
  }

  render() {
    if (!this.props.activecase) {
      return;
    }

    const commentSchema = {
      comment: {
        inputType: 'textarea',
        label: 'Comment'
      }
    };
    const view = this.props.caseview || {};
    const current = this.props.activecase.state;
    const tasks = this.props.activecase.tasks.filter(task => task.state === current);
    const incomplete = tasks.filter(task => !task.complete)
    const complete = tasks.filter(task => task.complete)
    const next = [].concat(this.props.states[current].next).filter(Boolean);
    return (
      <div>
        <h3>{complete.length} tasks of {tasks.length} are complete</h3>
        <div class="task-list">
        {
          incomplete.map(task => <Task
            {...this.props}
            {...task}
            onUpdate={() => {this.props.onUpdate()}}
            form={this.props.form}
            schema={task.form}
            />)
        }
        {
          complete.map(task => <Task
            {...this.props}
            {...task}
            />)
        }
        </div>
        {
          !!next.length && !view.targetState && (
            <CommandBar title="Update case status:">
              { next.map(n => <button class="button" onClick={() => this.updateProgress(n)}>{n}</button>) }
            </CommandBar>
          )
        }
        {
          !!view.targetState && (
            <Form
              {...this.props}
              id="state-change"
              class="inline-form"
              schema={commentSchema}
              submit="Confirm"
              cancel="Cancel"
              onSubmit={data => this.saveUpdate(data)}
              onCancel={() => this.cancelUpdate()}
              />
          )
        }
      </div>
    )
  }

}

module.exports = Api(ControlPanel);
