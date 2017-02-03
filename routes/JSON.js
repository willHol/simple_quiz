var express = require('express');
var fs = require('fs');

var router = express.Router();

router.get('/', function(req, res) {
	delete require.cache[require.resolve('../questions')];
	var questions = require('../questions');
	
	res.json(questions);
});

router.put('/', function(req, res) {
	delete require.cache[require.resolve('../questions')];
	var questions = require('../questions');
	var newQuestion = req.body;

	questions.push(newQuestion);

	fs.writeFile('questions.json', JSON.stringify(questions), function(err) {
		if (err)
			console.log(err);
		else
			console.log("Succesfully wrote to questions.json");
	});

	res.end();
});

module.exports = router;