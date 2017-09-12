module.exports = superclass => class Api extends superclass {

  fetchData(url, options) {
    options = options || {};
    if (options.spinner !== false) {
      this.props.dispatch({ type: 'FETCH_START' });
    }
    options.credentials = 'same-origin';
    return fetch(url, options)
      .then(response => {
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
      method: 'POST',
      credentials: 'same-origin'
    }, options);

    return fetch(url, options)
      .then(response => {
        return response.json().then(json => Object.assign(json, { ok: response.ok }));
      })
      .catch(e => {
        this.props.dispatch({ type: 'ERROR', error: e });
      });
  }

  updateData(url, data, options) {
    return this.saveData(url, data, Object.assign({ method: 'PUT' }, options));
  }

}
