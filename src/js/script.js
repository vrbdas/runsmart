/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable func-names */
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
    }
  }
})

document.querySelector('.prev').onclick = function () {
  slider.goTo('prev')
}
document.querySelector('.next').onclick = function () {
  slider.goTo('next')
};

(function ($) {
  $(() => {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container')
        .find('div.catalog__content')
        .removeClass('catalog__content_active')
        .eq($(this).index())
        .addClass('catalog__content_active')
    })
  })

  function toggleSlide (item) {
    $(item).each(function (i) {
      $(this).on('click', (e) => {
        e.preventDefault()
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
      });
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  })
// eslint-disable-next-line no-undef
}(jQuery))
