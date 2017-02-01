var question = $('#question').find('input');
var length = 2;

$('#submit').on('click', function() {
	var choices = $('#choices').find('input');
	var choicesArr = [];

	choices.each(function() {
		choicesArr.push($(this).val());
	});

	var newQuestion = {
		question: question.val(),
		choices: choicesArr,
		correctAnswer: +$('#answer select').val()
	}

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
			}, 2000)
		}
	});
});

$('#add').on('click', function() {
	$('<label><input type="text" class="form-control"></label><br>').hide().appendTo('#choices').slideDown('fast').focus();
	length++;
	generateList();
});
$('#remove').on('click', function() {
	if ($('#choices input').length > 2) {
		$('#choices input').last().slideUp('fast', function() {
			$(this.remove())
		});
		$('#choices br').last().remove();
		length--;
		generateList();
	}
});

function generateList() {
	var list = $('#answer select');

	list.empty();

	for (var i = 1; i <= length; i++) {
		var text = $('#choices input').eq(i - 1).val();

		$('#choices input').on('blur', function() {
			generateList();
		});
		$('<option>' + text + '</option>').appendTo(list).attr('value', i - 1);
	}
}

generateList();