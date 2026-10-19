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
const contact = document.querySelector('.contact');
const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
const detailChapter = chapterLinks.find(link => link.hasAttribute('aria-current'))?.getAttribute('href').split('#')[1] || 'alkalmak';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = false;
let queuedFrame = 0;
let currentChapter = '';

function clamp(value) { return Math.max(0, Math.min(1,value)); }

function renderScroll() {
  queuedFrame = 0;
  if (document.hidden) return;
  const height = window.innerHeight;
  const heroBounds = hero?.getBoundingClientRect();
  const aboutBounds = about?.getBoundingClientRect();
  const offeringsBounds = offerings?.getBoundingClientRect();
  const packagesBounds = packages?.getBoundingClientRect();
  const contactBounds = contact?.getBoundingClientRect();
  const pageHeight = root.scrollHeight - height;
  root.style.setProperty('--page-progress',clamp(window.scrollY / Math.max(1,pageHeight)).toFixed(4));
  if (motionEnabled) hero.style.setProperty('--hero-progress',clamp(-heroBounds.top / Math.max(1,heroBounds.height)).toFixed(4));
  const atBottom = window.scrollY > 0 && window.scrollY >= pageHeight - 2;
  const chapter = !hero ? detailChapter : atBottom || contactBounds.top < height*.45 ? 'kapcsolat' : packagesBounds.top < height*.45 ? 'csomagok' : offeringsBounds.top < height*.45 ? 'alkalmak' : aboutBounds.top < height*.45 ? 'rolam' : 'kezdolap';
  if (chapter !== currentChapter) {
    currentChapter = chapter;
    chapterLinks.forEach(link => {
      if (link.getAttribute('href').split('#')[1] === chapter) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
}

function queueScroll() {
  if (!queuedFrame && !document.hidden) queuedFrame = window.requestAnimationFrame(renderScroll);
}

function refreshLayout() {
  const fontSize = parseFloat(window.getComputedStyle(root).fontSize);
  root.classList.toggle('large-text',fontSize > 20);
  motionEnabled = Boolean(hero) && !motionPreference.matches && window.innerHeight >= 740 && window.innerWidth >= 360 && fontSize <= 20;
  root.classList.toggle('has-motion',motionEnabled);
  if (!motionEnabled) hero?.style.removeProperty('--hero-progress');
  queueScroll();
}

function revealLinkedDetail() {
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
document.addEventListener('toggle',queueScroll,true);
if ('ResizeObserver' in window) new window.ResizeObserver(queueScroll).observe(document.body);
motionPreference.addEventListener('change',refreshLayout);
document.addEventListener('visibilitychange',() => {
  if (document.hidden) { window.cancelAnimationFrame(queuedFrame); queuedFrame = 0; }
  else queueScroll();
});
document.fonts?.ready.then(refreshLayout);
revealLinkedDetail();
refreshLayout();
