// Demo file is for any scripts needed for the demo.

const
  $demoLinks = document.querySelectorAll('.demo-popup'),
  $exampleBlock = document.querySelectorAll('.demo-example-block'),
  createCode = ($container) => {
    $container.querySelector('.demo-example-code code').innerHTML = '';

    const
      $exampleLive = $container.querySelector('.demo-live-example'),
      $exampleCode = $container.querySelector('.demo-example-code'),
      $codeBlock = $exampleCode.querySelector('code'),
      stripedHTMLV1 = $exampleLive.innerHTML.replace(/</g, '&lt;'),
      stripedHTML = stripedHTMLV1.replace(/>/g, '&gt;');

    $codeBlock.innerHTML = stripedHTML;
  },
  demoPopup = (data) => {
    const params = `scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

    window.open(`template/${data}.html`, 'test', params);
  };

$demoLinks.forEach(($demoLink) => {
  $demoLink.addEventListener('click', (e) => {
    e.preventDefault();
    demoPopup(e.currentTarget.dataset.popupfile);
  });
});

$exampleBlock.forEach(($eb, index) => {
  createCode($eb, index);
});
