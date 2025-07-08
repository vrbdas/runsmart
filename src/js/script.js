import { tns } from 'tiny-slider';
import IMask from 'imask';
import WOW from 'wow.js';

new WOW().init();

document.addEventListener('DOMContentLoaded', () => {
  // кнопка вверх
  const pageUp = document.querySelector('.pageup');
  const promoSection = document.querySelector('.promo');

  window.addEventListener('scroll', () => {

    if (
      document.documentElement.scrollTop <
      getComputedStyle(promoSection).height.match(/[-0-9.]+/)[0]
    ) {
      // прокрутка до видимого экрана сравнивается с вычисленной высотой секции promo, рег.выр. отбрасывает 'px', [0] т.к. match возвращает массив
      pageUp.style.display = 'none';
    } else if (
      document.documentElement.scrollTop >=
      getComputedStyle(promoSection).height.match(/[-0-9.]+/)[0]
    ) {
      pageUp.style.display = 'block';
    }
  });

  // слайдер
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
        nav: false,
      },
    },
  });

  document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
  });

  // табы

  const catalogTabs = document.querySelectorAll('.catalog__tab'); // кнопки для переключения вкладок
  const catalogContents = document.querySelectorAll('.catalog__content'); // вкладки фитнес бег триатлон
  const catalogItems = document.querySelectorAll('.catalog-item'); // блоки с часами

  function clearActives() {
    catalogTabs.forEach((tab) => {
      tab.classList.remove('catalog__tab_active');
    });
    catalogContents.forEach((content) => {
      content.classList.remove('catalog__content_active');
    });
  }

  catalogTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      clearActives();
      catalogTabs[i].classList.add('catalog__tab_active');
      catalogContents[i].classList.add('catalog__content_active');
    });
  });

  catalogItems.forEach((item) => {
    const link = item.querySelector('.catalog-item__link'); // кнопка 'подробнее' вложенная в элемент
    //catalog-item__back
    const linkBack = item.querySelector('.catalog-item__back'); // кнопка 'подробнее' вложенная в элемент
    const itemContent = item.querySelector('.catalog-item__content'); // страница с картинкой часов
    const itemDetails = item.querySelector('.catalog-item__details'); // страница с характеристиками
    [linkBack, link].forEach((elem) =>
      elem.addEventListener('click', () => {
        // перключение страниц
        event.preventDefault();
        itemContent.classList.toggle('catalog-item__content_active');
        itemDetails.classList.toggle('catalog-item__details_active');
      })
    );
  });

  // модальные окна

  const consultationTriggers = document.querySelectorAll('[data-modal="consultationBtn"]');
  const orderTriggers = document.querySelectorAll('[data-modal="orderBtn"]');
  const closeTriggers = document.querySelectorAll('.modal__close');
  const overlay = document.querySelector('.overlay');
  const consultationModal = document.querySelector('#consultation');
  const orderModal = document.querySelector('#order');
  const thanksModal = document.querySelector('#thanks');
  const orderDescr = document.querySelector('[data-modal="orderDescr"]');
  let selectedItem = '';

  function closeModals() {
    overlay.classList.remove('show');
    consultationModal.classList.remove('show');
    orderModal.classList.remove('show');
    thanksModal.classList.remove('show');
    document.removeEventListener('keyup', handleEscape);
    selectedItem = ''; // в формах без товара selectedItem будет пустой строкой
  }

  function handleEscape(event) {
    if (event.key == 'Escape') closeModals();
  }

  function openModal(selector) {
    closeModals();
    resetForms();
    overlay.classList.add('show');
    selector.classList.add('show');
    console.log(selector);
    document.addEventListener('keyup', handleEscape);
  }

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => closeModals());
  });

  consultationTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openModal(consultationModal);
    });
  });

  orderTriggers.forEach((trigger, i) => {
    trigger.addEventListener('click', () => {
      openModal(orderModal);
      selectedItem = catalogItems[i].querySelector('.catalog-item__subtitle').textContent; // если модальное с товаром то selectedItem это название из заголовка карточки с часами
      orderDescr.textContent = selectedItem; // добавляется в заголовок модального окна
    });
  });

  // форма

  const forms = document.querySelectorAll('form');
  forms.forEach((form) => handleForm(form));

  function resetForms() {
    forms.forEach((form) => {
      const nameInput = form.querySelector('[name="name"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const emailInput = form.querySelector('[name="email"]');
      const error = form.querySelector('.feed-form__error');
      nameInput.value = '';
      phoneInput.value = '';
      emailInput.value = '';
      error.textContent = '';
    });
  }

  function handleForm(formSelector) {
    const nameInput = formSelector.querySelector('[name="name"]');
    const phoneInput = formSelector.querySelector('[name="phone"]');
    const emailInput = formSelector.querySelector('[name="email"]');
    const error = formSelector.querySelector('.feed-form__error');

    const maskOptions = {
      mask: '+{7}(000)000-00-00',
    };
    const mask = IMask(phoneInput, maskOptions);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      validateForm();
      if (!error.textContent) {
        const formData = {
          name: nameInput.value,
          phone: phoneInput.value,
          email: emailInput.value,
          order: selectedItem,
        };
        console.log(JSON.stringify(formData));
        openModal(thanksModal);
      }
    });

    function validateForm() {
      if (nameInput.value.length < 2) {
        error.textContent = 'Имя не должно быть короче 2 символов';
      } else if (phoneInput.value.length < 16) {
        error.textContent = 'Введите номер телефона';
      } else if (emailInput.value && !emailRegex.test(emailInput.value)) {
        error.textContent = 'Некорректный адрес Email';
      } else error.textContent = '';
    }
  }
});
