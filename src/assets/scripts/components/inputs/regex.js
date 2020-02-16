/* eslint-disable import/prefer-default-export */
/**
 * General Regex
 * This is just basic REGEX if you need something more specific please do it on the application side
 */

export function Regex(emailMessage = '', phoneMessage = '') {
  const
    // Error formating
    _errorLayout = (input, type, m = '') => {
      let message;
      const
        $container = input.target.parentNode.parentNode || input.parentNode.parentNode,
        pMessage = phoneMessage === '' ? 'Phone number should be (###) ###-####' : phoneMessage,
        eMessage = emailMessage === '' ? 'Emails should be email@email.com' : emailMessage;

      if (type === 'email') {
        message = eMessage;
      }
      else if (type === 'phone') {
        message = pMessage;
      }
      else {
        message = m;
      }

      if ($container.classList.contains('aic-o-input-helper')) {
        $container.classList.add('aic-o-input-helper--error');
        $container.querySelector('.aic-o-input-helper__helper').innerHTML = message;
      }
      else {
        $container.classList.add('aic-o-input-field--error');
      }
    },

    _testingRegex = (inputValue, type) => this.Formats(type).test(inputValue),

    // Remove error class when the regex is fullfilled
    _removeErrorClass = (input) => {
      const $container = input.target.parentNode.parentNode;

      if ($container.classList.contains('aic-o-input-helper')) {
        $container.classList.remove('aic-o-input-helper--error');
        $container.querySelector('.aic-o-input-helper__helper').innerHTML = '';
      }
      else {
        $container.classList.remove('aic-o-input-field--error');
      }
    };

  this.Error = (input, type, m = '') => {
    _errorLayout(input, type, m);
  };

  // library of regexs
  this.Formats = (type) => {
    let regex;

    if (type === 'email') {
      regex = /(.+)@(.+){2,}\.(.+){2,}/;
    }
    else if (type === 'tel') {
      regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; // eslint-disable-line
    }
    else if (type === 'cc' || type === 'bank') {
      regex = /^([0-9]{4})[\s]([0-9]{4})[\s]([0-9]{4})[\s]([0-9]{4})$/; // eslint-disable-line
    }
    else if (type === 'routing') {
      regex = /^([0-9]{3})[\s]([0-9]{3})[\s]([0-9]{3})$/; // eslint-disable-line
    }
    else if (type === 'money') {
      regex = /^(\$)[\s]([0-9]{1,4})[\.]([0-9]{2})$/; // eslint-disable-line
    }
    else {
      regex = /^[A-z0-9]*$/g;
    }
    return regex;
  };

  this.Reg = (input, type) => {
    if (!_testingRegex(input.target.value, type)) {
      _errorLayout(input, type);
    }
    else {
      _removeErrorClass(input);
    }
  };

  this.RemoveError = (input) => {
    _removeErrorClass(input);
  };
}
