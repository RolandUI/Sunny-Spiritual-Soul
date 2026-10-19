// Keep native details semantics and align newly opened headings during motion.
let disclosureFrame = 0;
let disclosureScrollInterrupted = false;

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
  const viewportTop = summary.getBoundingClientRect().top;
  let top = viewportTop + window.scrollY;
  const opening = !detail.open;
  const inset = parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const distance = opening ? viewportTop - inset : 0;
  let scrolled = 0;
  disclosureScrollInterrupted = false;
  document.documentElement.classList.add('is-disclosing');
  event.preventDefault();
  detail.open = opening;
  summary.focus({ preventScroll:true });
  const duration = (parseFloat(window.getComputedStyle(detail,'::details-content').transitionDuration) || 0) * 1000;
  const started = window.performance.now();
  // Follow collapsing siblings while easing the opened heading to the top.
  // Manual input stops alignment, but layout compensation preserves its position.
  function keepHeadingPosition(now = started) {
    const nextTop = summary.getBoundingClientRect().top + window.scrollY;
    const progress = duration ? Math.min(1,(now - started) / duration) : 1;
    const nextScrolled = disclosureScrollInterrupted ? scrolled : distance * (1 - (1 - progress) ** 3);
    const shift = nextTop - top + nextScrolled - scrolled;
    if (shift) window.scrollBy({ top:shift,behavior:'instant' });
    top = nextTop;
    scrolled = nextScrolled;
    if (!document.hidden && now - started < duration) {
      disclosureFrame = window.requestAnimationFrame(keepHeadingPosition);
    } else stopDisclosureAnchor();
  }
  keepHeadingPosition();
});

for (const type of ['wheel','touchmove','pointerdown','keydown']) {
  document.addEventListener(type,() => { disclosureScrollInterrupted = true; },{ passive:true });
}
window.addEventListener('hashchange',stopDisclosureAnchor);
document.addEventListener('visibilitychange',() => {
  if (document.hidden) stopDisclosureAnchor();
});

