

module.exports = function(options){
  options = options || {};

  return function(file, done){
    if ('js' != file.extension) return done();
    if (!file.node.development) return done();
    if (!file.node.development.scripts) return done();
    if (!~file.node.development.scripts.indexOf(file.path)) return done();

    this.autotest = this.autotest || '';
    this.autotest += "require('" + file.name + "');\n";
    done();
  }
}
