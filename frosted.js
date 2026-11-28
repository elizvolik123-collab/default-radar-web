'use strict';
(() => {
  const detail = document.getElementById('detail');
  const dialogue = document.getElementById('dialogue');

  // Filters: show the choice at once and keep the scroll position and chart size while the card re-renders.
  let lock = null;
  const release = () => {
    if (!lock) return;
    const {y, sized, timer} = lock;
    clearTimeout(timer);
    lock = null;
    requestAnimationFrame(() => {
      if (Math.abs(scrollY - y) > 2) scrollTo({top: y, behavior: 'instant'});
      detail.style.minHeight = '';
      sized.forEach(el => { el.style.minHeight = ''; });
      detail.classList.remove('frost-busy');
    });
  };
  document.addEventListener('click', e => {
    const button = e.target.closest('#market .seg button, #market .timeline button, #market [data-period]');
    if (!button || button.disabled || !detail) return;
    const group = button.closest('.seg, .timeline') || button.parentElement;
    group.querySelectorAll('button').forEach(b => {
      const on = b === button;
      b.classList.toggle('sel', on);
      if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', on);
    });
    if (lock) clearTimeout(lock.timer);
    const sized = [...detail.querySelectorAll('.chart, statement-chart, [class*=exchange-chart], .panel:has(canvas)')];
    sized.forEach(el => { el.style.minHeight = el.offsetHeight + 'px'; });
    detail.style.minHeight = detail.offsetHeight + 'px';
    detail.classList.add('frost-busy');
    lock = {y: scrollY, sized, timer: setTimeout(release, 4000)};
  }, true);
  if (detail) new MutationObserver(() => { if (lock) release(); }).observe(detail, {childList: true});

  // Assistant: animate only messages that were not on screen before the re-render.
  let shown = 0, key = '';
  if (dialogue) new MutationObserver(() => {
    const bubbles = dialogue.querySelectorAll('.bubble');
    const current = location.search.replace(/[?&](tab|section)=[^&]*/g, '');
    if (current !== key || bubbles.length < shown) { key = current; shown = bubbles.length; return; }
    for (let i = shown; i < bubbles.length; i++) bubbles[i].classList.add('frost-new');
    shown = bubbles.length;
  }).observe(dialogue, {childList: true});
})();
