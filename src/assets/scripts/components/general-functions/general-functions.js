//
// General Functions
//

export default function GeneralFunctions() {
  this.detectViewWindow = (parent, popup) => {
    const
      $parent = parent.getBoundingClientRect(),
      $popup = popup.getBoundingClientRect();
    return $parent.bottom <= ((window.innerHeight - $popup.height) || (document.documentElement.clientHeight - $popup.height));
  };

  this.$ = (selector, context = document) => {
    let c;
    if (/object HTML.*Element/.test(selector.toString())) {
      throw new Error('[utils/dom/$] Passed dom element instead of selector (string).');
    }
    if (context.querySelectorAll(selector).length > 0) {
      c = [...context.querySelectorAll(selector)];
    }
    else {
      c = context.querySelector(selector);
    }
    return c;
  };
}

// const $ = (s, p = document) => {
//   if(/object HTML.*Element/.test(s.toString())) {
//     throw new Error('[utils/dom/$] Passed dom element instead of selector (string).');
//   }
//
//   return Array.from(p.querySelectorAll(s))
// };
