const { Component, h } = require('preact');

class DetailsTable extends Component {

  render() {
    return (
      <table class="details">
        {
          this.props.rows.map(row => {
            return (this.props.showEmpty || row.value) && (
              <tr>
                <th>{row.label}</th>
                <td>{row.value}</td>
              </tr>
            )
          })
        }
      </table>
    );
  }

}

module.exports = DetailsTable;
