import { openModal, closeModal } from './modal';
// import { postData } from '../services/services';

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

      const formData = new FormData(form);

      // --- ЛОКАЛЬНА ВІДПРАВКА НА JSON-SERVER (localhost:3000) ---
      // const json = JSON.stringify(Object.fromEntries(formData.entries()));
      //
      // postData('http://localhost:3000/requests', json)
      //   .then(data => {
      //     console.log(data);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      //   })
      //   .catch(() => {
      //     showThanksModal(message.failure);
      //     statusMessage.remove();
      //   })
      //   .finally(() => {
      //     form.reset();
      //   });

      // --- ВІДПРАВКА ДАНИХ НА NETLIFY FORMS ---
      fetch(form.getAttribute('action') || window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
          }
        })
        .then(() => {
          console.log('Form submitted to Netlify Forms');
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          showThanksModal(message.failure);
          statusMessage.remove();
        })
        .finally(() => {
          form.reset();
        });
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
        <div class="modal__close" data-close>&times;</div>
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

  // --- ЛОКАЛЬНЕ ОТРИМАННЯ ДАНИХ З СЕРВЕРА ---
  // fetch('http://localhost:3000/menu')
  //   .then(data => data.json())
  //   .then(res => console.log(res));
}

export default forms;
