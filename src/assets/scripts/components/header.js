/**
 * Header PopUp
 */
import Sidebar from './side-navigation';

export default function Header() {
  const
    sidebar = new Sidebar();

  this.hideMenus = (id) => {
    document.getElementById(id).classList.toggle('dlu-display--none');
  };

  this.showMenus = (headerId, e) => {
    const $hamburger = document.getElementById(headerId).children[0];
    if (e.currentTarget.classList.contains('dlc-header__hamburger-button')) {
      if (sidebar.CheckVisibility($hamburger) === 'hidden') {
        $hamburger.style.visibility = 'visible';
        sidebar.TestForScreenHeight($hamburger);
      }
      else {
        sidebar.TestForScreenHeight($hamburger);
        $hamburger.style.visibility = '';
      }
      // document.getElementById(headerId).children[0].classList.toggle('dlu-display--block');
    }
    else {
      document.getElementById(headerId).classList.toggle('dlu-display--none');
    }
  };
}

const
  header = new Header(),
  $headerButtons = document.querySelectorAll('.dlc-header__button'),
  $headerCloseButtons = document.querySelectorAll('.dlc-header__nav-popup-close');

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
