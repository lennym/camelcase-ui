const { Component, h } = require('preact');
const { route } = require('preact-router');
const { Link } = require('preact-router/match');

class CaseList extends Component {

  constructor(props) {
    super(props);
    this.setState({ filter: props.filter || '' });
  }

  getCaseName(c) {
    return `${c.name} (${c.email})`;
  }

  filter(e) {
    this.setState({ filter: e.target.value});
  }

  render(props, state) {
    const filter = (this.state.filter || '').toLowerCase();
    const cases = (this.props.cases || []).filter(c => c.reference.toString().includes(filter) || this.getCaseName(c).toLowerCase().includes(filter));
    return (
      <div>
        <input type="text" placeholder="Filter cases..." onInput={e => this.filter(e)}/>
        { !!cases.length && (
          <table class="case-list">
            {
              cases.map(c => {
                return (
                  <tr class="case" onClick={() => route(`/view/${c.reference}/overview`)}>
                    <td>{c.reference}</td>
                    <td>{this.getCaseName(c)}</td>
                    <td><span class={`status status-${c.state}`}>{c.state}</span></td>
                    <td class="nowrap">
                      <span class="counter tasks" title={`${c.openTasks} open task(s)`}>
                        {c.openTasks}
                      </span>
                      <span class="counter comments" title={`${c.comments.length} comment(s)`}>
                        {c.comments.length}
                      </span>
                      <span class="counter attachments" title={`${c.attachments.length} attachment(s)`}>
                        {c.attachments.length}
                      </span>
                      <Link href={`/view/${c.reference}/overview`} className="button">View</Link>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        ) }
        { !cases.length && (
          <div class="dashboard-message">
            <h1>No cases found</h1>
          </div>
        ) }

      </div>
    );
  }

}

module.exports = CaseList;
