$(document).ready(function () {
	$('.title-bar__burger').click(function (event) {
		// при клике на бургер действия.нажал-добавился класс.нажали-убрался
		$('.title-bar__burger').toggleClass('active');
		// $('body').toggleClass('lock');
	});
});

$(document).ready(function () {
	$('.menu__link').click(function (event) {
		$('.title-bar__burger').removeClass('active');
		// $('body').removeClass('lock');
	});
});
