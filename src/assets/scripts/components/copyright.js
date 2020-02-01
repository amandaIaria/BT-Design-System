/**
 * Get the current year for the footer.
 */

const
  $copyrights = document.querySelectorAll('.dlc-footer__copyright'),
  currentYear = new Date().getFullYear();

$copyrights.forEach(($copyright) => {
  $copyright.querySelector('.dlc-footer__year').innerText += currentYear; // eslint-disable-line no-param-reassign
});
