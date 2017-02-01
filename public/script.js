

var allQuestions = getJSON('JSON');

function getJSON(path) {
	var req = new XMLHttpRequest();
	req.open("GET", path, false);
	req.send(null);

	return JSON.parse(req.responseText);
}

var maxScore;
var score;
var next;
var previous;
var questionNum;
var body;
var wrong;
var answers;

// Generates a radio button
function createQuestionInput() {
	var attributes = [
		["type", "radio"],
		["name", "answers"]
	];
	var questionInput = document.createElement("input");

	attributes.forEach(function(attributePair) {
		Element.prototype.setAttribute.apply(questionInput, attributePair);
	});
	return questionInput;
}

// Takes a choice as a string and returns the label + radio button node
function appendOption(choice) {
	var options = document.querySelector("#options");
	var questionNode = document.createElement("p");
	var div = document.createElement("div");
	var span = document.createElement("label");

	div.setAttribute("class", "radio");

	questionNode.textContent = choice + " ";
	span.appendChild(createQuestionInput());
	span.appendChild(questionNode);
	div.appendChild(span);

	return div;
}

// Takes a question object, prints the title and appends the options, 
// returns the 'question' div
function initialiseQuestion(questionObj) {
	var div = document.createElement("div");
	var title = document.createElement("h4");

	// Set attributes + contents
	div.setAttribute("id", "question");
	div.setAttribute("class", "form-group");
	title.textContent = questionObj.question;
	div.appendChild(title);

	questionObj.choices.forEach(function(choice) {
		div.appendChild(appendOption(choice));
	});


	return div;
}

function insertQuestions(question) {
	body.insertBefore(initialiseQuestion(question), previous);
}

function removeQuestions() {
	$('#question').remove();
}

function getOption() {
	var radios = document.querySelectorAll("input");
	var index;
	Array.prototype.forEach.call(radios, function(radio, i) {
		if (radio.checked)
			index = i;
	});
	return index;
}

function nextQuestion() {
	var question = allQuestions[questionNum];
	var option = getOption();

	answers[questionNum] = option;


	if (option == null) {
		$('#error').remove();
		$('.container').append('<div id="error" class="bg-warning">Please Choose.</div>');
		return;
	}

	if (question.correctAnswer === option)
		score++;
	else
		wrong.push(question);
	questionNum++;

	// next question
	if (questionNum < maxScore) {
		removeQuestions();
		insertQuestions(allQuestions[questionNum]);
		$('#counter').text((questionNum + 1) + '/' + maxScore);
		$('#error').remove();

		checkCorrectBox(answers[questionNum]);
	} else {
		var result = document.createElement("h3");
		result.textContent = "You scored: " + score + "/" + maxScore;

		// remove quiz elements
		removeQuestions();
		$('#next').hide();
		$('#previous').hide();
		$('#counter').hide();
		// display score
		body.appendChild(result);
		$('#error').remove();
		$(body).append('<button class="btn btn-success" id="Retry">Retry</button>');
		
		if (score == maxScore)
			$('.container').append('<div class="alert alert-warning" id="warning">Congratulations you got all the questions right!</div>');
		// else {
		// 	$('.container').append('<div class="alert alert-warning"><h3>Wrong Answers:</h3><ul class="list">');
		// 	wrong.forEach(function(question) {
		// 		$('.alert.alert-warning').append("<li>" + (allQuestions.indexOf(question) + 1) + "</li>");
		// 	});
		// 	$('.container').append('</ul></div>');
		// }
		$('#Retry').click(clear);
	}
}

function clear() {
	$('h3').remove();
	$('#Retry').remove();
	$('#warning').remove();
	$('#next').show();
	$('#previous').show();
	$('#counter').hide();
	init();
}

function previousQuestion() {
	if (questionNum > 0) {
		questionNum--;
		var answer = answers[questionNum];
		var question = allQuestions[questionNum];
		$('#counter').text((questionNum + 1) + '/' + maxScore);

		// Load elements
		removeQuestions();
		insertQuestions(allQuestions[questionNum]);

		// Check correct box
		checkCorrectBox(answer);

		// Remove score
		if (answer == question.correctAnswer)
			score--;
	}
}

function checkCorrectBox(answer) {
	var radios = document.querySelectorAll("input");
	Array.prototype.forEach.call(radios, function(radio, i) {
		if (i == answer)
			radio.checked = true;
	});
}

function init() {
	maxScore = allQuestions.length;
	score = 0;
	next = document.querySelector("#next");
	previous = document.querySelector("#previous");
	questionNum = 0;
	body = document.querySelector(".container");
	wrong = [];
	answers = [];

	$('#counter').show();
	$('#counter').text(1 + "/" + maxScore);
	insertQuestions(allQuestions[questionNum]);
	next.addEventListener("click", nextQuestion);
	previous.addEventListener("click", previousQuestion);
}

$('#delete').on('click', function() {
	$.ajax('reset', {
		method: 'DELETE'
	});
});

if (allQuestions.length) {
	init();
	$('#next').show();
	$('#previous').show();
} else {
	$('#next').remove();
	$('#previous').remove();
	$('<div class="alert alert-info"><strong>Pleasus</strong> add some questions.</div>').hide().appendTo('.container').fadeIn();
}


// $(function() {
//     $(window).focus(function() {
//         $(document).text("yo");
//     });
// });

