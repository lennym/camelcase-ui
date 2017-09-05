module.exports = (state, action) => {
  state = state || null;
  switch (action.type) {
    case 'FETCH_START': {
      return true;
    }
    case 'OPEN_CASE':
    case 'LOAD_CASES':
    case 'LOAD_ACTIVTY':
    case 'ERROR':
    case 'FETCH_END': {
      return false;
    }
  }
  return state;
}