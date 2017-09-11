const path = require('path');

const THEME_DIR = path.resolve(__dirname, 'theme');

class ResolverPlugin {

  constructor() {
    this.logged = 0;
  }

  apply(resolver) {
    resolver.plugin('described-resolve', (request, callback) => {
      if (request.module) {
        return callback();
      }
      const target = path.resolve(request.path, request.request);
      if (target.indexOf(THEME_DIR) === 0) {
        const newPath = target.replace(THEME_DIR, path.resolve(process.cwd(), './theme'));
        return resolver.doResolve('resolve', Object.assign({}, request, { request: newPath }), `Aliased ${target} to ${newPath}`, callback);
      }
      callback();
    });
  }

}



module.exports = {
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    plugins: [
      new ResolverPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['preact']
          }
        }
      }
    ]
  }
};
