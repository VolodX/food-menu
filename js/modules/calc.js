function calc() {
  const result = document.querySelector('.calculating__result span');

  let sex = localStorage.getItem('sex') || 'female';
  let ratio = +localStorage.getItem('ratio') || 1.375;
  let height, weight, age;

  localStorage.setItem('sex', sex);
  localStorage.setItem('ratio', ratio);

  function initLocalStorage(selector, activeClass) {
    document.querySelectorAll(selector).forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalStorage('#gender div', 'calculating__choose-item_active');
  initLocalStorage(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    const formula = {
      female: 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age,
      male: 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
    };

    result.textContent = Math.round(formula[sex] * ratio);
    // if (sex === 'female') {
    //   result.textContent = Math.round(
    //     (447.6 + (9.2 * weight + 3.1 * height - 4.3 * age)) * ratio
    //   );
    // } else {
    //   result.textContent = Math.round(
    //     (88.36 + (13.4 * weight + 4.8 * height - 5.7 * age)) * ratio
    //   );
    // }
  }
  calcTotal();

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }

        elements.forEach(el => el.classList.remove(activeClass));
        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function getDynamicInfo(selector) {
    document.querySelectorAll(selector).forEach(input => {
      input.addEventListener('input', () => {
        // input.style.border = input.value.match(/\D/g)
        input.style.border = input.value.match(/[^\d]|^0+$/)
          ? '1px solid red'
          : 'none';

        if (input.id === 'height') height = +input.value;
        if (input.id === 'weight') weight = +input.value;
        if (input.id === 'age') age = +input.value;

        calcTotal();
      });
    });
  }

  getDynamicInfo('#height, #weight, #age');
}

export default calc;
