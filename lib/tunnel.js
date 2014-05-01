
/**
 * Module Dependencies
 */

var localtunnel = require('localtunnel');

/**
 * Expose `tunnel`
 */

module.exports = tunnel;

/**
 * Create the `tunnel`
 *
 * @param {Number} port
 * @param {Function} fn
 * @return {Client}
 * @api private
 */

function tunnel(port, fn) {
  localtunnel(port, {host_name: 'http://localtunnel.me'}, function(err, tunnel){
    fn(err, tunnel.url);
  });
}
