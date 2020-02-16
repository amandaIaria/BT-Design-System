/* eslint-disable import/prefer-default-export */
/**
 * Button events
 */

export function Buttons() {
  const
    _navOpen = ($button) => {
      $button.classList.add('aic-a-button--open');
    },
    _navClose = ($button) => {
      $button.classList.remove('aic-a-button--open');
    },
    _navEvent = ($button) => {
      $button.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('aic-a-button--open')) {
          _navClose(e.currentTarget);
        }
        else {
          _navOpen(e.currentTarget);
        }
      });
    };

  this.Init = ($button) => {
    if ($button.classList.contains('aic-a-button--navigation')) {
      _navEvent($button);
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
