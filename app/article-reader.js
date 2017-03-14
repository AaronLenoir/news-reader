const cache = require('memory-cache');
const readability = require('node-readability');

const timeToLiveMs = 60000;

function read(uri, callback) {
  var fromCache = cache.get(uri);
  if (fromCache !== null) {
    callback(undefined, fromCache.article, fromCache.meta);
  } else {
    readability(uri, function (err, article, meta) {
      if (err) {
        callback(err);
      }

      var data = {
        article: article,
        meta: meta
      };
      cache.put(uri, data, timeToLiveMs);
      callback(err, article, meta);
    });
  }
}

module.exports = read;
exports = read;
