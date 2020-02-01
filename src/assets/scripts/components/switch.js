/**
 * All other Form inputs
 */


const
  $switchInputs = document.querySelectorAll('.dlc-switch__native-control');
  // $radioInputs = document.querySelectorAll('.dlc-radio-field__native-control');

$switchInputs.forEach(($switchInput) => {
  $switchInput.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.parentElement.classList.toggle('dlc-switch--checked');
  });
});
