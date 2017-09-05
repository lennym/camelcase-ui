module.exports = (state, action) => {
  state = state || [];
  switch (action.type) {
    case 'LOAD_CASES': {
      return action.cases || [];
    }
    case 'CREATE_CASE': {
      state = state || [];
      state = state.concat(action.case);
      return state;
    }
  }
  return state;
}