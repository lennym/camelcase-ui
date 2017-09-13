module.exports = superclass => class Api extends superclass {

  fetchData(url, options) {
    options = options || {};
    options.credentials = 'same-origin';
    options.headers = options.headers || {};
    options.headers.Accept = options.headers.Accept || 'application/json';
    if (options.spinner !== false) {
      this.props.dispatch({ type: 'FETCH_START' });
    }
    return fetch(url, options)
      .then(response => {
        if (!response.ok && response.status === 401) {
          location.reload();
          throw new Error('Unauthenticated');
        }
        this.props.dispatch({ type: 'FETCH_END' });
        return response.json().then(json => Object.assign(json, { ok: response.ok }));
      })
      .catch(e => {
        this.props.dispatch({ type: 'ERROR', error: e });
      });
  }

  saveData(url, data, options) {
    options = Object.assign({
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    }, options);
    return this.fetchData(url, options);
  }

  updateData(url, data, options) {
    return this.saveData(url, data, Object.assign({ method: 'PUT' }, options));
  }

}
