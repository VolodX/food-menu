// js/script.js

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer'; 
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import scroll from './modules/scroll';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(
    () => openModal('.modal', modalTimerId),
    30000
  );

	scroll();
  tabs(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    'tabheader__item_active'
  );
  modal('[data-modal]', '.modal', modalTimerId);

  //  РОЗРАХУНОК ДАТИ "ПІСЛЯЗАВТРА" 
  let today = new Date(); // Поточна дата
  let dayAfterTomorrow = new Date(today); // Створюємо копію поточної дати
  dayAfterTomorrow.setDate(today.getDate() + 2); // Додаємо 2 дні
  dayAfterTomorrow.setHours(0, 0, 0, 0); // Встановлюємо час на початок дня (північ)
  timer('.timer', dayAfterTomorrow);

  cards();
  calc();
  forms('form', modalTimerId);
  slider({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current'
  });
});