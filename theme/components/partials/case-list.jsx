const { Component, h } = require('preact');
const { route } = require('preact-router');
const { Link } = require('preact-router/match');

const WatchButton = require('./watch-button');

class CaseList extends Component {

  constructor(props) {
    super(props);
    this.setState({ filter: typeof props.filter === 'string' ? props.filter : '' });
  }

  filter(e) {
    this.setState({ filter: e.target.value});
  }

  render(props, state) {
    const filter = (this.state.filter || '').toLowerCase();
    const cases = (this.props.list.cases || []).filter(c => c.reference.toString().includes(filter) || c.displayName.toLowerCase().includes(filter));
    return (
      <div>
        {this.props.filter && (
          <input type="search" placeholder="Filter cases..." onInput={e => this.filter(e)}/>
        )}
        { !!cases.length && (
          <table class="case-list">
            {
              cases.map(c => {
                return (
                  <tr class="case" onClick={() => route(`/view/${c.reference}/overview`)}>
                    <td>{c.reference}</td>
                    <td>{c.displayName}</td>
                    <td><span class={`status status-${c.state}`}>{c.state}</span></td>
                    <td class="nowrap">
                      <WatchButton case={c} user={this.props.user} dispatch={this.props.dispatch} />
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
        { this.props.list.page < this.props.list.pages && (
          <button onClick={() => {this.props.loadMore()}}>Load more</button>
        ) }
        { !cases.length && (
          <div class="dashboard-message">
            <h2>No cases found</h2>
          </div>
        ) }

      </div>
    );
  }

}

module.exports = CaseList;
