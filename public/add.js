// Initialise
var question = $('#question').find('input');
var length = 2;
generateList();

// Submits a PUT request to the server, populating the request body with the input fields
$('#submit').on('click', function() {
	if (!validate())
		return ;

	var choices = $('#choices').find('input');
	var choicesArr = [];

	choices.each(function() {
		choicesArr.push($(this).val());
	});

	var newQuestion = {
		question: questionMark(question.val()),
		choices: choicesArr,
		correctAnswer: +$('#answer select').val()
	};

	$.ajax('JSON', {
		method: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(newQuestion),
		success: function() {
			$('.container').append('<div id="success" class="bg-warning">Question successfully added!</div>');
			setTimeout(function() {
				$('#success').fadeOut('slow', function() {
					$(this).remove();
				});
			}, 2000);
			question.val('');
			$('#choices').find('input').each(function() {
				$(this).val('');
			});
			generateList();
		}
	});
});

// Adds additional answer box
$('#add').on('click', function() {
	$('<div><label><input type="text" class="form-control"></label><br><div>').hide().appendTo('#choices').slideDown('fast', function() {
		$('#choices input').last().focus();
	});
	length++;
	generateList();
});

// Removes an answer box
$('#remove').on('click', function() {
	var choices = $('#choices > div');

	if (choices.length > 2) {
		choices.last().slideUp('fast', function() {
			$(this).remove();
		});
		length--;
		generateList();
	}
});

// Populates the correct answer selection menu
function generateList() {
	var list = $('#answer select');
	var choices = $('#choices input');
	list.empty();

	choices.on('blur', function() {
		generateList();
	});

	for (var i = 1; i <= length; i++) {
		var text = choices.eq(i - 1).val();
		$('<option>' + text + '</option>').appendTo(list).attr('value', i - 1);
	}
}

// Validates that the inputs are not blank
function validate() {
	var empty = false;

	if (question.val().length < 1) {
		highlight(question);
		empty = true;
	}

	$('#choices').find('input').each(function() {
		if ($(this).val().length < 1) {
			empty = true;
			highlight($(this));
		}
	});

	if (empty) {
		appendError();
		return false;
	} else {
		return true;
	}
}

// Warns the user about invalid input
function appendError() {
	$('.container').append('<div id="error" class="bg-danger">Please fill in <strong>all</strong> the fields.</div>');
		setTimeout(function() {
			$('#error').fadeOut('slow', function() {
				$(this).remove();
			});
	}, 4000);
}

// Appends the has-error class and adds listeners to remove it
function highlight(elt) {
	elt.closest('div').addClass('has-error');

	elt.on('blur', function() {
		if (elt.val().length) {
			elt.closest('div').removeClass('has-error');
			elt.off('blur');
		}
	});
}

// Appends a question mark to the question if it does not already have one
function questionMark(string) {
	if (!/[?]$/.test(string))
		string = string.concat('?');
	return string;
}