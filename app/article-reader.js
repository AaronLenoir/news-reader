const readability = require('node-readability');

function read(uri, callback) {
  readability(uri, callback);
}

module.exports = read;
