const root = document.documentElement;
const homeSection = document.body.dataset.homeSection;
if (homeSection) {
  const homeUrl = document.querySelector('.not-found a').getAttribute('href').split('#')[0];
  window.location.replace(`${homeUrl}${window.location.hash || `#${homeSection}`}`);
}
const hero = document.querySelector('.hero');
const about = document.querySelector('.about');
const offerings = document.querySelector('.offerings');
const packages = document.querySelector('.packages');
const faq = document.querySelector('.faq');
const contact = document.querySelector('.contact');
const chapterNav = document.querySelector('.chapter-nav');
const chapterToggle = document.querySelector('.chapter-toggle');
if (chapterToggle) root.classList.toggle('nav-ready',true);
const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
const detailChapter = chapterLinks.find(link => link.hasAttribute('aria-current'))?.getAttribute('href').split('#')[1] || 'alkalmak';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = false;
let queuedFrame = 0;
let currentChapter = '';
let navigationTarget = '';
let navigationNeedsLayout = true;

function clamp(value) { return Math.max(0, Math.min(1,value)); }

function renderScroll() {
  queuedFrame = 0;
  if (document.hidden) return;
  const height = window.innerHeight;
  const heroBounds = hero?.getBoundingClientRect();
  const aboutBounds = about?.getBoundingClientRect();
  const offeringsBounds = offerings?.getBoundingClientRect();
  const packagesBounds = packages?.getBoundingClientRect();
  const faqBounds = faq?.getBoundingClientRect();
  const contactBounds = contact?.getBoundingClientRect();
  const pageHeight = root.scrollHeight - height;
  root.style.setProperty('--page-progress',clamp(window.scrollY / Math.max(1,pageHeight)).toFixed(4));
  if (motionEnabled) hero.style.setProperty('--hero-progress',clamp(-heroBounds.top / Math.max(1,heroBounds.height)).toFixed(4));
  const atBottom = window.scrollY > 0 && window.scrollY >= pageHeight - 2;
  const visibleChapter = !hero ? detailChapter : atBottom || contactBounds.top < height*.45 ? 'kapcsolat' : faqBounds?.top < height*.45 ? 'gyik' : packagesBounds.top < height*.45 ? 'csomagok' : offeringsBounds.top < height*.45 ? 'alkalmak' : aboutBounds.top < height*.45 ? 'rolam' : 'kezdolap';
  if (visibleChapter === navigationTarget) navigationTarget = '';
  const chapter = navigationTarget || visibleChapter;
  if (chapter !== currentChapter || navigationNeedsLayout) {
    currentChapter = chapter;
    navigationNeedsLayout = false;
    chapterLinks.forEach(link => {
      if (link.getAttribute('href').split('#')[1] === chapter) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    const currentLink = chapterLinks.find(link => link.hasAttribute('aria-current'));
    if (chapterNav && currentLink) {
      chapterNav.style.setProperty('--nav-x',`${currentLink.offsetLeft}px`);
      chapterNav.style.setProperty('--nav-y',`${currentLink.offsetTop}px`);
      chapterNav.style.setProperty('--nav-width',`${currentLink.offsetWidth}px`);
      chapterNav.style.setProperty('--nav-height',`${currentLink.offsetHeight}px`);
      chapterNav.classList.add('has-indicator');
    } else chapterNav?.classList.remove('has-indicator');
  }
}

function queueScroll() {
  if (!queuedFrame && !document.hidden) queuedFrame = window.requestAnimationFrame(renderScroll);
}

function releaseNavigationTarget() {
  if (!navigationTarget) return;
  navigationTarget = '';
  queueScroll();
}

function closeChapterMenu(restoreFocus = false) {
  if (chapterToggle?.getAttribute('aria-expanded') !== 'true') return;
  chapterToggle.setAttribute('aria-expanded','false');
  chapterNav.classList.remove('is-open');
  if (restoreFocus) chapterToggle.focus({ preventScroll:true });
}

function refreshLayout() {
  chapterNav?.classList.remove('has-menu-motion');
  navigationNeedsLayout = true;
  const fontSize = parseFloat(window.getComputedStyle(root).fontSize);
  root.classList.toggle('large-text',fontSize > 20);
  if (window.innerWidth >= 600 || fontSize > 20) closeChapterMenu();
  motionEnabled = Boolean(hero) && !motionPreference.matches && window.innerHeight >= 740 && window.innerWidth >= 360 && fontSize <= 20;
  root.classList.toggle('has-motion',motionEnabled);
  if (!motionEnabled) hero?.style.removeProperty('--hero-progress');
  queueScroll();
}

function revealLinkedDetail() {
  if (navigationTarget && window.location.hash !== `#${navigationTarget}`) releaseNavigationTarget();
  let id;
  try { id = decodeURIComponent(window.location.hash.slice(1)); }
  catch { return; }
  const target = document.getElementById(id);
  const detail = target?.closest('details');
  if (detail && !detail.open) {
    root.classList.toggle('is-disclosing',false);
    detail.open = true;
    target.scrollIntoView({ block:'start',behavior:'instant' });
  }
  queueScroll();
}

window.addEventListener('scroll',queueScroll,{ passive:true });
window.addEventListener('resize',refreshLayout);
window.addEventListener('hashchange',revealLinkedDetail);
window.addEventListener('pageshow',() => { revealLinkedDetail(); refreshLayout(); });
document.addEventListener('click',event => {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (chapterToggle && event.target.closest('.chapter-toggle')) {
    chapterNav.classList.add('has-menu-motion');
    if (chapterToggle.getAttribute('aria-expanded') === 'true') closeChapterMenu();
    else {
      chapterToggle.setAttribute('aria-expanded','true');
      chapterNav.classList.add('is-open');
    }
    return;
  }
  if (chapterToggle && !event.target.closest('.chapter-nav')) closeChapterMenu();
  const link = event.target.closest('.chapter-nav a[href^="#"]');
  if (!link) return;
  navigationTarget = link.getAttribute('href').slice(1);
  if (chapterToggle?.getAttribute('aria-expanded') === 'true') {
    closeChapterMenu();
    document.getElementById(navigationTarget)?.focus({ preventScroll:true });
  }
  queueScroll();
});
for (const event of ['wheel','touchmove','pointerdown','keydown']) {
  document.addEventListener(event,input => {
    releaseNavigationTarget();
    if (input?.key === 'Escape') closeChapterMenu(true);
  },{ passive:true });
}
document.addEventListener('focusin',event => {
  if (chapterToggle && !event.target.closest('.chapter-nav, .chapter-toggle')) closeChapterMenu();
});
document.addEventListener('toggle',queueScroll,true);
if ('ResizeObserver' in window) new window.ResizeObserver(queueScroll).observe(document.body);
motionPreference.addEventListener('change',refreshLayout);
document.addEventListener('visibilitychange',() => {
  if (document.hidden) { window.cancelAnimationFrame(queuedFrame); queuedFrame = 0; navigationTarget = ''; }
  else queueScroll();
});
document.fonts?.ready.then(refreshLayout);
revealLinkedDetail();
refreshLayout();
