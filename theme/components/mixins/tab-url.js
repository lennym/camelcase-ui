module.exports = superclass => class TabUrl extends superclass {

  buildUrl(tab) {
    const params = Object.assign({}, this.props.matches, { tab })
    return Object.keys(params)
      .reduce((path, key) => path.replace(`:${key}`, params[key]), this.props.path);
  }

}
