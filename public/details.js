// Keep native details semantics and the selected heading in place during motion.
let disclosureFrame = 0;

function stopDisclosureAnchor() {
  window.cancelAnimationFrame(disclosureFrame);
  disclosureFrame = 0;
  document.documentElement.classList.remove('is-disclosing');
}

document.addEventListener('click',event => {
  if (event.defaultPrevented || event.button !== 0) return;
  const link = event.target.closest('a[href^="#"]');
  if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    stopDisclosureAnchor();
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    const linkedDetail = target?.closest('details');
    if (linkedDetail) linkedDetail.open = true;
    return;
  }
  const summary = event.target.closest('.disclosure > summary');
  if (!summary) return;
  window.cancelAnimationFrame(disclosureFrame);
  const detail = summary.parentElement;
  let top = summary.getBoundingClientRect().top + window.scrollY;
  document.documentElement.classList.add('is-disclosing');
  event.preventDefault();
  detail.open = !detail.open;
  summary.focus({ preventScroll:true });
  const duration = (parseFloat(window.getComputedStyle(detail,'::details-content').transitionDuration) || 0) * 1000;
  const started = window.performance.now();
  // Compensate layout movement only; wheel/touch scrolling remains independent.
  function keepHeadingPosition(now = started) {
    const nextTop = summary.getBoundingClientRect().top + window.scrollY;
    const shift = nextTop - top;
    if (shift) window.scrollBy({ top:shift,behavior:'instant' });
    top = nextTop;
    if (!document.hidden && now - started < duration) {
      disclosureFrame = window.requestAnimationFrame(keepHeadingPosition);
    } else stopDisclosureAnchor();
  }
  keepHeadingPosition();
});

window.addEventListener('hashchange',stopDisclosureAnchor);
document.addEventListener('visibilitychange',() => {
  if (document.hidden) stopDisclosureAnchor();
});

