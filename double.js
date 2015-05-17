function a(data, fn) {
	if (data.length>10) {
		process.kill();
	} else {		
		data.push('a');
		console.log(data);
		fn(data, b);	
	}
}

function b(data, fn) {
	if (data.length>10) {
		process.kill();
	} else {		
		data.push('b');
		console.log(data);
		fn(data, a);	
	}
}

data = [];
a(data, b);