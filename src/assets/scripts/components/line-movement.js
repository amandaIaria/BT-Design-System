/**
 * This will add the approprate classes on click
 */

const
  $animateContainers = document.querySelectorAll('.dlu-line-movement__container');

$animateContainers.forEach(($animateContainer) => {
  $animateContainer.addEventListener('click', (e) => {
    document.querySelector('.dlc-tab--active').classList.remove('dlc-tab--active');
    document.querySelector('.dlu-line-movement--active').classList.remove('dlu-line-movement--active');

    e.currentTarget.classList.add('dlc-tab--active');
    e.currentTarget.querySelector('.dlu-line-movement').classList.add('dlu-line-movement--active');
  });
});
