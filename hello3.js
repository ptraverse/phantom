var page = require('webpage').create();
var url = 'http://www.sportstats.ca/display-results.xhtml?raceid=25143';

page.onConsoleMessage = function(msg) {
	console.log('console> ' + msg);
};

page.open(url, function(status) {	

	page.evaluate(function() {

		var getNextPageButton = function() {
			var nextPageButton = $('.pagination-wrapper ul li:not(.disabled):not(.active)').first();
			if (nextPageButton.length==0) {
				return false;
			} else {
				console.log("clicking page #"+nextPageButton.text());
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

		// --------------------------- //
		var nextPageButton = getNextPageButton();
		var athleteData = [];
		var max = 2;
		while (nextPageButton!=false && max>0) {
			athleteData.push(getAthleteData());						
			$(nextPageButton).click();
			nextPageButton = getNextPageButton();
			console.log(athleteData.length);
			max = max-1;
		}
		console.log(JSON.stringify(athleteData));
		// --------------------------- //
	});


	phantom.exit();

});