
export default function Modals() {
  this.open = (dataId) => {
    const modalId = dataId.srcElement.dataset.modal;
    document.getElementById(modalId).classList.remove('dlu-display--none');
  };

  this.close = (dataId) => {
    const modalId = dataId.target.dataset.modal || dataId.target.parentElement.dataset.modal;
    document.getElementById(modalId).classList.add('dlu-display--none');
  };
}

const
  $modalButtons = document.querySelectorAll('.dlc-modal__button'),
  $modalCloses = document.querySelectorAll('.dlc-modal__close'),
  $modalBackgrounds = document.querySelectorAll('.dlc-modal__background'),
  modal = new Modals();

$modalButtons.forEach(($modalButton) => {
  $modalButton.addEventListener('click', (e) => {
    modal.open(e);
  });
});

$modalCloses.forEach(($modalClose) => {
  $modalClose.addEventListener('click', (e) => {
    modal.close(e);
  });
});

$modalBackgrounds.forEach(($modalBackground) => {
  $modalBackground.addEventListener('click', (e) => {
    modal.close(e);
  });
});

// For dynamically created modals we need to do this.

['click', 'keydown'].forEach((eventName) => {
  document.body.addEventListener(eventName, (e) => {
    if (e.target && e.target.classList.contains('dlc-modal__button')) {
      if (e.type === 'click') {
        modal.open(e);
      }
      else if (e.type === 'keydown' && e.keyCode === 13) {
        modal.open(e);
      }
    }

    if (e.target && (e.target.classList.contains('dlc-modal__background') || e.target.parentElement.classList.contains('dlc-modal__close'))) {
      if (e.type === 'click') {
        modal.close(e);
      }
      else if (e.type === 'keydown' && e.keyCode === 13) {
        modal.close(e);
      }
    }
  });
});
