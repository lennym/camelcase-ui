const { Component, h } = require('preact');

const Timestamp = require('./timestamp');

class FileList extends Component {

  fileUrl(file) {
    return `/api/case/${this.props.reference}/attachment/${file._id}`;
  }

  render() {
    const files = this.props.files || [];
    return (
      <ul class="attachments">
      {
        files && files.map(file => {
          const isImage = file.mimetype.match(/^image/);
          const timestamp = file.createdAt;
          return (
            <li class={isImage ? 'image' : ''}>
              <div class="icon"/>
              <div class="details">
                {
                  !!timestamp && (
                    <Timestamp timestamp={timestamp} user={file.createdBy} />
                  )
                }
                <label><a href={this.fileUrl(file)}>{file.name}</a></label>
              </div>
            </li>
          )
        })
      }
      </ul>
    )
  }

}

module.exports = FileList;
