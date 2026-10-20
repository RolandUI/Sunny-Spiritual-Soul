import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const app = await readFile(new URL('../public/app.js',import.meta.url),'utf8');

function setupPage({ reducedMotion = false, height = 900, width = 1440, fontSize = 16, detailPage = false, faq = false, compactMenu = false, hash = '', chapter = 'alkalmak', homeSection, basePath = '' } = {}) {
  const element = (top = 0, height = 900, href = '') => ({
    focusCount: 0,focus() { this.focusCount++; },
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
  const toggle = compactMenu ? element() : null;
  toggle?.setAttribute('aria-expanded','false');
  const classes = new Set();
  const navClasses = new Set();
  const nav = Object.assign(element(),{ classList: { add: name => navClasses.add(name),remove: name => navClasses.delete(name) } });
  const root = Object.assign(element(),{ scrollHeight: 4000,classList: { toggle: (name,active) => active ? classes.add(name) : classes.delete(name) } });
  const sections = detailPage ? {} : { '.hero': element(0),'.about': element(900),'.offerings': element(1600,1000),'.packages': element(2600,700),'.contact': element(3300,700) };
  if (faq) sections['.faq'] = element(3000,300);
  const links = ['kezdolap','rolam','alkalmak','csomagok','gyik','kapcsolat'].map((id,index) => Object.assign(element(0,44,`${detailPage ? '/' : ''}#${id}`),{
    offsetLeft: [8,60,154,258,376,480][index],offsetTop: 8,offsetWidth: [48,90,100,114,100,112][index],offsetHeight: 48,
  }));
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
    querySelector: selector => selector === '.chapter-toggle' ? toggle : selector === '.chapter-nav' ? nav : selector === '.not-found a' ? element(0,44,`${basePath}/#${homeSection}`) : sections[selector],
    querySelectorAll: selector => selector === '.chapter-nav a' ? links : [],
    getElementById: id => details[id] ?? ({ kezdolap:sections['.hero'],gyik:sections['.faq'] }[id]) ?? null,
    addEventListener: (name,listener) => events.set(name,listener),
  };
  runInNewContext(app,{ window,document });
  return {
    clickToggle() { events.get('click')({ button:0,target:{ closest:selector => selector === '.chapter-toggle' ? toggle : null } }); },
    classes,root,nav,toggle,navClasses,sections,links,details,frames,window,document,
    fire: (name,event) => events.get(name)(event),
    clickNav(index,options = {}) {
      const event = { button: 0,defaultPrevented: false,target: { closest: selector => selector === '.chapter-toggle' ? null : links[index] ?? null },...options };
      events.get('click')(event);
      return event;
    },
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

test('a Tudnivalók saját aktív menüpontot kap a Csomagok és a Kapcsolat között', () => {
  const page = setupPage({ faq:true });
  page.sections['.packages'].bounds.top = 100;
  page.flush();
  assert.deepEqual(page.active(),['#csomagok']);
  page.sections['.faq'].bounds.top = 100;
  page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['#gyik']);
  assert.equal(page.navClasses.has('has-indicator'),true);
  page.sections['.contact'].bounds.top = 100;
  page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['#kapcsolat']);
  assert.equal(page.navClasses.has('has-indicator'),true);
});

test('magas nézetben is a kapcsolat aktív az oldal aljára érve', () => {
  const page = setupPage({ height: 1800 });
  page.sections['.contact'].bounds.top = 1100;
  page.sections['.offerings'].bounds.top = -600;
  page.window.scrollY = 2200; page.flush();
  assert.deepEqual(page.active(),['#kapcsolat']);
});

test('a közös navigációs háttér az aktív menüpont helyét és méretét követi', () => {
  const page = setupPage(); page.flush();
  assert.ok(page.navClasses.has('has-indicator'));
  assert.equal(page.nav.properties.get('--nav-x'),'8px');
  assert.equal(page.nav.properties.get('--nav-width'),'48px');
  page.sections['.offerings'].bounds.top = 100; page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['#alkalmak']);
  assert.equal(page.nav.properties.get('--nav-x'),'154px');
  assert.equal(page.nav.properties.get('--nav-y'),'8px');
  assert.equal(page.nav.properties.get('--nav-width'),'100px');
  assert.equal(page.nav.properties.get('--nav-height'),'48px');
  page.sections['.offerings'].bounds.top = 1600; page.fire('scroll'); page.flush();
  assert.equal(page.nav.properties.get('--nav-x'),'8px');
  assert.equal(page.frames.size,0);
});

