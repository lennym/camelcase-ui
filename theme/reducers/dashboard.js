const { uniqBy, pick } = require('lodash');

module.exports = (state, action) => {
  state = state || {
    filter: 'open'
  };
  switch (action.type) {
    case 'DASHBOARD_FILTER': {
      return Object.assign({}, state, { filter: action.filter });
    }
    case 'LOAD_DASHBOARD_VIEW': {
      const view = Object.assign({ id: null, cases: [] }, state[action.view]);
      let cases;
      if (action.id === view.id) {
        cases = uniqBy(view.cases.concat(action.cases), c => c.reference);
      } else {
        cases = action.cases;
      }
      Object.assign(view, pick(action, 'id', 'page', 'pages', 'total'), { cases });
      return Object.assign({}, state, { [action.view]: view });
    }
  }
  return state;
}