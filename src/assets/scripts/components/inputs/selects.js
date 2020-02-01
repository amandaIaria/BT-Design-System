/* eslint-disable import/prefer-default-export */
/**
 *
 * On click for Selects and menu creation for custom menus
 *
*/

import GeneralFunctions from '../general-functions/general-functions';

export function Selects() {
  const
    generalFun = new GeneralFunctions(),

    _dropDownEvent = ($select, $fauxSelectValue, e, $labelContainer, $menuContainer, $lis) => {
      e.preventDefault();
      $lis.forEach(($l) => {
        $l.classList.remove('dlc-select-field--selected');
      });

      $select.value = e.target.getAttribute('data-value'); // eslint-disable-line no-param-reassign
      $fauxSelectValue.innerHTML = e.target.getAttribute('data-value'); // eslint-disable-line no-param-reassign
      e.target.classList.add('dlc-select-field--selected'); // eslint-disable-line no-param-reassign
      $labelContainer.classList.add('dlc-select-field--focused'); // eslint-disable-line no-param-reassign
      $menuContainer.style.display = 'none'; // eslint-disable-line no-param-reassign
    },

    _regularSelects = ($selectContainer) => {
      $selectContainer.addEventListener('click', (e) => {
        e.srcElement.parentNode.classList.add('dlc-select-field--focused');
      });

      $selectContainer.addEventListener('focusin', (e) => {
        e.srcElement.parentNode.classList.add('dlc-select-field--focused');
      });

      $selectContainer.addEventListener('focusout', (e) => {
        const
          $input = e.srcElement.parentNode.querySelector('.dlc-input-field__input'),
          $thisLabel = e.srcElement.parentNode.classList,
          input = $input.value;

        if (input === '' && $thisLabel.contains('dlc-input-field--focused')) {
          e.srcElement.parentNode.classList.remove('dlc-input-field--focused');
        }
      });
    },

    _customSelects = ($customSelectContainer) => {
      let
        $list = '',
        $lis = '';

      const
        $options = $customSelectContainer.querySelectorAll('option'),
        $labelContainer = $customSelectContainer.querySelector('.dlc-select-field__input-container') || $customSelectContainer.querySelector('.dlc-select-field__month-container'),
        selectId = $customSelectContainer.dataset.selectid,
        $menuContainer = document.getElementById(selectId), // $customSelectContainer.querySelector('.dlc-select-field__input-menu'),
        $select = $customSelectContainer.querySelector('.dlc-select-field__native'),
        $fauxSelectValue = $customSelectContainer.querySelector('.dlc-select-field__input');

      // Check for any defaults
      if ($select.value !== '') {
        $fauxSelectValue.innerHTML = $select.value;
        $customSelectContainer.classList.add('dlc-select-field--focused');
      }

      // Automatically injecting the native inputs contents into the custom menu
      // Also note the tabindex so we can tab each `li`
      $options.forEach(($option) => {
        if ($select.value !== '' && $select.value === $option.value) {
          $list += `<li><a class="dlc-select-field--selected dlc-select-field__input-menu-li" tabindex="0" data-value="${$option.value}">${$option.value}</a></li>`;
        }
        else {
          $list += `<li><a class="dlc-select-field__input-menu-li" tabindex="0" data-value="${$option.value}">${$option.value}</a></li>`;
        }
      });

      $menuContainer.innerHTML = $list;
      $lis = $menuContainer.querySelectorAll('.dlc-select-field__input-menu-li');
      //  When clicking on the `li` or tabbing then hitting enter on the `li`
      // Clicking the 'li'
      $lis.forEach(($li) => {
        $li.addEventListener('click', (e) => {
          _dropDownEvent($select, $fauxSelectValue, e, $labelContainer, $menuContainer, $lis);
        });

        // tabbing then pressing enter
        $li.addEventListener('keydown', (e) => {
          if (e.which === 13 || e.keyCode === 13) {
            _dropDownEvent($select, $fauxSelectValue, e, $labelContainer, $menuContainer, $lis);
          }
        });
      });

      // When clicking the the container show the faux menu
      $labelContainer.addEventListener('click', () => {
        $menuContainer.style.display = 'block';
        if (!generalFun.detectViewWindow($labelContainer, $menuContainer)) {
          $menuContainer.style.marginTop = `-${$menuContainer.offsetHeight}`;
        }
        else {
          $menuContainer.style.marginTop = '-56px';
        }
      });

      window.addEventListener('scroll', () => {
        if (!generalFun.detectViewWindow($labelContainer, $menuContainer) && $menuContainer.style.display === 'block') {
          $menuContainer.style.marginTop = `-${$menuContainer.offsetHeight}px`;
        }
        else {
          $menuContainer.style.marginTop = '-56px';
        }
      });
    };

  this.SetUp = ($container, $select, index) => {
    if ($select === 'regular') {
      _regularSelects($container);
    }
    else {
      _customSelects($container, index);
    }
  };
}
