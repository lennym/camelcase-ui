const { Component, h } = require('preact');
const Api = require('../../mixins/api');

const Form = require('../form');
const AttachmentList = require('../attachment-list');

class Attachments extends Component {

  saveAttachments(data) {
    if (!data.attachments || !data.attachments.length) {
      return this.props.dispatch({ type: 'ERROR', error: { type: 'validation' }, id: 'upload-attachments' });
    }
    data.case = this.props.activecase._id;
    return this.saveData(`/api/case/${this.props.reference}/attachment`, data)
      .then(json => {
        if (json.ok) {
          this.props.dispatch({ type: 'ATTACHMENT_SAVED', attachment: json });
          this.props.dispatch({ type: 'RESET_FORM' });
          this.props.onUpdate();
        } else {
          this.props.dispatch({ type: 'ERROR', error: json, id: 'upload-attachments' });
        }
      });
  }

  render() {
    const attachments = this.props.activecase.attachments || [];
    const schema = {
      attachments: {
        inputType: 'upload',
        label: 'Files',
        placeholder: 'Drag files here to upload'
      },
      comment: {
        inputType: 'textarea',
        label: 'Comment'
      }
    }
    return (
      <div>
        <h3>Attachments</h3>
        <AttachmentList files={attachments} reference={this.props.reference} />
        <h4>Add attachments</h4>
        <Form
          {...this.props}
          id="upload-attachments"
          onSubmit={data => this.saveAttachments(data)}
          schema={schema}
          submit="Save attachments"
          />
      </div>
    );

  }

}

module.exports = Api(Attachments);