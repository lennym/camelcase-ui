const { uniqBy, pick } = require('lodash');

module.exports = (state, action) => {
  const defaults = {
    total: 0,
    page: 1,
    pages: 1,
    id: null
  };
  state = state || defaults;
  switch (action.type) {
    case 'RESET_SEARCH_RESULTS': {
      return defaults;
    }
    case 'RECEIVE_SEARCH_RESULTS': {
      let cases;
      if (action.id === state.id) {
        cases = uniqBy(state.cases.concat(action.cases), c => c.reference);
      } else {
        cases = action.cases;
      }
      return Object.assign({}, pick(action, Object.keys(defaults)), { cases });
    }
  }
  return state;
}