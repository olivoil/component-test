

/**
 * Module dependencies.
 */

var Resolve = require('component-resolver');
var Build = require('./build');
var fs = require('fs');
var co = require('co');
var $ = require('thunkify');
var write = $(fs.writeFile);
var path = require('path');

/**
 * Expose builders.
 */

module.exports = middleware;

function middleware(build, options) {
  if (typeof build === 'object') {
    options = build;
    build = Build;
  } else if (typeof build !== 'function') {
    build = Build;
  }

  options = options || {};
  if (options.install == null) options.install = true;
  if (options.require == null) options.require = true;

  var root = options.root || process.cwd();
  var resolving = false;
  var queue = [];
  var path = options.path || '/build';
  var re = new RegExp('^' + path + '.(js|css)$');

  return function* componentMiddleware(next) {
    var m = re.exec(this.request.path);
    if (!m) return yield* next;

    var tree = yield resolve;
    var _build = build(tree, options);

    switch (m[1]) {
      case 'js':
        this.response.body = yield _build.scripts.bind(_build);
        this.response.set('Cache-Control', 'private, no-cache');
        this.response.type = 'js';
        return;
      case 'css':
        this.response.body = yield _build.styles.bind(_build);
        this.response.set('Cache-Control', 'private, no-cache');
        this.response.type = 'css';
        return;
    }
  }

  // this is so you don't resolve two times at the same time.
  // overoptimization, but hey.
  function resolve(done) {
    if (resolving) return queue.push(done);
    resolving = true;

    Resolve(root, options, function (err, tree) {
      resolving = false;
      while (queue.length) queue.shift()(err, tree);
      done(err, tree);
    });
  }
}
