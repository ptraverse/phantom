var page = require('webpage').create();
var url = 'http://professional.pro.dev.box/';
page.open(url, function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  console.log('Page title is ' + title);
  phantom.exit();
});
