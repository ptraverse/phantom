var page = require('webpage').create();
var url = 'http://www.sportstats.ca/display-results.xhtml?raceid=25143';

page.onConsoleMessage = function(msg) {
	console.log('console> ' + msg);
};



page.open(url, function(status) {

  	page.injectJs("./jquery.min.js");

	page.evaluate(function() {

		var getNextPageButton = function() {
			console.log('getting page');
			var nextPageButton = $('.pagination-wrapper ul li:not(.disabled):not(.active)').first();
			if (nextPageButton.length===0) {
				return false;
			} else {
				console.log("getting next page #"+nextPageButton.text());
				return nextPageButton;
			}
		};

		var getAthleteData = function() {
			var athleteRow = $('tr.ui-widget-content');
			var athleteData = [];
			$(athleteRow).each(function(index, row) {
				var athleteName = $(row).find('a.athlete-trigger').text();
				var athleteTime = $(row).find('td').last().text();
				if (athleteName > '') {
					var tuple = {'name': athleteName, 'time': athleteTime};
					athleteData.push(tuple);
				}
			});
			return athleteData;
		};

		var getRect = function(element) {
		    return $(element)[0].getBoundingClientRect();
		};

		// --------------------------- //
		var nextPageButton = true;
		var athleteData = [];
		var maxPages = 6;
		var pageNum = 0;

		while (nextPageButton!==false && pageNum<maxPages) {
			nextPageButton = getNextPageButton();
			// console.log(JSON.stringify(nextPageButton));
			// var pageAthleteData = getAthleteData();
			// athleteData.push(pageAthleteData);
			// $(nextPageButton).click();

			// var rect = getRect(nextPageButton);
			// console.log(JSON.stringify(rect));
			// page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);

			$(nextPageButton).trigger("click");
			window.setTimeout(1000);

			pageNum++;
		}
		console.log(JSON.stringify(athleteData));
		// --------------------------- //
	});

	phantom.exit();
});