const template = document.createElement('template');
template.innerHTML = `
<header class="dll-grid dlc-header dlc-header--no-nav dlu-brand-logo-primary--background-color dlu-brand-logo-secondary--color">
  <div class="dll-containers__page">
    <div class="dll-grid__row dll-grid--align-center">
      <div class="dll-grid__col--10 dll-grid__col--6-sm dlc-header__logo">
      <a href="/" class="dlc-header__logo-container"></a>
      </div>
      <div class="dll-grid__col--2 dll-grid__col--6-sm dlc-header__nav dlu-text-align--right"></div>
    </div>
  </div>
</header>
`;

class DesignLibraryHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({'mode': 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$header = this._shadowRoot.querySelector('header');
    this.whiteHeaderLogo = '';
    this.redHeaderLogo = `<img src="/assets/img/mapfre_ins_white.png" alt="Mapfre Logo" class="dlc-header__logo-image--standard">
    `
  }

  _renderRedV1() {}

  _renderRedV2() {}

  _renderRedV3() {}

  _renderWhiteV1() {}

  _renderWhiteV2() {}

  _renderWhiteV3() {}

  _renderHeaderTypes() {

  }

}

window.customElements.define('dlc-header', DesignLibraryHeader);