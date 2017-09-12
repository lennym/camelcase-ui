const {merge, omit, pick} = require('lodash');

module.exports = (state, action) => {
  state = state || null;
  switch (action.type) {
    case 'OPEN_CASE': {
      return Object.assign({}, state, omit(action.case, 'activity'));
    }
    case 'SUBSCRIBE': {
      if (state && state._id === action.case._id) {
        return Object.assign({}, state, pick(action.case, 'watchers'));
      }
      return state;
    }
    case 'CLOSE_CASE': {
      return null;
    }
    case 'UPDATE_TASK': {
      const tasks = state.tasks.map(task => task._id === action.task._id ? action.task : task);
      return Object.assign({}, state, { tasks });
    }
    case 'COMMENT_SAVED': {
      action.comment.isNew = true;
      return Object.assign({}, state, {
        comments: [].concat(state.comments).concat(action.comment)
      });
    }
    case 'LOAD_ACTIVITY': {
      return Object.assign({}, state, { activity: action.activity });
    }
  }
  return state;
}