/* eslint-disable import/prefer-default-export */
/**
 * Button events
 */

export function Buttons() {
  const
    _addLoader = ($button) => {
      const $label = $button.querySelector('.dlc-button__label');
      $button.classList.add('dlc-button--loader');
      $button.setAttribute('disabled', 'disabled');
      $label.classList.add('dlu-display--none');
      $button.innerHTML += '<span class="dlc-button__label dlc-button__label-loader"><progress class="dlc-loader--circular-default dlc-loader--circular-indeterminate"></progress></span>';
    },

    _removeLoader = ($button) => {
      const $label = $button.querySelector('.dlc-button__label');
      $button.classList.remove('dlc-button--loader');
      $button.removeAttribute('disabled');
      $label.classList.remove('dlu-display--none');
      $button.querySelector('.dlc-button__label-loader').remove();
    };

  this.ButtonGroup = ($button, e) => {
    e.currentTarget.classList.add('dlc-button-grid--checked');
  };

  this.Loader = ($button, addRemove) => {
    if ($button.classList.contains('dljs-button--loader-click') && addRemove === 'add') {
      _addLoader($button);
    }

    if ($button.classList.contains('dljs-button--loader-click') && $button.classList.contains('dlc-button--loader') && addRemove === 'remove') {
      _removeLoader($button);
    }
  };

  this.ToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
}
