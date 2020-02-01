/* eslint-disable import/prefer-default-export */
/**
 * File upload
 * need feature detection
 * users will need to place what the url and needed content is when they import this.
 */


export function FileUpload(selectParm = '', optionsParm = false) {
  // Public Options
  this.url = '';
  this.uploadObject = '';
  this.contentType = '';
  this.useDefaultUpload = true;
  this.duplicateErrorCopy = '';
  this.typeErrorCopy = '';

  const
    fileObject = {},
    // Prevent Defaults
    _preventDefault = (e) => {
      e.preventDefault();
      e.stopPropagation();
    },

    // Create Upload Object
    _createUploadObject = ($container, id) => {
      const optionsValue = [];

      if (optionsParm !== false) {
        $container.querySelectorAll('.dlc-file-upload__description').forEach((tag) => {
          optionsValue.push(tag.value);
        });
      }

      return {
        files: fileObject[id],
        fileDescription: optionsValue,
      };
    },

    // Layout
    _attachment = (files, $container) => {
      const
        $attachmentContainer = $container.querySelector('.dlc-file-upload__files'),
        $attachmentDiv = $attachmentContainer.querySelector('.dlc-file-upload__attachments'),
        reader = new FileReader(),
        _attachmentTemplate = (select, filesArray) => `
        <div class="dll-flex__row dlc-file-upload__file dlu-space--p-v8" id="${filesArray[0].name}">
          <div class="dll-flex__col--auto">
            <img src="../../../assets/img/file-icon.png" alt="file preview" class="dlc-file-upload__image-preview" id="preview-${filesArray[0].name}" height="24" width="18" />
          </div>
          <div class="dll-flex__col">
            <div class="dll-flex__row">
              <div class="dll-flex__col dlc-file-upload__file-name dlc-modal__button" data-modal="${filesArray[0].name}--modal" tabindex="0">${filesArray[0].name}</div>
            </div>
            ${select}
          </div>
          <div class="dll-flex__col--auto">
            <button class="dlc-button dlc-button--flat dlc-file-upload__remove dlu-space--p0" tabindex="0"><i class="material-icons-outlined">cancel</i></button>
          </div>
        </div>`,
        _modalTemplate = (imgSrc, id) => {
          const createDiv = document.createElement('div');
          createDiv.setAttribute('role', 'modal');
          createDiv.id = `${id}--modal`;
          createDiv.classList.add('dlc-modal', 'dlu-display--none');
          createDiv.innerHTML = `<div aria-label="modal" class="dlu-space--p-h16 dlc-modal__container dlu-background__color--white dlu-box-shadow--one">
          <header class="dlu-text--align-left dlc-modal__header">
          <h1>
          <i class="material-icons-outlined dlu-space--m-right4">help_outline</i>
          Preview Image 
          <button class="dlu-ripple dlu-ripple--active dlu-ripple--unbounded dlc-modal__close mdc-ripple-upgraded" data-modal="${id}--modal">
          <i class="material-icons-outlined">close</i>
          </button>
          </h1>
          </header>
          <div class="dlc-modal__content dlu-text--align-left">
          <p><img src="${imgSrc}" alt="preview image" class="dlc-image__img" /></p>
          </div>
          <footer class="dlc-modal__footer dll-grid dlu-text--align-left"></footer></div>
          <div class="dlc-modal__background" data-modal="${id}--modal"></div>`;

          return createDiv;
        },
        _optionsTemplate = option => `<option value="${option}">${option}</option>`,
        _selectTemplate = options => `
        <div class="dll-flex__row">
          <div class="dll-flex__col">
            <select class="dlc-file-upload__description">
              ${options}
            </select>
          </div>
        </div>`;

      if ($attachmentContainer.classList.contains('dlu-display--none')) {
        $attachmentContainer.classList.remove('dlu-display--none');
      }

      let
        $select = '',
        $options = '';

      if (optionsParm !== false) {
        optionsParm.forEach((option) => {
          $options += _optionsTemplate(option);
        });
      }

      if (selectParm) {
        $select = _selectTemplate($options);
      }

      $attachmentDiv.innerHTML += _attachmentTemplate($select, files);

      if (/image/.test(files[0].type)) {
        reader.onload = (e) => {
          const
            data = e.target.result,
            $img = document.getElementById(`preview-${files[0].name}`);
          $img.setAttribute('src', data);
          document.body.appendChild(_modalTemplate(data, files[0].name));
        };
        reader.readAsDataURL(files[0]);
      }
    },

    _checkDup = (files, id) => {
      const fileArray = fileObject[id];
      if (fileArray.length === 0 || !fileArray) {
        return false;
      }
      return fileArray.some(file => files[0].name === file.name);
    },

    _checkType = (file, otherTypes = '') => {
      const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/tiff', 'application/pdf'];

      if (otherTypes !== '') {
        fileTypes.push(otherTypes);
      }

      if (file[0].size > 5000000) {
        return false;
      }

      return fileTypes.some(fileType => file[0].type === fileType);
    },

    _upload = (files, $container) => {
      if (this.url !== '') {
        fetch(this.url, { // Your POST endpoint
          method: 'POST',
          headers: {
            'Content-Type': this.contentType,
          },
          body: files, // This is your file object
        }).then(
          response => response.json(), // if the response is a JSON object
        ).then(
          success => this.SuccessFunction($container), // eslint-disable-line
        ).catch(
          error => this.UpLoadError(error, $container), // Handle the error response object
        );
      }
    },

    _setUpUpload = (e, $container, inputType) => {
      const
        $fileContainer = $container.querySelector('.dlc-file-upload__drop-container'),
        files = inputType === 'native' ? [...e.target.files] : [...e.dataTransfer.files],
        dupCopy = this.duplicateErrorCopy === '' ? 'This is a duplicate file' : this.duplicateErrorCopy,
        typeCopy = this.typeErrorCopy === '' ? 'File type or size is not allowed' : this.typeErrorCopy,
        id = $container.id,
        fileArray = fileObject[id];

      if (_checkType(files, id) && !_checkDup(files, id)) {
        fileArray.push(files[0]);
        _attachment(files, $container);
        // upload(files, $container);
      }
      else {
        if (_checkDup(files, id)) {
          $container.querySelector('.dlc-file-upload__helper').innerHTML = dupCopy;
        }
        else {
          $container.querySelector('.dlc-file-upload__helper').innerHTML = typeCopy;
        }

        $fileContainer.classList.remove('dlc-file-upload--focus');
        $fileContainer.classList.add('dlc-file-upload--error');
        $container.querySelector('.dlc-file-upload__helper').classList.add('dlc-file-upload--error-helper');
        return;
      }

      $container.querySelector('.dlc-file-upload__helper').classList.remove('dlc-file-upload--error-helper');
      $container.querySelector('.dlc-file-upload__helper').innerHTML = 'Maximum size 5 MB per file. JPG, JPEG, PDF, TIFF, GIF and PNG';
      $fileContainer.classList.remove('dlc-file-upload--focus');
    },

    _checkForMobile = () => {
      const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
      if (isMobile) {
        document.querySelector('dlc-file-upload__desktop-copy').classList.add('dlu-display--none');
      }
    };

  // Public These can be used with other dev specific methods

  this.Remove = (id, $thisRow, $container) => {
    const containerId = $container.id;

    fileObject[containerId] = fileObject[containerId].filter(file => file.name !== id);
    $thisRow.remove();

    if (fileObject[containerId].length === 0) {
      $container.querySelector('.dlc-file-upload__files').classList.add('dlu-display--none');
    }
  };

  this.SetUp = ($container) => {
    const containerId = $container.id;

    _checkForMobile();

    fileObject[containerId] = [];

    ['dragenter', 'dragover', 'dragleave'].forEach((eventName) => {
      $container.addEventListener(eventName, (e) => {
        _preventDefault(e);
        $container.querySelector('.dlc-file-upload__drop-container').classList.remove('dlc-file-upload--error');
        $container.querySelector('.dlc-file-upload__drop-container').classList.add('dlc-file-upload--focus');
      }, false);
    });

    $container.querySelector('.dlc-file-upload__drop-container').addEventListener('drop', (e) => {
      _preventDefault(e);
      _setUpUpload(e, $container, 'drag');
    }, false);

    $container.querySelector('.dlc-button__file-label').addEventListener('change', (e) => {
      _setUpUpload(e, $container, 'native');
    });

    $container.querySelector('.dlc-file-upload__upload-button').addEventListener('click', () => {
      if (this.useDefaultUpload === true) {
        // This is if there needs to be a different object format, the developer can make it.
        const uploadObject = this.uploadObject === '' ? _createUploadObject($container, $container.id) : this.uploadObject;
        _upload(uploadObject, $container);
      }
    });
  };

  this.SuccessFunction = ($container) => {
    $container.querySelectorAll('.dlc-file-upload__attachments .dll-flex__row').forEach(($fileRow) => {
      this.Remove($fileRow.id, $fileRow, $container);
    });
  };

  // made this public just in case if the upload function will need more visibility.
  this.UpLoadError = (e, $container) => {
    $container.querySelector('.dlc-file-upload__drop-container').classList.add('dlc-file-upload--error');
    $container.querySelector('.dlc-file-upload__helper').classList.add('dlu-states-error--color');
    $container.querySelector('.dlc-file-upload__helper').innerHTML = e;
  };
}
