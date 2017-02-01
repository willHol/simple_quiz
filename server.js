var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/JSON', function(req, res) {
	delete require.cache[require.resolve('./questions')];
	var questions = require('./questions');
	res.json(questions);
});

app.put('/JSON', function(req, res) {
	delete require.cache[require.resolve('./questions')];
	var questions = require('./questions');
	var newQuestion = req.body;

	questions.push(newQuestion);

	if (Object.keys(newQuestion).length !== 0) {
		fs.writeFile('questions.json', JSON.stringify(questions), function(err) {
			if (err)
				console.log(err);
			else
				console.log("Succesfully wrote to questions.json");
			res.end();
		});
	} else {
		res.end();
	}
});

app.delete('/reset', function(req, res) {
	fs.writeFile('questions.json', JSON.stringify([]), function(err) {
		if (err)
			console.log(err);
		else
			console.log("Succesfully wiped questions.json");
	});
	res.end();
});

app.listen(process.env.PORT || 3000);