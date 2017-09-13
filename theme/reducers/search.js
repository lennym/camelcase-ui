module.exports = (state, action) => {
  const defaults = {
    state: []
  }
  state = state || defaults;
  switch (action.type) {
    case 'UPDATE_SEARCH_QUERY': {
      return Object.assign({}, state, {
        [action.prop]: action.val
      });
    }
    case 'RESET_SEARCH_QUERY': {
      return defaults;
    }
  }
  return state;
}