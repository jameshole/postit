(function ($) {
	$(document).ready(function() {
		$postit = $('<div class="postit"><p></p><a class="edit"></a></div>');
		$pinBoard = $('.pin-board');
		$('.pin-board').draggable({
			addClasses: true,
		});
		zoom = 1;
		$('.add-postit').click(function() {
			var $new = $postit.clone();
			addPostit($new);
		});
	});
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
				$postit.removeClass('editting');
				var content = $postit.find('textarea').val();
				$postit.find('textarea').remove();
				$postit.append($('<p></p>').text(content));
			} else {
				$postit.addClass('editting');
				var content = $postit.find('p').text();
				$postit.find('p').remove();
				$postit.append($('<textarea></textarea>').val(content));
			}
		});
	}
})(jQuery);