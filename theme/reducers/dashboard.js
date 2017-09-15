const { uniqBy, pick } = require('lodash');

module.exports = (state, action) => {
  state = state || {
    filter: 'open'
  };
  switch (action.type) {
    case 'DASHBOARD_FILTER': {
      state[action.filter].id = null;
      return Object.assign({}, state, { filter: action.filter });
    }
    case 'OPEN_CASE': {
      Object.keys(state).forEach(key => {
        if (state[key] && state[key].cases) {
          state[key].id = null;
        }
      });
      return Object.assign({}, state);
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
    case 'SUBSCRIBE': {
      Object.keys(state).forEach(key => {
        if (state[key] && state[key].cases) {
          state[key].cases = state[key].cases.map(c => {
            if (c._id === action.case._id) {
              c.watchers = action.case.watchers;
              state[key].id = null;
            }
            return c;
          });
        }
      });
      return Object.assign({}, state);
    }
  }
  return state;
}