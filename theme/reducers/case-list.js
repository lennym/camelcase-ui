module.exports = (state, action) => {
  state = state || {};
  switch (action.type) {
    case 'FILTER_CASE_LIST': {
      return Object.assign({}, state, {
        filter: action.filter
      });
    }
  }
  return state;
}