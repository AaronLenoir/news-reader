// Read page code
var read = (new function (window, pager) {
  'use strict';

  var self = this;

  self.bindEvents = function () {
    var btnNext = window.document.getElementById('btnNextPage');
    var btnPrevious = window.document.getElementById('btnPreviousPage');

    btnNext.addEventListener('click', function (e) {
      pager.nextPage();
    });

    btnPrevious.addEventListener('click', function (e) {
      pager.previousPage();
    });

    window.document.addEventListener('keydown', function (e) {
      if (e.which === 39) {
        // Right arrow
        pager.nextPage();
      }

      if (e.which === 37) {
        // Left arraow
        pager.previousPage();
      }
    });
  };

  self.init = function () {
    self.bindEvents();
  };

  self.init();
}(window, pager));
