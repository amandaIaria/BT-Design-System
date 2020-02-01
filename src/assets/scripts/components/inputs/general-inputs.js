/* eslint-disable import/prefer-default-export */
/**
 * Input Masking
 */

import Inputmask from 'inputmask';
import { Regex } from './regex';

export function Inputs() {
  const
    regex = new Regex(),
    _changeDateFormat = (value) => {
      const valueArray = value.split('-');
      return `${valueArray[1]}/${valueArray[2]}/${valueArray[0]}`;
    },

    _eventMethod = (e, type) => {
      const
        $input = e.srcElement.parentNode.querySelector('input') || e.srcElement.parentNode.querySelector('textarea'),
        $thisLabel = e.srcElement.parentNode.classList;
        // keeping this for future endeavors
        // focusMaskCheck = (input) => {
        //   if (input.value === input.dataset.mask) {
        //     return true;
        //   }
        //   return false;
        // };

      switch (e.type) {
        case 'click':
          $thisLabel.add('dlc-input-field--focused');
          break;
        case 'focusin':
          $thisLabel.add('dlc-input-field--focused');
          break;
        case 'focusout':
          if ($input.value === '' && $thisLabel.contains('dlc-input-field--focused') && type !== 'date') {
            $thisLabel.remove('dlc-input-field--focused');
          }
          else {
            if (e.target.type === 'tel') {
              if (e.target.classList.contains('dlc-input-field__routing')) {
                regex.Reg(e, 'routing');
              }
              if (e.target.classList.contains('dlc-input-field__cc')) {
                regex.Reg(e, 'cc');
              }
              if (e.target.classList.contains('dlc-input-field__bank')) {
                regex.Reg(e, 'bank');
              }
              if (e.target.classList.contains('dlc-input-field__phone')) {
                regex.Reg(e, e.target.type);
              }
            }
            if (e.target.type === 'email') {
              regex.Reg(e, e.target.type);
            }
          }
          break;
        default:
          break;
      }
    },

    // Not using this at the moment. Right now we are using the Masking Library
    /* inputMask = ($container, input) => {
      // while typing

      const
        customMaskInput = input.dataset.mask.split('') || '',

        masks = {
          tel: [10, /(\d{3})(\d{3})(\d{4})/, '($1) $2-$3', /\D/g],
          creditCard: [19, /(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4', /\D/g],
        },

        customMask = (maskT, maskA) => {
          masks[maskT] = maskA;
        },

        inputMaskCreate = () => {
          const $nativeInput = document.createElement('input');
          $nativeInput.classList.add('dlc-input-field__native');
          $nativeInput.setAttribute('type', 'phone');
          $nativeInput.setAttribute('tabindex', '-1');
          $container.appendChild($nativeInput);
        },

        inputMasking = (value, reg, mask) => value.replace(reg, mask),

        inputMaskDestroy = (value, reg, max) => value.replace(reg, '').substring(0, max),

        inputMaskEvent = (e) => {
          const
            inputType = input.dataset.input === '' ? input.dataset.input : input.type,
            usedMask = maskType !== '' ? customMask(maskType, maskArray) : masks[inputType];

          if (e.target.parentNode.classList.contains('dljs-input-field--mask')) {
            const $hiddenValueInput = e.target.parentNode.querySelector('.dlc-input-field__native');
            $hiddenValueInput.value = inputMaskDestroy(e.target.value, usedMask[3], usedMask[0]);
            e.target.value = inputMasking($hiddenValueInput.value, usedMask[1], usedMask[2]);
          }
        },

        setUpPlaceholder = (e) => {
          e.target.placeholder = e.type === 'focus' ? customMaskInput.join('') : '';
        };

      inputMaskCreate();
      ['focus', 'focusout'].forEach(event => input.addEventListener(event, e => setUpPlaceholder(e)));
      input.addEventListener('keyup', e => inputMaskEvent(e));
    }, */

    _password = (e) => {
      const
        $button = e.currentTarget,
        $buttonIcon = $button.querySelector('i'),
        $textboxContainer = $button.parentNode,
        $textbox = $textboxContainer.querySelector('input');

      if ($textboxContainer.classList.contains('dljs-input-field--convert')) {
        $buttonIcon.textContent = 'visibility';
        $textboxContainer.classList.remove('dljs-input-field--convert');
        $textbox.setAttribute('type', 'password');
      }
      else {
        $buttonIcon.textContent = 'visibility_off';
        $textboxContainer.classList.add('dljs-input-field--convert');
        $textbox.setAttribute('type', 'text');
      }
    },

    _required = (e) => {
      if (e.target.value === '' && e.target.hasAttribute('required')) {
        regex.Error(e, e.target.type, 'This is a required field');
      }
      if (e.target.value !== '' && e.target.hasAttribute('required')
        && e.target.parentNode.parentNode.classList.contains('dlc-input-helper--error')) {
        regex.RemoveError(e);
      }
    },
    /* eslint-disable */
    _textareaAutoGrow = (textarea) => {
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = textarea.scrollHeight + "px";
      }
    };
    /* eslint-enable */

  this.SetUp = ($container, type) => {
    const
      $input = $container.querySelector('.dlc-input-field__input'),
      bankMask = new Inputmask({
        mask: '9999 9999 9999 9999',
        // regex: reg.Formats('bank'),
        showMaskOnHover: false,
      }),
      bankRoutingMask = new Inputmask({
        mask: '999 999 999',
        // regex: reg.Formats('routing'),
        showMaskOnHover: false,
      }),
      ccMask = new Inputmask({
        mask: '9999 9999 9999 9999',
        // regex: reg.Formats('cc'),
        showMaskOnHover: false,
      }),
      emailMask = new Inputmask({
        // alias: 'email',
        mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
        // regex: reg.Formats('email'),
        showMaskOnHover: false,
      }),
      moneyMask = new Inputmask({
        alias: 'currency',
        // $ 99{1,20}.99
        rightAlign: false,
        showMaskOnHover: false,
      }),
      phoneMask = new Inputmask({
        mask: '(999) 999-9999',
        // regex: reg.Formats('tel'),
        showMaskOnHover: false,
      });

    if (type !== 'file') {
      ['click', 'focusin', 'focusout'].forEach((event) => {
        $container.addEventListener(event, (e) => {
          _eventMethod(e, type);
          _required(e);
        });
      });
    }

    if ($container.querySelector('.dlc-input-field__textarea') !== null) {
      $container.querySelector('.dlc-input-field__textarea').addEventListener('keyup', (e) => {
        _textareaAutoGrow(e.currentTarget);
      });
    }

    if ($input !== null && $input.classList.contains('dlc-input-field__money')) {
      $container.classList.add('dlc-input-field--focused');
    }

    if ($container.classList.contains('dljs-input-field--mask') && $input !== null) {
      if ($input.classList.contains('dlc-input-field__email')) {
        emailMask.mask($container.querySelector('.dlc-input-field__email'));
      }

      if ($input.classList.contains('dlc-input-field__phone')) {
        phoneMask.mask($container.querySelector('.dlc-input-field__phone'));
      }

      if ($input.classList.contains('dlc-input-field__cc')) {
        ccMask.mask($container.querySelector('.dlc-input-field__cc'));
      }

      if ($input.classList.contains('dlc-input-field__routing')) {
        bankRoutingMask.mask($container.querySelector('.dlc-input-field__routing'));
      }

      if ($input.classList.contains('dlc-input-field__bank')) {
        bankMask.mask($container.querySelector('.dlc-input-field__bank'));
      }

      if ($input.classList.contains('dlc-input-field__money')) {
        moneyMask.mask($container.querySelector('.dlc-input-field__money'));
      }
    }

    if ($container.querySelector('input') !== null && $container.querySelector('input').value !== '' && !$container.classList.contains('dlc-input-field__date-container')) {
      $container.classList.add('dlc-input-field--focused');
    }

    if ($container.querySelector('textarea') !== null && $container.querySelector('textarea').value !== '' && !$container.classList.contains('dlc-input-field__date-container')) {
      $container.classList.add('dlc-input-field--focused');
      _textareaAutoGrow($container.querySelector('textarea'));
    }

    if ($container.querySelector('input') !== null && $container.querySelector('input').value !== '' && $container.classList.contains('dlc-input-field__date-container')) {
      $container.classList.add('dlc-input-field--focused');
      $container.querySelector('.dlc-input-field__input').innerHTML = _changeDateFormat($container.querySelector('.dlc-input-field__native').value);
    }

    if (type === 'password') {
      $container.querySelector('.dlc-button__password').addEventListener('click', (e) => {
        _password(e);
      });
    }
  };
}
