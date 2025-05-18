import { openModal, closeModal } from './modal';

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Дякую! Скоро ми з вами зв’яжемся',
    failure: 'Щось пішло не так...'
  };

  forms.forEach(form => {
    form.addEventListener('submit', handleSubmit);
  });

  function handleSubmit(e) {
    e.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    this.insertAdjacentElement('afterend', statusMessage);

    // Дозволяємо Netlify обробити форму автоматично
    this.submit();

    // Імітуємо затримку для UI
    setTimeout(() => {
      statusMessage.remove();
      showThanksModal(message.success);
      this.reset();
    }, 1000);

    // Обробка помилок (резервна)
    window.addEventListener('error', () => {
      statusMessage.remove();
      showThanksModal(message.failure);
      this.reset();
    }, { once: true });
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