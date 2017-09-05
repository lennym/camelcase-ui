module.exports = (state, action) => {
  state = state || {
    filter: 'tasks'
  };
  switch (action.type) {
    case 'DASHBOARD_FILTER': {
      return Object.assign({}, state, { filter: action.filter });
    }
  }
  return state;
}