const request = require('request');

module.exports = settings => {

  return {
    get: (url, token) => {
      const opts = {
        json: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return new Promise((resolve, reject) => request.get(`${settings.api}${url}`, opts, (err, response, data) => {
        if (!err && response.statusCode === 404) {
          return resolve();
        }
        err ? reject(err) : resolve(data);
      }));
    }
  }

}