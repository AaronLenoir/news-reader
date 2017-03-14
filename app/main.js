'use strict';

const express = require('express');
const parser = require('rss-parser');
const readArticle = require('./article-reader');
const findFeedAndNeighbours = require('./feed-finder');

// Constants
const PORT = 8080;
const FEED_URL =
  'http://www.standaard.be/rss/section/8f693cea-dba8-46e4-8575-807d1dc2bcb7';

// App
const app = express();

app.set('view engine', 'pug');

// Middleware
app.use(express.static('static'));

// Routes
app.get('/read', function (req, res) {
  parser.parseURL(FEED_URL, fetchArticle);
  var targetFeeds = null;

  function fetchArticle(err, parsed) {
    if (err) {
      return console.error('Could not fetch article.', err);
    }

    var guid = req.query.guid;

    targetFeeds = findFeedAndNeighbours(parsed.feed.entries, guid);

    if (targetFeeds.targetFeed !== null) {
      readArticle(targetFeeds.targetFeed.link, renderArticle);
    }
  }

  function renderArticle(err, article, meta) {
    if (err) {
      return console.error('Could not render article.', err);
    }

    res.render('read', {
      title: targetFeeds.targetFeed.title,
      content: article.content,
      nextFeed: targetFeeds.nextFeed,
      previousFeed: targetFeeds.previousFeed,
      targetFeed: targetFeeds.targetFeed
    });

    // Close article to clean up jsdom and prevent leaks
    article.close();
  }
});

app.get('/', function (req, res) {
  parser.parseURL(
    FEED_URL,
    function (err, parsed) {
      res.render('index', {
        title: 'Sport',
        entries: parsed.feed.entries
      });
    });
});

// Server
app.listen(PORT, function () {
  console.log('Running on http://localhost:' + PORT);
});
