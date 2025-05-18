import { openModal, closeModal } from './modal';

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Дякую! Скоро ми з вами зв'яжемся',
    failure: 'Щось пішло не так...'
  };

  forms.forEach(form => {
    // Замінюємо стандартну поведінку відправки
    form.addEventListener('submit', handleSubmit);
  });

  function handleSubmit(e) {
    e.preventDefault();

    // Показуємо індикатор завантаження
    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    this.insertAdjacentElement('afterend', statusMessage);

    // Готуємо форму до звичайної відправки як форма Netlify
    const form = this;
    
    // Переконуємося, що форма має правильне hidden поле form-name
    let formNameInput = form.querySelector('input[name="form-name"]');
    if (!formNameInput) {
      formNameInput = document.createElement('input');
      formNameInput.type = 'hidden';
      formNameInput.name = 'form-name';
      formNameInput.value = form.getAttribute('name');
      form.appendChild(formNameInput);
    }

    // Відправляємо форму програмно
    const formData = new FormData(form);
    
    // Створюємо та виконуємо запит
    fetch('/', {
      method: 'POST',
      body: new URLSearchParams(formData).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(() => {
      statusMessage.remove();
      showThanksModal(message.success);
      form.reset();
    })
    .catch(() => {
      statusMessage.remove();
      showThanksModal(message.failure);
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