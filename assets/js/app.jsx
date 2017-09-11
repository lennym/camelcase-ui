const { render, h } = require('preact');
const { Provider, connect } = require('preact-redux');
const { createStore } = require('redux');

const App = require('../../theme/containers/app');
const reducers = require('../../theme/reducers');

const store = createStore(reducers, window.__INITIAL_STATE);

const container = document.getElementById('app');

render((
    <Provider store={store}>
      <App />
    </Provider>
  ), container, container.firstElementChild);
