$(document).ready(function(){
	$('.carousel__slider').slick({
		speed: 1000,
		prevArrow: '<button type="button" class="slick-prev"><img src="../icons/prevArrow.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="../icons/nextArrow.png"></button>',
		responsive: [
			{
			breakpoint: 992,
			settings: {
				dots: true,
				arrows: false
			  }
			}
		  ]
	  });
  });