test('menüpontra kattintva a háttér közvetlenül a célhoz mozog, a köztes fejezetek nem térítik el', () => {
  const page = setupPage();
  page.sections['.about'].bounds.top = 100; page.flush();
  assert.deepEqual(page.active(),['#rolam']);
  page.clickNav(5); page.flush();
  assert.deepEqual(page.active(),['#kapcsolat']);
  assert.equal(page.nav.properties.get('--nav-x'),'480px');
  page.window.location.hash = '#kapcsolat'; page.fire('hashchange'); page.flush();
  for (const selector of ['.offerings','.packages','.contact']) {
    page.sections[selector].bounds.top = 100; page.fire('scroll'); page.flush();
    assert.deepEqual(page.active(),['#kapcsolat']);
    assert.equal(page.nav.properties.get('--nav-x'),'480px');
  }
  page.sections['.contact'].bounds.top = 1400; page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['#csomagok']);
  assert.equal(page.frames.size,0);
});

test('gyors újabb aktiválás azonnal lecseréli a navigáció célját', () => {
  const page = setupPage();
  page.sections['.about'].bounds.top = 100; page.flush();
  page.clickNav(5); page.flush();
  page.sections['.offerings'].bounds.top = 100; page.fire('scroll'); page.flush();
  page.clickNav(1,{ detail: 0 }); page.flush();
  assert.deepEqual(page.active(),['#rolam']);
  assert.equal(page.nav.properties.get('--nav-x'),'60px');
  page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['#rolam']);
});

test('kézi görgetés vagy új interakció visszaadja a menüt az aktuális szakasznak', () => {
  for (const event of ['wheel','touchmove','pointerdown','keydown']) {
    const page = setupPage(); page.flush();
    page.clickNav(5); page.flush();
    page.sections['.offerings'].bounds.top = 100; page.fire('scroll'); page.flush();
    assert.deepEqual(page.active(),['#kapcsolat']);
    page.fire(event); page.flush();
    assert.deepEqual(page.active(),['#alkalmak']);
    assert.equal(page.nav.properties.get('--nav-x'),'154px');
  }
});

test('másik horgonyra visszatérés feloldja a korábbi menücél követését', () => {
  const page = setupPage(); page.flush();
  page.clickNav(5); page.flush();
  page.sections['.about'].bounds.top = 100;
  page.window.location.hash = '#rolam'; page.fire('hashchange'); page.flush();
  assert.deepEqual(page.active(),['#rolam']);
});

test('a menükezelés megőrzi a natív horgonyokat és a módosított kattintásokat', () => {
  const page = setupPage(); page.flush();
  for (const options of [{ ctrlKey: true },{ metaKey: true },{ shiftKey: true },{ altKey: true },{ button: 1 },{ defaultPrevented: true }]) {
    page.clickNav(5,options); page.flush();
    assert.deepEqual(page.active(),['#kezdolap']);
  }
  page.clickNav(-1); page.flush();
  assert.deepEqual(page.active(),['#kezdolap']);
  const event = page.clickNav(5); page.flush();
  assert.deepEqual(page.active(),['#kapcsolat']);
  assert.equal(event.defaultPrevented,false);
  assert.equal(page.window.location.hash,'');
});

