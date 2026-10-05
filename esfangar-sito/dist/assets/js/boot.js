(function (d) {
  var h = d.documentElement;
  h.classList.add('js');
  var motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (motion) h.classList.add('motion');
  // preloader: first page of the session only
  try {
    if (motion && !sessionStorage.getItem('esf-visited')) { h.classList.add('is-loading'); sessionStorage.setItem('esf-visited', '1'); }
  } catch (e) { /* storage blocked: skip the preloader */ }
})(document);
