module.exports = (state, action) => {
  state = state || {
    current: null
  };
  switch (action.type) {
    case 'SELECT_TAB': {
      return Object.assign({}, state, {
        current: action.tab
      });
    }
  }
  return state;
}