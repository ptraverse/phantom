var page = require('webpage').create();

page.onConsoleMessage = function(msg, lineNum, sourceId) {
	console.log('CONSOLE: ' + msg);
};

page.open('http://www.sportstats.ca/display-results.xhtml?raceid=25171', function() { 
    
    var selection = page.evaluate(function() {
    	
    	var isNumeric = function(n) {
	  		return !isNaN(parseFloat(n)) && isFinite(n);
		}
    	var selector = ".pagination-wrapper ul li:not(.active):not(.disabled)";    	    		
    	var number = $(selector).first();

    	while (isNumeric($(number).text())) {    		
    		console.log("numeric! clicking ");
    		console.log($(number).text());

    		 // create a mouse click event
		    var event = document.createEvent( 'MouseEvents' );
		    event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );
		 
		    // send click to element
		    number.dispatchEvent( event );

		    //get the next number
    		selector = ".pagination-wrapper ul li:not(.active):not(.disabled)";    	    		
    		number = $(selector).first();
    	} 
    	
    	console.log("finished");
    	    	
    });

    console.log(selection);

    phantom.exit();
});