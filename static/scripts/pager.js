var pager = (function (window) {
  'user strict';

  var self = this;

  self.currentPage = 1;
  self.pages = [];
  self.maximumContentLength = 500;

  self.removeFigures = function () {
    var elements = window.document.getElementsByTagName('figure');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.parentNode.removeChild(element);
    }
  };

  self.findArticleBody = function () {
    var bodies = window.document.getElementsByClassName('article__body');

    if (bodies.length === 0) {
      throw new Error('Could not find an article.');
    }

    return bodies[0];
  };

  self.findIntros = function () {
    return self.findArticleBody().getElementsByClassName('intro');
  };

  self.findParagraphs = function () {
    var paragraphs = [];
    var intros = self.findArticleBody().getElementsByClassName('intro');
    var children = self.findArticleBody().children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.tagName.toUpperCase() === 'P') {
        paragraphs.push(child);
      }
    }

    return paragraphs;
  };

  self.getParagraphContentLength = function (paragraph) {
    return paragraph.innerHTML.length;
  };

  self.loadPagesFromParagraphs = function (pageNumberOffset) {
    var pageElements = [];
    var pages = [];
    var pageNumber = pageNumberOffset;

    var paragraphs = self.findParagraphs();

    var currentPage = {
      nr: pageNumber++,
      elements: []
    };

    var totalContentLength = 0;
    for (i = 0; i < paragraphs.length; i++) {
      var paragraph = paragraphs[i];
      totalContentLength += self.getParagraphContentLength(paragraph);

      currentPage.elements.push(paragraph);
      if (totalContentLength > self.maximumContentLength) {
        // Create new page
        pages.push(currentPage);
        currentPage = {
          nr: pageNumber++,
          elements: []
        };
        totalContentLength = 0;
      }
    }

    if (currentPage.elements.length !== 0) {
      // Still have some paragraphs that aren't in a page
      // yet, create the final page here.
      pages.push(currentPage);
    }

    return pages;
  };

  self.loadPages = function () {
    var i = 0;
    var pages = [];
    var intros = self.findIntros();

    pages.push({
      nr: 0,
      elements: intros
    });

    var pagesFromParagraphs = self.loadPagesFromParagraphs(pages.length);
    for (i = 0; i < pagesFromParagraphs.length; i++) {
      pages.push(pagesFromParagraphs[i]);
    }

    self.pages = pages;
  };

  self.hideElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.classList.add('hidden');
    }
  };

  self.showElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.classList.remove('hidden');
    }
  };

  self.showCurrentPage = function () {
    var currPageIndex = self.currentPage - 1;
    for (var i = 0; i < self.pages.length; i++) {
      var elements = self.pages[i].elements;
      if (i !== currPageIndex) {
        self.hideElements(elements);
      } else {
        self.showElements(elements);
      }
    }
  };

  self.goToNextPage = function () {
    if (self.currentPage === self.pages.length) {
      return;
    }

    self.currentPage++;
    self.showCurrentPage();
  };

  self.goToPreviousPage = function () {
    if (self.currentPage === 1) {
      return;
    }

    self.currentPage--;
    self.showCurrentPage();
  };

  self.init = function () {
    self.removeFigures();
    self.loadPages();

    self.showCurrentPage();

    console.log(pages);
  };

  self.init();

  return {
    nextPage: self.goToNextPage,
    previousPage: self.goToPreviousPage
  };
}(window));
