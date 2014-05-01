

/**
 * Module dependencies.
 */

var Build = require('component-builder');
var autoprefix = require('builder-autoprefixer');

exports.styles = function (done) {
  var options = this.options;
  var build = Build.styles(this.tree, options);
  this.stylePlugins(build, options);
  build.end(function (err, css) {
    if (err) return done(err);
    if (!css) return done(null, '');
    done(null, css);
  });
}

exports.stylePlugins = function (build, options) {
  build.use('styles',
    autoprefix(options)
  );
}
