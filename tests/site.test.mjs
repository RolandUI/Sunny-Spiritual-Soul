import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const app = await readFile(new URL('../public/app.js',import.meta.url),'utf8');

function setupPage({ reducedMotion = false, height = 900, width = 1440, fontSize = 16, detailPage = false, hash = '', chapter = 'alkalmak', homeSection, basePath = '' } = {}) {
  const element = (top = 0, height = 900, href = '') => ({
    bounds: { top,height }, attributes: new Map([['href',href]]), properties: new Map(),
    getBoundingClientRect() { return this.bounds; },
    getAttribute(name) { return this.attributes.get(name) ?? null; },
    hasAttribute(name) { return this.attributes.has(name); },
    setAttribute(name,value) { this.attributes.set(name,value); },
    removeAttribute(name) { this.attributes.delete(name); },
    get style() { return {
      setProperty: (name,value) => this.properties.set(name,value),
      removeProperty: name => this.properties.delete(name),
    }; },
  });
  const classes = new Set();
  const root = Object.assign(element(),{ scrollHeight: 4000,classList: { toggle: (name,active) => active ? classes.add(name) : classes.delete(name) } });
  const sections = detailPage ? {} : { '.hero': element(0),'.about': element(900),'.offerings': element(1600,1000),'.packages': element(2600,700),'.contact': element(3300,700) };
  const links = ['kezdolap','rolam','alkalmak','csomagok','kapcsolat'].map(id => element(0,44,`${detailPage ? '/' : ''}#${id}`));
  if (detailPage) links.find(link => link.getAttribute('href') === `/#${chapter}`).setAttribute('aria-current','location');
  const details = Object.fromEntries(['reiki','csoportos-hangfurdo','folyamat'].map(id => [id,{
    tagName: 'DETAILS',open: false,scrollCount: 0,
    closest() { return this; },scrollIntoView() { this.scrollCount++; },
  }]));
  details.hangfurdok = { tagName: 'SECTION',closest: () => null };
  details.ritmus = { tagName: 'H4',closest: () => details.folyamat,scrollCount: 0,scrollIntoView() { this.scrollCount++; } };
  const events = new Map(); const frames = new Map(); let frameId = 0; let preferenceChange;
  const preference = { matches: reducedMotion,addEventListener: (_,listener) => { preferenceChange = listener; } };
  const window = {
    innerHeight: height,innerWidth: width,scrollY: 0,location: { hash,replace(url) { this.replaced = url; } },
    matchMedia: () => preference,
    getComputedStyle: () => ({ fontSize: `${fontSize}px` }),
    addEventListener: (name,listener) => events.set(name,listener),
    requestAnimationFrame: callback => { frames.set(++frameId,callback); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    ResizeObserver: class {
      constructor(callback) { events.set('layoutresize',callback); }
      observe() {}
    },
  };
  const document = {
    documentElement: root,body: { dataset: { homeSection } },hidden: false,
    querySelector: selector => selector === '.not-found a' ? element(0,44,`${basePath}/#${homeSection}`) : sections[selector],
    querySelectorAll: selector => selector === '.chapter-nav a' ? links : [],
    getElementById: id => details[id] ?? null,
    addEventListener: (name,listener) => events.set(name,listener),
  };
  runInNewContext(app,{ window,document });
  return {
    classes,root,sections,links,details,frames,window,document,
    fire: name => events.get(name)(),
    setReducedMotion(value) { preference.matches = value; preferenceChange(); },
    flush() { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()); },
    active() { return links.filter(link => link.getAttribute('aria-current') === 'location').map(link => link.getAttribute('href')); },
  };
}

