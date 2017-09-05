const { Component, h } = require('preact');

const Input = require('./input');

class Upload extends Input {

  componentDidMount() {
    this.props.onInput({
      name: this.props.name,
      value: []
    });
  }

  dragover(e) {
    e.preventDefault();
    this.setState({ active: true })
  }

  dragend(e) {
    this.setState({ active: false })
  }

  drop(e) {
    e.preventDefault();
    this.setState({ active: false });
    const files = [].slice.call(e.dataTransfer.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        this.addFile({
          name: file.name,
          mimetype: file.type,
          data: e.target.result
        });
      }, false);
      reader.readAsDataURL(file);
    });
  }

  addFile(file) {
    const files = this.props.value;
    files.push(file);
    this.props.onInput({
      name: this.props.name,
      value: files
    });
  }

  render() {
    const className = `droparea ${this.state.active ? 'active' : '' }`;
    const files = this.props.value || [];
    const placeholder = this.props.placeholder || 'Drag files here'
    return (
      <div>
        <div
          class={className}
          ondragover={e => this.dragover(e)}
          ondragleave={e => this.dragend(e)}
          ondragend={e => this.dragend(e)}
          ondrop={e => this.drop(e)}
          >
          <label>{placeholder}</label>
        </div>
        <ul class="attachments">
          {
            files.map(file => (
              <li>
                <div class="icon" />
                <div class="details"><label>{file.name}</label></div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

}

module.exports = Upload;
