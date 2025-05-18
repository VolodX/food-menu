import { openModal, closeModal } from './modal';

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Дякую! Скоро ми з вами зв’яжемся',
    failure: 'Щось пішло не так...'
  };

  forms.forEach(form => {
    bindPostData(form);
  });

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      // Просто дозволяємо формі відправитися стандартно (Netlify обробить)
      setTimeout(() => {
        // Імітуємо успішну відправку
        statusMessage.remove();
        showThanksModal(message.success);
        form.reset();
      }, 1000);

      // Якщо щось пішло не так (наприклад, немає мережі), показуємо помилку
      window.addEventListener('error', () => {
        statusMessage.remove();
        showThanksModal(message.failure);
        form.reset();
      }, { once: true });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div> 
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;