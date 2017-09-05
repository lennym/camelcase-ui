const { Component, h } = require('preact');

const TabUrl = require('../../mixins/tab-url');
const DetailsTable = require('../details-table');

class Details extends Component {

  render() {

    const activecase = this.props.activecase || {};
    const full = this.props.full !== false;

    const rows = Object.keys(this.props.schema).map(key => {
      const schema = this.props.schema[key];
      return (schema.index || full) && ({
        label: schema.label,
        value: activecase[key]
      });
    }).filter(Boolean);
    if (full) {
      rows.unshift({
        label: 'Reference',
        value: this.props.reference
      });
    }
    return (
      <div>
        <h3>Case details</h3>
        <DetailsTable rows={rows} />
        {
          !full && (
            <p><a href={this.buildUrl('details')}>View full details</a></p>
          )
        }
      </div>
    );

  }

}

module.exports = TabUrl(Details);
