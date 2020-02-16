/**
 * Get the current year for the footer.
 */

const
  $copyrights = document.querySelectorAll('.aic-o-footer__copyright'),
  currentYear = new Date().getFullYear();

$copyrights.forEach(($copyright) => {
  $copyright.querySelector('.aic-o-footer__year').innerText += currentYear; // eslint-disable-line no-param-reassign
});
