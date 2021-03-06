// Side Navigation

// Show and Hide navigation can be found in header since the button lives in the header
// and uses the same functions for header menus show and hide.

export default function Sidebar() {
  const
    _addToTopButton = () => {
      const $button = document.createElement('button');
      $button.classList.add('aic-a-button', 'aiu-border-radius--six', 'aijs-button--to-top', 'aic-a-button--primary', 'aic-a-button--solid', 'aiu-ripple', 'aiu-ripple--light', 'aiu-space--p16', 'aiu-box-shadow--one');
      $button.style.bottom = '16px';
      $button.style.right = '16px';
      $button.style.position = 'fixed';
      $button.innerHTML = '<i class="material-icons" style="margin: 0">keyboard_arrow_up</i>';
      document.querySelector('main').append($button);
    },

    _nav = ($link) => {
      if ($link.classList.contains('aic-a-nav-side--active')) {
        $link.classList.remove('aic-a-nav-side--active');
      }
      else {
        $link.classList.add('aic-a-nav-side--active');
      }
    },

    _removeAddToTop = () => {
      document.querySelector('.aic-a-footer').style.marginTop = '0';
      document.querySelector('.aijs-button--to-top').remove();
    },

    _testHeight = ($container) => ($container.offsetHeight > window.innerHeight), // eslint-disable-line

    _testWidth = ($container) => {
      if (window.innerWidth >= 992) {
        $container.style.visibility = '';
        this.TestForScreenHeight($container);
      }
    };

  this.CheckVisibility = (element) => (element.currentStyle ? element.currentStyle.visibility : getComputedStyle(element).visibility); // eslint-disable-line

  this.SetActiveClassOnStatic = ($sidenav) => {
    if ($sidenav.classList.contains('aijs-nav-side--static')) {
      const
        url = document.location.href,
        pageArray = url.split('/'),
        $sideNavLinks = $sidenav.querySelectorAll('a'),
        length = pageArray.length - 1;

      $sideNavLinks.forEach((link) => {
        const
          linkArray = link.toString().split('/'), // eslint-disable-line
          linkName = `${linkArray[linkArray.length - 2]}/${linkArray[linkArray.length - 1]}`, // eslint-disable-line
          pageName = `${pageArray[length - 1]}/${pageArray[length]}`, // eslint-disable-line
          $parent = link.parentNode.parentNode.parentNode; // eslint-disable-line

        if (pageName === linkName && pageArray[length] !== '') {
          link.classList.add('aic-a-nav-side--active');

          if ($parent.querySelector('a').href !== '' && $parent.querySelector('a').classList.contains('aic-a-nav-side__link-parent')) {
            $parent.querySelector('a').classList.add('aic-a-nav-side--active');
            this.TestForScreenHeight($sidenav);
          }
        }
      });
    }
  };

  this.SetUp = ($container, $click) => {
    $click.addEventListener('click', (e) => {
      if (e.currentTarget.href.indexOf('.html') === -1) {
        e.preventDefault();
      }

      _nav(e.currentTarget);

      if ($container.classList.contains('aic-a-nav-side')) {
        this.TestForScreenHeight($container);
      }
    });

    window.addEventListener('resize', () => {
      _testWidth($container);
    });
  };

  this.TestForScreenHeight = ($sb) => {
    setTimeout(() => {
      const checkForButton = document.body.contains(document.querySelector('.aijs-button--to-top'));
      if (_testHeight($sb) && this.CheckVisibility($sb) !== 'hidden') {
        if ($sb.classList.contains('aiu-position--fixed')) $sb.classList.remove('aiu-position--fixed');
        if (!checkForButton) _addToTopButton();
      }
      else {
        $sb.classList.add('aiu-position--fixed');
        if (checkForButton) _removeAddToTop();
      }
    }, 50);
  };
}

const
  $sidebar = document.querySelector('.aic-a-nav-side'),
  sidebar = new Sidebar();

$sidebar.querySelectorAll('.aic-a-nav-side__link').forEach(($sidebarLink) => {
  sidebar.SetUp($sidebar, $sidebarLink);
});

sidebar.SetActiveClassOnStatic($sidebar);
