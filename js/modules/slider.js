function slider({ container, wrapper, field, slide, nextArrow, prevArrow, totalCounter, currentCounter }) {
  const slider        = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        slidesField   = document.querySelector(field),
        slides        = document.querySelectorAll(slide),
        next          = document.querySelector(nextArrow),
        prev          = document.querySelector(prevArrow),
        total         = document.querySelector(totalCounter),
        current       = document.querySelector(currentCounter);

  let slideIndex = 1,
      offset     = 0,
      dots       = [];

  // Отримує поточну ширину wrapper у px (число)
  function getWrapperWidth() {
    return slidesWrapper.offsetWidth;
  }

  // Оновлює ширини слайдів і загальну ширину поля
  function updateWidths() {
    const w = `${getWrapperWidth()}px`;
    slides.forEach(sl => sl.style.width = w);
    slidesField.style.width = `${100 * slides.length}%`;
  }

  // Переміщує поле слайдів на offset
  function moveSlide() {
    slidesField.style.transform = `translateX(-${offset}px)`;
  }

  // Оновлює лічильник поточного слайду
  function updateCurrentSlide() {
    current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
  }

  // Робить активною крапку
  function dotActive() {
    dots.forEach(d => d.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = '1';
  }

  // Встановлює правильні розміри відразу та при зміні розміру вікна
  updateWidths();
  window.addEventListener('resize', () => {
    updateWidths();
    offset = getWrapperWidth() * (slideIndex - 1);
    moveSlide();
  });

  // Індикатори та лічильники
  total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
  updateCurrentSlide();

  const indicators = document.createElement('ul');
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  slides.forEach((_, i) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.dataset.slideTo = i + 1;
    if (i === 0) dot.style.opacity = '1';
    indicators.append(dot);
    dots.push(dot);
  });

  // Спільна логіка наступу/попереду
  function changeSlide(direction = 1) {
    const w = getWrapperWidth();
    if (direction === 1) {
      if (offset === w * (slides.length - 1)) {
        offset = 0; slideIndex = 1;
      } else {
        offset += w; slideIndex++;
      }
    } else {
      if (offset === 0) {
        offset = w * (slides.length - 1);
        slideIndex = slides.length;
      } else {
        offset -= w; slideIndex--;
      }
    }
    moveSlide(); updateCurrentSlide(); dotActive();
  }

  next.addEventListener('click', () => changeSlide(1));
  prev.addEventListener('click', () => changeSlide(-1));

  // Клік по крапці
  dots.forEach(dot => dot.addEventListener('click', e => {
    const to = +e.target.dataset.slideTo;
    slideIndex = to;
    offset = getWrapperWidth() * (to - 1);
    moveSlide(); updateCurrentSlide(); dotActive();
  }));
}

export default slider;