test('átméretezéskor azonos fejezetnél is újraigazítja a navigációs hátteret', () => {
  const page = setupPage(); page.flush();
  Object.assign(page.links[0],{ offsetLeft: 4,offsetTop: 12,offsetWidth: 240,offsetHeight: 60 });
  page.fire('resize'); page.flush();
  assert.deepEqual(page.active(),['#kezdolap']);
  assert.equal(page.nav.properties.get('--nav-x'),'4px');
  assert.equal(page.nav.properties.get('--nav-y'),'12px');
  assert.equal(page.nav.properties.get('--nav-width'),'240px');
  assert.equal(page.nav.properties.get('--nav-height'),'60px');
});

test('csökkentett mozgásnál is az aktív menüpontra igazítja a közös hátteret', () => {
  const page = setupPage({ reducedMotion: true });
  page.sections['.packages'].bounds.top = 100; page.flush();
  assert.deepEqual(page.active(),['#csomagok']);
  assert.equal(page.nav.properties.get('--nav-x'),'258px');
  assert.equal(page.nav.properties.get('--nav-width'),'114px');
  assert.equal(page.frames.size,0);
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

test('a kompakt menü megnyílik, választáskor bezár és a célfejezetnek adja a fókuszt', () => {
  const page = setupPage({ faq:true,compactMenu:true,width:390 }); page.flush();
  assert.ok(page.classes.has('nav-ready'));
  page.clickToggle();
  assert.equal(page.toggle.getAttribute('aria-expanded'),'true');
  assert.ok(page.navClasses.has('is-open'));
  page.clickNav(4); page.flush();
  assert.equal(page.toggle.getAttribute('aria-expanded'),'false');
  assert.equal(page.navClasses.has('is-open'),false);
  assert.equal(page.sections['.faq'].focusCount,1);
  assert.deepEqual(page.active(),['#gyik']);
  page.sections['.packages'].bounds.top = 100;
  page.fire('scroll'); page.flush();
  assert.deepEqual(page.active(),['#gyik']);
});

test('a kompakt menü Escape-re, külső kattintásra és kifelé tabulálásra bezár', () => {
  const page = setupPage({ compactMenu:true,width:390 }); page.flush();
  page.clickToggle();
  page.fire('keydown',{ key:'Escape' });
  assert.equal(page.toggle.getAttribute('aria-expanded'),'false');
  assert.equal(page.toggle.focusCount,1);
  page.clickToggle();
  page.fire('click',{ button:0,target:{ closest:() => null } });
  assert.equal(page.navClasses.has('is-open'),false);
  page.clickToggle();
  page.fire('focusin',{ target:{ closest:() => null } });
  assert.equal(page.toggle.getAttribute('aria-expanded'),'false');
  page.clickToggle(); page.clickToggle();
  assert.equal(page.navClasses.has('is-open'),false);
});

test('asztali méretre váltás bezárja a kompakt menüt, visszaváltáskor sem nyílik ki', () => {
  const page = setupPage({ compactMenu:true,width:390 }); page.flush();
  page.clickToggle();
  page.window.innerWidth = 1000; page.fire('resize'); page.flush();
  assert.equal(page.toggle.getAttribute('aria-expanded'),'false');
  page.window.innerWidth = 390; page.fire('resize'); page.flush();
  assert.equal(page.navClasses.has('is-open'),false);
});

test('a menü animációja csak kézi nyitásra engedélyezett, nézetváltáskor kikapcsol', () => {
  const page = setupPage({ compactMenu:true,width:1000 }); page.flush();
  assert.equal(page.navClasses.has('has-menu-motion'),false);
  page.window.innerWidth = 390; page.fire('resize'); page.flush();
  assert.equal(page.navClasses.has('has-menu-motion'),false);
  page.clickToggle();
  assert.ok(page.navClasses.has('has-menu-motion'));
  page.clickToggle();
  assert.ok(page.navClasses.has('has-menu-motion'));
  page.window.innerWidth = 1000; page.fire('resize'); page.flush();
  assert.equal(page.navClasses.has('has-menu-motion'),false);
  page.window.innerWidth = 390; page.fire('resize'); page.flush();
  assert.equal(page.navClasses.has('has-menu-motion'),false);
  assert.equal(page.toggle.getAttribute('aria-expanded'),'false');
});
