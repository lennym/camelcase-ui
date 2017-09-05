module.exports = (state, action) => {
  state = state || {};
  switch (action.type) {
    case 'TOGGLE_PROGRESS_FORM': {
      return Object.assign({}, state, {
        targetState: action.state
      });
    }
  }
  return state;
}