test('minden belső hivatkozás és helyi erőforrás létezik', async () => {
  for (const file of ['index.html','404.html','szolgaltatasok/index.html','csomagok/index.html']) {
    const html = await readFile(new URL(`../public/${file}`,import.meta.url),'utf8');
    const idList = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    const ids = new Set(idList);
    assert.equal(ids.size,idList.length,`Duplicate id in ${file}`);
    for (const [,value] of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
      assert.notEqual(value,'');
      assert.notEqual(value,'#');
      if (value.startsWith('#')) assert.ok(ids.has(value.slice(1)),`Missing target: ${value}`);
      if (value.startsWith('/')) {
        const target = new URL(value,'https://site.test');
        const pathname = target.pathname.endsWith('/') ? `${target.pathname}index.html` : target.pathname;
        const local = new URL(`../public${pathname}`,import.meta.url);
        await access(local);
        if (target.hash) {
          const destination = await readFile(local,'utf8');
          assert.ok(destination.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`),`Missing target: ${value}`);
        }
      }
    }
    for (const [,set] of html.matchAll(/srcset="([^"]+)"/g)) {
      for (const source of set.split(',')) await access(new URL(`../public${source.trim().split(' ')[0]}`,import.meta.url));
    }
  }
  for (const file of ['styles.css','fonts.css']) {
    const css = await readFile(new URL(`../public/${file}`,import.meta.url),'utf8');
    for (const [,url] of css.matchAll(/url\(['"]?(\/[^)'"\s]+)['"]?\)/g)) await access(new URL(`../public${url}`,import.meta.url));
  }
});

test('a görgetés egy képkockára összevonja a frissítéseket, álló oldalon nincs ciklus', () => {
  const page = setupPage();
  page.fire('scroll'); page.fire('scroll'); page.fire('resize');
  assert.equal(page.frames.size,1);
  page.flush(); assert.equal(page.frames.size,0);
  assert.ok(page.classes.has('has-motion'));
  page.fire('scroll'); page.fire('scroll'); page.flush();
  assert.equal(page.frames.size,0);
});

test('csökkentett mozgásnál a fejezetválasztó működik, animációs változók nélkül', () => {
  const page = setupPage({ reducedMotion: true });
  page.sections['.about'].bounds.top = 100; page.flush();
  assert.equal(page.classes.has('has-motion'),false);
  assert.equal(page.sections['.hero'].properties.size,0);
  assert.deepEqual(page.active(),['#rolam']);
});

test('a mozgási beállítás futás közben ki- és visszakapcsolható', () => {
  const page = setupPage(); page.flush();
  assert.ok(page.sections['.hero'].properties.size > 0);
  page.setReducedMotion(true); page.flush();
  assert.equal(page.classes.has('has-motion'),false);
  assert.equal(page.sections['.hero'].properties.size,0);
  page.setReducedMotion(false); page.flush();
  assert.ok(page.classes.has('has-motion'));
});

test('alacsony, keskeny vagy nagy szövegű nézetben nincs képmozgatás', () => {
  for (const settings of [{ height: 390 },{ height: 720 },{ width: 320 },{ fontSize: 32 }]) {
    const page = setupPage(settings); page.flush();
    assert.equal(page.classes.has('has-motion'),false);
    assert.equal(page.classes.has('large-text'),settings.fontSize === 32);
  }
  const page = setupPage(); page.flush();
  page.window.innerHeight = 667; page.fire('resize'); page.flush();
  assert.equal(page.classes.has('has-motion'),false);
  assert.equal(page.sections['.hero'].properties.size,0);
});

test('előre és visszafelé görgetve pontosan egy aktuális fejezet marad', () => {
  const page = setupPage(); page.flush();
  assert.deepEqual(page.active(),['#kezdolap']);
  for (const [selector,target] of [['.about','#rolam'],['.offerings','#alkalmak'],['.packages','#csomagok'],['.contact','#kapcsolat']]) {
    page.sections[selector].bounds.top = 100; page.fire('scroll'); page.flush();
    assert.deepEqual(page.active(),[target]);
  }
  page.sections['.contact'].bounds.top = 1400; page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['#csomagok']);
  page.sections['.packages'].bounds.top = 2300; page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['#alkalmak']);
  page.sections['.about'].bounds.top = 1400; page.sections['.offerings'].bounds.top = 2300;
  page.fire('hashchange'); page.flush();
  assert.deepEqual(page.active(),['#kezdolap']);
});

test('magas nézetben is a kapcsolat aktív az oldal aljára érve', () => {
  const page = setupPage({ height: 1800 });
  page.sections['.contact'].bounds.top = 1100;
  page.sections['.offerings'].bounds.top = -600;
  page.window.scrollY = 2200; page.flush();
  assert.deepEqual(page.active(),['#kapcsolat']);
});

test('a nyitókép mozgása határolt és visszagörgethető', () => {
  const page = setupPage();
  page.window.scrollY = -100; page.sections['.hero'].bounds.top = 100; page.flush();
  assert.equal(page.root.properties.get('--page-progress'),'0.0000');
  assert.equal(page.sections['.hero'].properties.get('--hero-progress'),'0.0000');
  page.sections['.hero'].bounds.top = -450; page.fire('scroll'); page.flush();
  assert.equal(page.sections['.hero'].properties.get('--hero-progress'),'0.5000');
  page.window.scrollY = 8000; page.sections['.hero'].bounds.top = -8000; page.fire('scroll'); page.flush();
  assert.equal(page.root.properties.get('--page-progress'),'1.0000');
  assert.equal(page.sections['.hero'].properties.get('--hero-progress'),'1.0000');
  page.sections['.hero'].bounds.top = -450; page.fire('scroll'); page.flush();
  assert.equal(page.sections['.hero'].properties.get('--hero-progress'),'0.5000');
});

test('háttérben nem dolgozik a lap, visszatéréskor frissíti a fejezetet', () => {
  const page = setupPage(); page.document.hidden = true; page.fire('visibilitychange');
  assert.equal(page.frames.size,0);
  page.fire('scroll'); assert.equal(page.frames.size,0);
  page.sections['.contact'].bounds.top = 100;
  page.document.hidden = false; page.fire('visibilitychange'); page.flush();
  assert.deepEqual(page.active(),['#kapcsolat']);
  assert.equal(page.frames.size,0);
});

test('az aloldal hős- és kezdőlapi szakaszok nélkül is használható', () => {
  const page = setupPage({ detailPage: true,fontSize: 32 }); page.flush();
  assert.deepEqual(page.active(),['/#alkalmak']);
  assert.equal(page.classes.has('has-motion'),false);
  assert.equal(page.classes.has('large-text'),true);
  page.window.scrollY = 3100; page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['/#alkalmak']);
  assert.equal(page.root.properties.get('--page-progress'),'1.0000');
});

test('a csomagoldalon a Csomagok menüpont aktív', () => {
  const page = setupPage({ detailPage: true,chapter: 'csomagok' }); page.flush();
  assert.deepEqual(page.active(),['/#csomagok']);
  page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['/#csomagok']);
});

test('a közvetlen link és a böngészős visszatérés megnyitja a célzott leírást', () => {
  const page = setupPage({ detailPage: true,hash: '#reiki' });
  assert.equal(page.details.reiki.open,true);
  assert.equal(page.details['csoportos-hangfurdo'].open,false);
  page.window.location.hash = '#csoportos-hangfurdo'; page.fire('hashchange');
  assert.equal(page.details['csoportos-hangfurdo'].open,true);
  page.details.reiki.open = false;
  page.window.location.hash = '#reiki'; page.fire('pageshow');
  assert.equal(page.details.reiki.open,true);
});

test('az ismeretlen vagy hibás horgony nem töri el az oldalt', () => {
  for (const hash of ['#nincs-ilyen','#%E0%A4%A','#hangfurdok']) {
    const page = setupPage({ detailPage: true,hash }); page.flush();
    page.fire('hashchange'); page.flush();
    assert.deepEqual(page.active(),['/#alkalmak']);
    assert.equal(page.details.reiki.open,false);
    assert.equal(page.details.hangfurdok.open,undefined);
  }
});

test('a leírás kinyitása után a görgetési jelzés az új lapmagasságot használja', () => {
  const page = setupPage({ detailPage: true });
  page.window.scrollY = 1550; page.flush();
  assert.equal(page.root.properties.get('--page-progress'),'0.5000');
  page.root.scrollHeight = 7100;
  page.fire('toggle'); page.fire('toggle');
  assert.equal(page.frames.size,1);
  page.flush();
  assert.equal(page.root.properties.get('--page-progress'),'0.2500');
  assert.equal(page.frames.size,0);
  page.root.scrollHeight = 5550;
  page.fire('layoutresize'); page.fire('layoutresize');
  assert.equal(page.frames.size,1);
  page.flush();
  assert.equal(page.root.properties.get('--page-progress'),'0.3333');
  assert.equal(page.frames.size,0);
});

test('a részleten belüli horgony a befoglaló leírást is megnyitja', () => {
  const page = setupPage({ hash: '#ritmus' });
  assert.equal(page.details.folyamat.open,true);
  assert.equal(page.details.ritmus.scrollCount,1);
});

test('a már nyitott leíráshoz visszatérés nem írja felül a görgetési helyet', () => {
  const page = setupPage({ hash: '#reiki' });
  assert.equal(page.details.reiki.scrollCount,1);
  page.fire('pageshow');
  assert.equal(page.details.reiki.scrollCount,1);
});

test('a korábbi részletoldalak megőrzik a horgonyt a főoldalra irányításkor', () => {
  for (const [homeSection,hash,target] of [
    ['alkalmak','','/#alkalmak'],['csomagok','','/#csomagok'],
    ['alkalmak','#reiki','/#reiki'],['csomagok','#ritmus','/#ritmus'],
  ]) {
    for (const basePath of ['', '/Sunny-Spiritual-Soul']) {
      const page = setupPage({ detailPage: true,homeSection,hash,basePath });
      assert.equal(page.window.location.replaced,`${basePath}${target}`);
    }
  }
});
