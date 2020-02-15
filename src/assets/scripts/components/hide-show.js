import Tooltip from 'tooltip.js';

export default function HideAndShow() {
  const
    _changeIcons = ($button, start, end) => {
      [...$button.querySelectorAll('i')]
        .map(i => i)
        .filter(txt => txt.innerHTML.includes(start))
        .forEach(txt => { // eslint-disable-line
          txt.innerHTML = end;
        }); // eslint-disable-line
    },

    _close = ($container, $content, $button) => {
      $button.classList.remove('aic-o-accordion--active');
      $content.classList.remove('aic-o-accordion--show');
      _changeIcons($button, 'arrow_drop_up', 'arrow_drop_down');
    },

    _closeAll = ($container) => {
      const
        $allButtons = $container.querySelectorAll('button'),
        $allContent = $container.querySelectorAll('.aic-o-accordion__content');

      $allButtons.forEach(($button) => {
        $button.classList.remove('aic-o-accordion--active');
        _changeIcons($button, 'arrow_drop_up', 'arrow_drop_down');
      });

      $allContent.forEach(($content) => {
        $content.classList.remove('aic-o-accordion--show');
      });
    },

    _open = ($content, $button) => {
      $button.classList.add('aic-o-accordion--active');
      $content.classList.add('aic-o-accordion--show');
      _changeIcons($button, 'arrow_drop_down', 'arrow_drop_up');
    };

  this.accordion = ($button) => {
    const
      $container = $button.parentElement.parentElement,
      $content = $button.nextElementSibling;

    if (!$content.classList.contains('aic-o-accordion--show')) {
      _closeAll($container);
      _open($content, $button);
    }
    else {
      _close($container, $content, $button);
    }
  };

  this.collapse = ($button) => {
    const
      $container = $button.parentElement.parentElement,
      $content = $button.nextElementSibling;

    if (!$content.classList.contains('aic-o-accordion--show')) {
      _open($content, $button);
    }
    else {
      _close($container, $content, $button);
    }
  };

  this.tooltip = ($link) => {
    const
      copy = $link.dataset.tooltipcopy,
      direction = $link.dataset.direction || 'top',
      instance = new Tooltip($link, { // eslint-disable-line
        title: copy,
        placement: direction,
        trigger: 'click hover focus',
        html: true,
        innerSelector: '.aic-m-tooltip__inner',
        arrowSelector: '.aic-m-tooltip__carrot',
        template: `<div class="aic-m-tooltip__tooltip" role="tooltip" area-label="${copy}"><div class="aic-m-tooltip__carrot"></div><div class="aic-m-tooltip__inner"></div></div>`,
      });
  };
}

const
  $accordions = document.querySelectorAll('.aic-o-accordion--accordion button'),
  $collapses = document.querySelectorAll('.aic-o-accordion--collapse button'),
  $tooltips = document.querySelectorAll('.aic-m-tooltip'),
  hideShow = new HideAndShow();

$accordions.forEach(($accordion) => {
  $accordion.addEventListener('click', (e) => {
    hideShow.accordion(e.currentTarget);
  });
});

$collapses.forEach(($collapse) => {
  $collapse.addEventListener('click', (e) => {
    hideShow.collapse(e.currentTarget);
  });
});

$tooltips.forEach(($tooltip) => {
  hideShow.tooltip($tooltip);
  ['click'].forEach((event) => {
    $tooltip.addEventListener(event, (e) => {
      if (e.type === 'click') {
        e.preventDefault();
      }
    });
  });
});
