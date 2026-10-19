# Sunny Spiritual Soul

Magyar statikus weboldal, HTML/CSS/JavaScript alapon. Nincs csomagfüggőség, backend vagy külső betűkészlet-kérés. A tartalom és a hivatkozások JavaScript nélkül is használhatók.

## Helyi használat

Node.js 22 vagy újabb.

```sh
npm run dev
npm run check
npm test
npm run build
```

Előnézet: http://localhost:4173. Másik port: `PORT` környezeti változó.

## Cloudflare Pages

- Keretrendszer: nincs.
- Build parancs: `npm run build`.
- Kimeneti könyvtár: `dist`.
- Közvetlen feltöltéshez a build után a `dist` tartalma használható.
- Biztonsági fejlécek: `public/_headers`. Hiányzó oldal: `public/404.html`.

[Cloudflare statikus HTML útmutató](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)

## GitHub Pages előnézet

- Megosztható cím: https://rolandui.github.io/Sunny-Spiritual-Soul/.
- GitHub → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
- A `.github/workflows/pages.yml` a `master` ágra küldött változások után ellenőriz, tesztel, buildel, majd a `dist/` tartalmát publikálja. Az Actions fülön kézzel is indítható.
- A workflow a GitHub Pages címéből kapott `BASE_PATH` változóval készíti el a helyi erőforrások és belső hivatkozások útvonalát. A forrásfájlok nem módosulnak.
- A `BASE_PATH` nélküli `npm run build` továbbra is a Cloudflare Pages-hez használható. A Cloudflare-specifikus `_headers` fájlt a GitHub Pages nem alkalmazza.

[GitHub Pages egyedi workflow útmutató](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Szerkesztés

- Minden szolgáltatásleírás, helyszín, jelentkezési link, csomagár és feltétel: `public/index.html`. A három szolgáltatáscsoport és a két mentorálási részlet natív, helyben lenyitható sorokból áll; JavaScript nélkül is használhatók.
- A korábbi `/szolgaltatasok/` és `/csomagok/` aloldalak a főoldalra irányítanak, az URL-horgony megtartásával. JavaScript nélkül közvetlen főoldali linket mutatnak. Tartalmat csak a főoldalon kell szerkeszteni.
- Design tokenek, elrendezés és reszponzív szabályok: `public/styles.css`.
- Nyitókép mozgása, aktív fejezet, görgetési jelzés és közvetlenül hivatkozott leírások megnyitása: `public/app.js`.
- Lenyitáskor a működtetett cím helyének és fókuszának megtartása: `public/details.js`. Nincs modal, tartalombetöltés vagy egyedi előzménykezelés.
- Helyi Cinzel Decorative, Lora és Manrope: `public/fonts.css`, `public/assets/fonts/`; OFL licencekkel.
- Képek és eredetük: [ASSETS.md](ASSETS.md).
- Követendő arculati specifikáció: [DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md).
- Átadott eredeti arculati képek: `references/brand/`. A build ezeket nem másolja.

A kapcsolati link a [Sunny Spiritual Soul Instagram-profilra](https://www.instagram.com/sunnyspiritualsoul/) vezet. A csoportos hangfürdő leírásában az [Azura MotiBro-oldala](https://azuraegeszsegkozpont.motibro.com/home) érhető el. Az oldal nem küld üzenetet és nem kezel időpontfoglalást.

A nyitókép mozgása természetes görgetést követ. Csökkentett mozgás, rövid/keskeny nézet vagy nagyított szöveg esetén a kép nem mozog. Nincs automatikus hang vagy folyamatos animációs ciklus. A lebegő menü nagyított szöveg esetén a tartalom elé kerül.

## Ellenőrzés

Az `npm run check` a JavaScript szintaxisát ellenőrzi. Az `npm test` a helyi erőforrásokat, belső hivatkozásokat és horgonyokat, aktív fejezetet, görgetést, mozgási beállításokat és közvetlenül hivatkozott leírásokat teszteli. A részletek tesztjei a helyben nyitást és zárást, a cím helyének és fókuszának megtartását, a közvetlen hivatkozásokat és a módosítóbillentyűs linknyitást fedik le. Külön lint- vagy TypeScript-konfiguráció nincs.

UI-változás után böngészős ellenőrzés szükséges asztalon, tableten és mobilon; billentyűzettel, 200%-os szöveggel, csökkentett mozgással, JavaScript és képek nélkül. A helyi fejlesztői szerver nem alkalmazza a Cloudflare `_headers` fájlt; a CSP-t külön előnézetben is ellenőrizni kell.
