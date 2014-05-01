
var koa = require('koa');
var serve = require('koa-static');
var c8 = require('./middleware');
var _ = require('thunkify');
var fs = require('fs');
var read = _(fs.readFile);
var join = require('path').join;

var app = module.exports = koa();

app.use(c8({
  development: true,
  autorequire: false
}));

app.use(serve(join(__dirname, 'client')));

app.use(function*(){
  this.type = '.html';
  this.body = yield read(join(__dirname, 'client', 'mocha.html'));
});
