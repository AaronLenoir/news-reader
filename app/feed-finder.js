'use strict';

function findFeedAndNeighbours(entries, targetGuid) {
  var previousFeed = null;
  var nextFeed = null;
  var targetFeed = null;

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (entry.guid === targetGuid) {
      targetFeed = entry;
      if ((i + 1) <= entries.length - 1) {
        previousFeed = entries[i + 1];
      }
      break;
    }

    nextFeed = entry;
  }

  return {
    previousFeed: previousFeed,
    nextFeed: nextFeed,
    targetFeed: targetFeed
  };
}

module.exports = findFeedAndNeighbours;
