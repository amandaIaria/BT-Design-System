/**
 * Header PopUp
 */
import Sidebar from './side-navigation';

export default function Header() {
  const
    sidebar = new Sidebar();

  this.hideMenus = (id) => {
    document.getElementById(id).classList.toggle('aiu-display--none');
  };

  this.showMenus = (headerId, e) => {
    const $hamburger = document.getElementById(headerId).children[0];
    if (e.currentTarget.classList.contains('aic-o-header__hamburger-button')) {
      if (sidebar.CheckVisibility($hamburger) === 'hidden') {
        $hamburger.style.visibility = 'visible';
        sidebar.TestForScreenHeight($hamburger);
      }
      else {
        sidebar.TestForScreenHeight($hamburger);
        $hamburger.style.visibility = '';
      }
      // document.getElementById(headerId).children[0].classList.toggle('aiu-display--block');
    }
    else {
      document.getElementById(headerId).classList.toggle('aiu-display--none');
    }
  };
}

const
  header = new Header(),
  $headerButtons = document.querySelectorAll('.aic-o-header__button'),
  $headerCloseButtons = document.querySelectorAll('.aic-o-header__nav-popup-close');

$headerButtons.forEach(($headerButton) => {
  $headerButton.addEventListener('click', (e) => {
    header.showMenus(e.currentTarget.dataset.modalid, e);
  });
});

$headerCloseButtons.forEach(($headerCloseButton) => {
  $headerCloseButton.addEventListener('click', (e) => {
    header.hideMenus(e.currentTarget.dataset.modalid);
  });
});
