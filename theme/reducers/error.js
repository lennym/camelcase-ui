module.exports = (state, action) => {
  state = state || null;
  switch (action.type) {
    case 'ERROR': {
      if (action.error.type !== 'validation') {
        return action.error;
      }
      return null;
    }
    case 'CLEAR_ERROR': {
      return null;
    }
  }
  return state;
}