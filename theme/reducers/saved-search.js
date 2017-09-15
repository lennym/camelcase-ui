module.exports = (state, action) => {
  state = state || null;
  switch (action.type) {
    case 'UPDATE_SAVED_SEARCH': {
      return Object.assign({}, action.query);
    }
  }
  return state;
}