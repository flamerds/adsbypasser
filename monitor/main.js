var fs = require('fs');

var Browser = require('zombie');

var toolkit = require('../tests/misc/toolkit.js');

var userscript = fs.readFileSync('dest/adsbypasser.user.js', 'utf-8');
var browser = Browser.create({
  runScripts: false,
});

browser.visit('http://69fdbda0.linkbucks.com/').then(function () {
  toolkit.evaluate(browser, userscript);

  browser.wait().then(function () {
    var eq = browser.window._eventQueue;
    console.info(eq.queue.length, eq.expecting.length, eq.timers.length);
    console.info(1, browser.window.location.toString());
    if (eq.timers.length > 0) {
      browser.wait().then(function () {
        console.info(eq.queue.length, eq.expecting.length, eq.timers.length);
        console.info(2, browser.window.location.toString());
      });
    }
  });

}).catch(function () {
  console.info('failed', arguments);
  browser.close();
});
