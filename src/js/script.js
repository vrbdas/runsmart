const slider = tns({
	container: '.carousel__slider',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	navPosition: 'bottom',
	mouseDrag: true,
	nav: true,
	responsive: {
		1200: {
			nav: false
		},
	  }
});

document.querySelector('.prev').onclick = function () {
	slider.goTo('prev');
};
document.querySelector('.next').onclick = function () {
	slider.goTo('next');
};