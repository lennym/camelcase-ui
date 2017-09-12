module.exports = (state, action) => {
  state = state || [];
  switch (action.type) {
    case 'LOAD_CASES': {
      return action.cases || [];
    }
    case 'SUBSCRIBE': {
      return state.map(c => {
        if (c._id === action.case._id) {
          c.watchers = action.case.watchers;
        }
        return c;
      });
    }
    case 'CREATE_CASE': {
      state = state || [];
      state = state.concat(action.case);
      return state;
    }
  }
  return state;
}