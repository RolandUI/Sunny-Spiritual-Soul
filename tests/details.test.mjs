import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const script = await readFile(new URL('../public/details.js',import.meta.url),'utf8');

function setupDetails({ open = false, shift = 0, duration = 0, padding = 32 } = {}) {
  const scrolls = [];
  const frames = new Map();
  const events = new Map();
  const classes = new Set();
  let frameId = 0;
  let now = 0;
  let layoutShift = 0;
  const detail = { open };
  const linkedDetail = { open: false };
  let focused;
  let click;
  const summary = {
    parentElement: detail,
    getBoundingClientRect: () => ({ top: 300 + layoutShift + (detail.open !== open ? shift : 0) - window.scrollY }),
    focus: options => { focused = options; },
  };
  const document = {
    documentElement: { classList: { add: name => classes.add(name),remove: name => classes.delete(name) } },
    hidden: false,
    getElementById: id => id === 'ritmus' ? { closest: () => linkedDetail } : null,
    addEventListener: (name,listener) => { if (name === 'click') click = listener; else events.set(name,listener); },
  };
  const window = {
    scrollY: 0,
    scrollBy: options => { scrolls.push(options); window.scrollY += options.top; },
    getComputedStyle: () => ({ transitionDuration: `${duration / 1000}s`,scrollPaddingTop: `${padding}px` }),
    performance: { now: () => now },
    requestAnimationFrame: callback => { frames.set(++frameId,callback); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    addEventListener: (name,listener) => events.set(name,listener),
  };
  runInNewContext(script,{ document,window });
  return {
    detail,linkedDetail,scrolls,frames,classes,window,document,
    get focus() { return focused; },
    get top() { return summary.getBoundingClientRect().top; },
    moveLayout(value) { layoutShift = value; },
    fire(name) { events.get(name)(); },
    frame(time) {
      now = time;
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach(callback => callback(time));
    },
    click({ link = null,outside = false,...options } = {}) {
      const event = {
        button: 0,defaultPrevented: false,
        target: { closest: selector => selector.startsWith('a[') ? link : outside ? null : summary },
        preventDefault() { this.defaultPrevented = true; },
        ...options,
      };
      click(event);
      return event;
    },
  };
}

test('a helyben nyitás felülre igazítja a címet és megtartja a billentyűzetfókuszt', () => {
  const page = setupDetails({ shift: -180 });
  const event = page.click();
  assert.equal(page.detail.open,true);
  assert.equal(event.defaultPrevented,true);
  assert.equal(page.focus.preventScroll,true);
  assert.equal(page.scrolls.length,1);
  assert.equal(page.scrolls[0].top,88);
  assert.equal(page.scrolls[0].behavior,'instant');
  assert.equal(page.top,32);
});

test('a felső térközt az oldal közös görgetési stílusából veszi', () => {
  const page = setupDetails({ padding: 64 });
  page.click();
  assert.equal(page.top,64);
});

test('az ismételt kattintás bezár, elmozdulás nélkül nem görget', () => {
  const page = setupDetails({ open: true });
  page.click();
  assert.equal(page.detail.open,false);
  assert.equal(page.focus.preventScroll,true);
  assert.equal(page.scrolls.length,0);
});

test('a billentyűzet által kiváltott kattintás is ugyanazt a fejlécet működteti', () => {
  const page = setupDetails();
  page.click({ detail: 0 });
  assert.equal(page.detail.open,true);
  assert.equal(page.focus.preventScroll,true);
  assert.equal(page.top,32);
});

test('a belső link előbb kinyitja a cél tartalmát, a navigáció natív marad', () => {
  const page = setupDetails();
  const event = page.click({ link: { hash: '#ritmus' } });
  assert.equal(page.linkedDetail.open,true);
  assert.equal(event.defaultPrevented,false);
  assert.equal(page.detail.open,false);
  assert.equal(page.scrolls.length,0);
});

test('a módosítóbillentyűs link és a nem elsődleges kattintás változatlan marad', () => {
  for (const options of [{ ctrlKey: true },{ metaKey: true },{ shiftKey: true },{ altKey: true },{ button: 1 },{ defaultPrevented: true }]) {
    const page = setupDetails();
    page.click({ link: { hash: '#ritmus' },outside: true,...options });
    assert.equal(page.linkedDetail.open,false);
    assert.equal(page.detail.open,false);
    assert.equal(page.scrolls.length,0);
  }
});

test('a nem kapcsolódó kattintás és az ismeretlen horgony hatástalan', () => {
  const page = setupDetails();
  assert.equal(page.click({ outside: true }).defaultPrevented,false);
  assert.equal(page.click({ link: { hash: '#nincs-ilyen' } }).defaultPrevented,false);
  assert.equal(page.linkedDetail.open,false);
  assert.equal(page.detail.open,false);
});

test('nyitás közben követi az összehúzódó előző elemet és fokozatosan felülre görget', () => {
  const page = setupDetails({ duration: 360 });
  page.click();
  assert.equal(page.frames.size,1);
  assert.ok(page.classes.has('is-disclosing'));
  assert.equal(page.top,300);
  let previousTop = page.top;
  for (const [time,shift] of [[120,-80],[240,-150],[360,-180]]) {
    page.moveLayout(shift); page.frame(time);
    assert.ok(page.top < previousTop);
    assert.ok(page.top >= 32);
    previousTop = page.top;
  }
  assert.equal(page.top,32);
  assert.equal(page.window.scrollY,88);
  assert.equal(page.frames.size,0);
  assert.equal(page.classes.has('is-disclosing'),false);
});

test('a kézi művelet megszakítja az odagörgetést, a magasságváltozás nem írja felül', () => {
  for (const input of ['wheel','touchmove','pointerdown','keydown']) {
    const page = setupDetails({ duration: 360 });
    page.click();
    page.fire(input);
    page.window.scrollY += 100;
    page.moveLayout(-80); page.frame(120);
    assert.equal(page.top,200);
    assert.equal(page.window.scrollY,20);
    page.frame(360);
    assert.equal(page.top,200);
    assert.equal(page.frames.size,0);
  }
});

test('gyors újrakattintásnál csak a legújabb átmenetet követi', () => {
  const page = setupDetails({ duration: 360 });
  page.click(); page.frame(60); page.click();
  assert.equal(page.detail.open,false);
  assert.equal(page.frames.size,1);
  page.frame(120); page.click();
  assert.equal(page.detail.open,true);
  assert.equal(page.frames.size,1);
  page.frame(480);
  assert.equal(page.top,32);
  assert.equal(page.frames.size,0);
  assert.equal(page.classes.has('is-disclosing'),false);
});

test('csökkentett mozgásnál és animációt nem támogató böngészőben nincs ciklus', () => {
  const page = setupDetails({ duration: 0,shift: -180 });
  page.click();
  assert.equal(page.top,32);
  assert.equal(page.frames.size,0);
  assert.equal(page.classes.has('is-disclosing'),false);
});

test('navigálás vagy háttérbe kerülés megszakítja a fejléc követését', () => {
  for (const action of ['link','hashchange','visibilitychange']) {
    const page = setupDetails({ duration: 360 });
    page.click();
    if (action === 'link') page.click({ link: { hash: '#ritmus' } });
    else {
      if (action === 'visibilitychange') page.document.hidden = true;
      page.fire(action);
    }
    assert.equal(page.frames.size,0);
    assert.equal(page.classes.has('is-disclosing'),false);
  }
});

test('minden szolgáltatás statikusan elérhető, egyetlen szintű és csoportosított', async () => {
  const html = await readFile(new URL('../public/index.html',import.meta.url),'utf8');
  const groups = [...html.matchAll(/<section class="service-group"[\s\S]*?<\/section>/g)];
  assert.deepEqual(groups.map(group => [...group[0].matchAll(/<details class="disclosure" name="szolgaltatasok"/g)].length),[5,4,5]);
  for (const group of groups) {
    const descriptions = [...group[0].matchAll(/<details[^>]* id="([^"]+)"[^>]*>([\s\S]*?)<\/details>/g)];
    for (const [,id,description] of descriptions) {
      assert.doesNotMatch(description,/<details/);
      assert.match(description,/<summary><h4>.+<\/h4>/);
      if (id === 'csoportos-hangfurdo') {
        assert.match(description,/<a class="text-link" href="https:\/\/azuraegeszsegkozpont\.motibro\.com\/home"/);
      } else {
        assert.match(description,/<a class="text-link" href="#kapcsolat">[^<]+<\/a>/);
      }
    }
  }
  assert.doesNotMatch(html,/<dialog|<select|service-nav/);
});

test('a csomag egyeztetése a választható kapcsolatfelvételi csatornákhoz vezet', async () => {
  const html = await readFile(new URL('../public/index.html',import.meta.url),'utf8');
  assert.match(html,/<a class="text-link mentoring-contact" href="#kapcsolat">[^<]+<\/a>/);
  const contact = html.match(/<section class="contact" id="kapcsolat"[\s\S]*?<\/section>/)?.[0];
  assert.ok(contact);
  assert.match(contact,/tabindex="-1"/);
  assert.match(contact,/href="https:\/\/www\.instagram\.com\/sunnyspiritualsoul\/"/);
  assert.match(contact,/href="https:\/\/www\.facebook\.com\/profile\.php\?id=61566141987607"/);
  assert.match(contact,/href="mailto:sunnyspiritualsoul@gmail\.com"/);
});

test('a tudnivalók önálló, JavaScript nélkül is használható kérdéscsoportot alkotnak', async () => {
  const html = await readFile(new URL('../public/index.html',import.meta.url),'utf8');
  const faq = html.match(/<section class="faq"[\s\S]*?<\/section>/)?.[0];
  assert.ok(faq);
  assert.match(html, /href="#gyik"/);
  const questions = [...faq.matchAll(/<details([^>]*)>([\s\S]*?)<\/details>/g)];
  assert.ok(questions.length > 0);
  for (const [,attributes,content] of questions) {
    assert.match(attributes, /class="disclosure"/);
    assert.match(attributes, /name="gyik"/);
    assert.match(attributes, /id="gyik-[^"]+"/);
    assert.doesNotMatch(attributes, /\bopen\b/);
    assert.match(content, /<summary><h3>.+<\/h3>/);
    assert.match(content, /<div class="disclosure-content">/);
    assert.match(content, /<p>.+<\/p>/);
    assert.doesNotMatch(content, /<details/);
  }
});
