var express = require('express');
var fs = require('fs');

var router = express.Router();

router.delete('/', function(req, res) {
	fs.writeFile('questions.json', JSON.stringify([]), function(err) {
		if (err)
			console.log(err);
		else
			console.log("Succesfully wiped questions.json");
	});
	
	res.end();
});

module.exports = router;