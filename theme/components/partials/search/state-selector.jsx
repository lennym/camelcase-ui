const { Component, h } = require('preact');

class StateSelector extends Component {

  constructor(props) {
    super(props);
    this.setState({
      open: props.checked && !!props.checked.length,
      checked: props.checked
    });
  }

  onInput(name, checked) {
    const isOpen = !!this.props.states[name].next;
    let states = checked ? [name] : [];

    states = states.concat(this.state.checked.filter(key => key !== name));

    if (!checked) {
      this.setState({ [`preset:${isOpen?'open':'closed'}`]: false });
    }
    this.setState({ checked: states });
    this.props.onInput(states);
  }

  applyPreset(state, checked) {
    const applicableStates = Object.keys(this.props.states).filter(key => {
      const isOpen = !!this.props.states[key].next;
      return (state === 'open' && isOpen) || (state === 'closed' && !isOpen);
    });
    applicableStates.forEach(key => this.onInput(key, checked));
    this.setState({ [`preset:${state}`]: checked });
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const classList = ['checkbox-list', 'state-selector'];
    if (this.state.open) {
      classList.push('toggle-open');
    } else {
      classList.push('toggle-closed');
    }
    return (
      <fieldset class={classList.join(' ')}>
        <legend onClick={() => this.toggle()}>State</legend>
        {
          this.state.open &&
          <ul>
            <li>
              <input type="checkbox" name="preset-state" value="open" id="preset-state-open" onChange={e => this.applyPreset('open', e.target.checked)} checked={this.state['preset:open']} />
              <label for="preset-state-open">All open states</label>
            </li>
            <li>
              <input type="checkbox" name="preset-state" value="closed" id="preset-state-closed" onChange={e => this.applyPreset('closed', e.target.checked)} checked={this.state['preset:closed']} />
              <label for="preset-state-closed">All closed states</label>
            </li>
            <hr/>
            {
              Object.keys(this.props.states).map(state => {
                return (
                  <li>
                    <input type="checkbox" name="state" value={state} id={`state-${state}`} onChange={e => this.onInput(e.target.value, e.target.checked)} checked={this.props.checked.includes(state)} />
                    <label for={`state-${state}`}>{state}</label>
                  </li>
                )
              })
            }
          </ul>
        }
        <div class="toggle-indicator"></div>
      </fieldset>
    );
  }

}

module.exports = StateSelector;
