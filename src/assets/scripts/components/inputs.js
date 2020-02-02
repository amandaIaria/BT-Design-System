/**
 * Inputs Event Handlers
 */

import { Buttons } from './inputs/button';
import { DateInput } from './inputs/date';
import { FileUpload } from './inputs/file-upload';
import { Inputs } from './inputs/general-inputs';
import { Selects } from './inputs/selects';

const
  $options = document.getElementById('example-option2'),
  $buttons = document.querySelectorAll('.aic-m-button'),
  $dateContainers = document.querySelectorAll('.aijs-m-input-field--custom-date-picker'),
  $filUploadContainers = document.querySelectorAll('.aic-m-file-upload'),
  $fileUploadButtons = document.querySelectorAll('label.aic-m-file-upload__upload-button'),
  $inputContainers = document.querySelectorAll('.aic-m-input-field__input-container'),
  $txtContainers = document.querySelectorAll('.aic-m-input-field__textarea-container'),
  $selectContainers = document.querySelectorAll('.aic-m-select-field__input-container'),
  $customSelectContainers = document.querySelectorAll('.aic-m-select-field--menu'),
  $buttonGroups = document.querySelectorAll('.aic-m-button-group'),
  buttonClass = new Buttons(),
  dateClass = new DateInput(),
  generalInput = new Inputs(),
  selects = new Selects();

let
  fileUpload,
  fileUploadV2;

$buttons.forEach(($button) => {
  $button.addEventListener('click', () => {
    buttonClass.Loader($button, 'add');
    setTimeout(() => {
      buttonClass.Loader($button, 'remove');
    }, 2000);
  });
});

$buttonGroups.forEach(($buttonGroup) => {
  const $radioButtons = $buttonGroup.querySelectorAll('.aic-m-button-group__button');

  $radioButtons.forEach(($radioButton) => {
    // On Load
    if ($radioButton.querySelector('.aic-m-button-group__native').checked) {
      $radioButton.classList.add('aic-m-button-group--checked');
    }
    else {
      $radioButton.classList.remove('aic-m-button-group--checked');
    }
    $radioButton.addEventListener('click', (e) => {
      $radioButtons.forEach(($rb) => {
        $rb.classList.remove('aic-m-button-group--checked');
      });
      e.currentTarget.classList.add('aic-m-button-group--checked');
    });
  });
});

$dateContainers.forEach(($dateContainer) => {
  dateClass.SetUp($dateContainer);
});

$fileUploadButtons.forEach(($fileUploadButton) => {
  $fileUploadButton.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      $fileUploadButton.querySelector('.aic-m-button__file.aic-m-button__input').click();
    }
  });
});

$filUploadContainers.forEach(($filUploadContainer) => {
  if ($filUploadContainer.id === $options.id) {
    fileUploadV2 = new FileUpload(true, ['test1', 'test2']);
    fileUploadV2.SetUp($options);
  }
  else {
    fileUpload = new FileUpload();
    fileUpload.SetUp($filUploadContainer);
  }
});


$inputContainers.forEach(($inputContainer) => {
  const $type = $inputContainer.querySelector('input').getAttribute('type');
  // making sure all of the additions don't overlay each other
  generalInput.SetUp($inputContainer, $type);
});

$txtContainers.forEach(($txtContainer) => {
  generalInput.SetUp($txtContainer, 'textarea');
});

$customSelectContainers.forEach(($customSelectContainer, index) => {
  selects.SetUp($customSelectContainer, 'custom', index);
});

// Regular Selects
$selectContainers.forEach(($selectContainer) => {
  selects.SetUp($selectContainer, 'regular', null);
});


// dynamically created buttons event trigger
document.querySelector('body').addEventListener('click', (e) => {
  let
    $thisContainer,
    id;

  if (e.target && (e.target.nodeName === 'BUTTON' || e.target.parentNode.nodeName === 'BUTTON') && (e.target.classList.contains('dljs-button--to-top') || e.target.parentNode.classList.contains('dljs-button--to-top'))) {
    buttonClass.ToTop();
  }

  // Calendar
  if (e.target && e.target.nodeName === 'BUTTON' && e.target.classList.contains('aic-m-input-field__calendar-day')) {
    $thisContainer = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    $thisContainer.querySelectorAll('.aic-m-input-field__calendar-day').forEach(($button) => {
      $button.classList.remove('aic-m-input-field__calendar-day--selected');
    });
    dateClass.GetValue(e);
  }

  if (e.target && e.target.nodeName === 'BUTTON' && e.target.classList.contains('aic-m-input-field__calendar-week')) {
    $thisContainer = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    $thisContainer.querySelectorAll('.aic-m-input-field__calendar-row').forEach(($row) => {
      $row.classList.remove('aic-m-input-field__calendar-row--selected');
    });
    dateClass.GetValue(e);
  }

  if (e.target && e.target.classList.contains('aic-m-input-field__calendar-bg')) {
    dateClass.Close();
  }

  // File Upload
  if (e.target && e.target.parentNode.classList.contains('aic-m-file-upload__remove')) {
    $thisContainer = e.target.parentNode.parentNode.parentNode;
    id = $thisContainer.id;

    if ($thisContainer.parentNode.parentNode.parentNode.id === $options.id) {
      fileUploadV2.Remove(id, $thisContainer, $thisContainer.parentNode.parentNode.parentNode);
    }
    else {
      fileUpload.Remove(id, $thisContainer, $thisContainer.parentNode.parentNode.parentNode);
    }
  }
}, false);
