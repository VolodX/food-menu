function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.remove('hide');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

	console.log(modalTimerId);

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}

}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      setTimeout(() => openModal(modalSelector, modalTimerId), 1000);
      // openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

// export default initModal;
export default modal;
export {openModal, closeModal};
