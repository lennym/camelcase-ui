module.exports = (state, action) => {
  state = state || {};
  switch (action.type) {
    case 'UPDATE_FORM': {
      if (!action.id) {
        return state;
      }
      const form = Object.assign({}, state[action.id]);
      form.values = form.values || {};
      form.values[action.name] = action.value;
      return Object.assign({}, state, {
        [action.id]: form
      });
    }
    case 'SUBMIT_FORM': {
      if (!action.id) {
        return state;
      }
      const form = Object.assign({}, state[action.id]);
      form.submitting = true;
      return Object.assign({}, state, {
        [action.id]: form
      });
    }
    case 'RESET_FORM': {
      return {};
    }
    case 'ERROR': {
      if (!action.id) {
        return state;
      }
      const form = Object.assign({}, state[action.id]);
      if (action.error.type === 'validation') {
        form.errors = action.error.metadata;
      }
      form.submitting = false;
      return Object.assign({}, state, {
        [action.id]: form
      });
    }
  }
  return state;
}