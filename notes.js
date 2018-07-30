(function ($) {
	$(document).ready(function() {
		$postit = $('<div class="postit"><p></p><a class="edit material-icons">edit</a></div>');
		$pinBoard = $('.pin-board');
		$file = $('input.import');
		$('.pin-board').draggable({
			addClasses: true,
		});
		zoom = 1;
		$('.add-postit').click(function() {
			var $new = $postit.clone();
			addPostit($new);
		});
		$('.export').click(function() {
			var exportObj = {
				notes: []
			};
			$('.postit').each(function() {
				exportObj.notes.push({
					'text': $(this).find('p').text(),
					'left': $(this).css('left'),
					'top': $(this).css('top')
				});
			});
			download('export.txt', JSON.stringify(exportObj));
		})
		$('.upload').click(function() {
			$file.click();
		})
		$file.change(function() {
			file = $file[0].files[0];
			var read = new FileReader();
			read.readAsBinaryString(file);
			read.onloadend = function(){
				var notes = JSON.parse(read.result);
				notes.notes.forEach(function(note) {
					var $new = $postit.clone();
					$new = addPostit($new);
					$new.find('p').text(note.text);
					$new.css('left', note.left);
					$new.css('top', note.top);
				});
			}
		})
		$('html').contextmenu(function(e){
			e.preventDefault();
			var $new = $postit.clone();
			addPostit($new);
			$new.css('left',e.offsetX+'px');
			$new.css('top',e.offsetY+'px');
		})
	});
	function download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
	function addPostit($postit) {
		$postit.draggable({
			addClasses: true,
			containment: "parent",
			stack: '.postit'
		});
		$pinBoard.append($postit);
		$postit.css('position', 'absolute');
		$postit.find('.edit').click(function() {
			if ($postit.hasClass('editting')) {
				$(this).text('edit');
				$postit.removeClass('editting');
				var content = $postit.find('textarea').val();
				$postit.find('textarea').remove();
				$postit.append($('<p></p>').text(content));
			} else {
				$(this).text('save');
				$postit.addClass('editting');
				var content = $postit.find('p').text();
				$postit.find('p').remove();
				$postit.append($('<textarea></textarea>').val(content));
			}
		});
		$postit.dblclick(function() {
			$(this).find('.edit').click();
		});
		return $postit;
	}
})(jQuery);