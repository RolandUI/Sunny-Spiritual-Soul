# Sunny Spiritual Soul – designspecifikáció

## Arculati alap

A felhasználó által átadott arculati képek a vizuális források: `references/brand/`. Mély petrol, tompa zsálya, törtfehér, jellegzetes talpas betűk, ezüstös víz és világos mészkő. A meglévő logót ne rajzold át és ne helyettesítsd generált hasonmással.

- Tartalombővítéskor tartsd meg ezt a palettát, tipográfiát, felületrendszert és alsó navigációt. Az új tartalom a meglévő komponensekhez igazodjon.
- A kapcsolódó mezők és lekerekítések elsődleges mintája a `references/brand/schedule.png`. A víz képi mintája a `services-cover.png` és a `packages-cover.png`; a mészkőé a `schedule.png`.
- Egyértelmű hierarchia, rövid szövegek, nagy összefüggő felületek.
- A referencia lekerekített, kapcsolódó mezőit használd: színes fej- vagy számmező és hozzá illesztett világos tartalmi panel. A lekerekítés a tartalmi csoportokat is jelölje.
- A víz a nyitókép; a mészkő a csomagok alsó képi lezárása. Minden további illusztráció ugyanazt a palettát és anyagvilágot kövesse.
- Vékony, ritkán elhelyezett organikus kontúrvonalak használhatók háttérként.
- Ne használj napraforgókat, boltíves kollázsokat, barack–lila kártyákat, elforgatott fotókereteket, lebegő címkéket vagy pusztán dekorációt vezérlő gombokat.
- Magyar, tegeződő szöveg. A bemutatkozás egyes szám első személyben.
- Ne használj szlogenként általános spirituális ígéreteket. A szolgáltatást és a kapcsolatfelvétel módját mondd el.
- Minden mondat adjon konkrét információt, segítsen választani, vagy tisztázza a következő lépést. Ne magyarázd a magától érthető kezelést; ne ismételd meg a kategórianevet külön dekoratív panelen. Kerüld a „Válaszd ki, ami közel áll hozzád” típusú felszólításokat.

## Színek

Minden szín közös CSS-tokenből származzon. Áttetsző változatokhoz `color-mix` használható.

| Token | Érték | Szerep |
| --- | --- | --- |
| `--color-primary` | `#154653` | Petrol, fő arculati szín |
| `--color-deep` | `#103B46` | Mély petrol |
| `--color-teal` | `#3F696E` | A petrol felület visszafogott átmenete |
| `--color-blue` | `#316276` | Kékes petrol a második kategória mezőjén |
| `--color-sage` | `#98B4AE` | Zsálya alap |
| `--color-mist` | `#CBD8D3` | Világos zsálya |
| `--color-paper` | `#F4F4ED` | Törtfehér felület, navigáció |
| `--color-expanded` | 60% törtfehér + 40% világos zsálya | Nyitott részletek közös, halvány háttere |
| `--color-white` | `#FAFBF6` | Cím a nyitóképen |
| `--color-text` | `#154653` | Szöveg világos felületen |
| `--color-muted` | `#4C666A` | Másodlagos szöveg világos felületen |
| `--color-line` | `#B3C3BF` | Elválasztók |
| `--color-on-dark` | `#DAE6E3` | Törzsszöveg petrolon |

Normál szöveg kontrasztja legalább 4,5:1; nagy szövegé és funkcionális jelölésé legalább 3:1. Kép ne fusson olvasandó szöveg alá olyan helyen, ahol nincs megfelelő kontraszt.

## Tipográfia és térköz

- Címek: **Cinzel Decorative**, 400. A referenciák díszes kezdőbetűit és talpas karakterét követi; nem az eredeti logó újrarajzolása.
- Törzsszöveg: **Lora**, 400; alapméret 1,0625rem, sorköz 1,65.
- A lenyitott szolgáltatásleírás 1,125rem, 1,75 sorközzel; a szöveg szélessége legfeljebb 66ch.
- Kezelőfelület és rövid címkék: **Manrope**, 400–500; 0,8125–0,875rem.
- Mindhárom betűcsalád helyi WOFF2, latin és latin-ext részhalmazokkal, `font-display: swap`.
- Szakaszcím: `clamp(2.4rem,5.3vw,5rem)`. Szolgáltatáscím: `clamp(1.625rem,2.7vw,2.5rem)`.
- A **Sunny Spiritual Soul egyetlen, egyenrangú márkanév**. Mindhárom szó betűcsaládja, mérete, súlya, színe és betűköze azonos; a Sunny nem lehet nagyobb vagy hangsúlyosabb.
- A név 900 px-től egy sorban, kisebb nézetben három sorban jelenjen meg. Közös betűméret: mobilon `clamp(2.75rem,11vw,4.5rem)`, asztalon `clamp(3rem,6.6vw,6rem)`. Fekvő mobilon elférhet egy sorban, azonos szóformázással.
- Hosszú címeknél szabályos magyar feltételes elválasztás használható.
- Térközskála: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px, rem tokenekben.
- Tartalomszélesség legfeljebb 1160 px. Oldalmargó mobilon 24 px, 360 px alatt 20 px, 700 px-től 48 px, 1200 px-től 80 px.
- Szakaszok belső függőleges térköze 80–128 px. Szövegoszlop legfeljebb 42ch.

## Felületformák

- `--radius-panel`: 1,5rem, tartalmi panelek és portré.
- `--radius-section`: 2,5rem, a bemutatkozás közös világos felülete.
- `--radius-cap`: 8rem, a vízszintes sorok bal oldali íves mezője.
- `--radius-pill`: 100px, cselekvést indító kapszulahivatkozások.
- Az összetartozó színes és világos mezők köze 4–8 px. Ne helyezz közéjük nagy térközt vagy újabb keretet.
- Vízszintes mezőpárnál a színes bal mező külső oldala félköríves, a csatlakozó élek egyenesek. A világos panel jobb külső sarkai lekerekítettek. Egymás alá rendezéskor a teljes csoport külső felső és alsó sarkait kerekítsd.
- A színes mezők sorrendje petrol, kékes petrol, zsálya. Az első kettőn törtfehér, a zsályán petrol szöveg legyen.
- A csomagok alkalomszáma és felirata egy vízszintesen és függőlegesen középre rendezett egység legyen, 8 px köztes térrel. A szám sorköze 1. Minden nézetben azonos bal és jobb belső térközt használj; a közös szövegtengely a teljes színes mező geometriai közepére essen, külön oldalirányú korrekció nélkül.
- Árnyék csak a lebegő navigáción szükséges. A tartalmi elemek lapos, színezett felületek.
- A gombok és szöveges linkek ne kapjanak ismétlődő dekoratív nyilat. A platformnév és logó azonosítja a közösségi célpontot; az új lapot a hozzáférhető név jelzi. Felfelé mutató nyíl csak az oldal tetejére visszavezető lábléchivatkozáson szerepeljen.

### Újrahasználandó elemek

A megvalósítás közös tokenjei és komponensstílusai a `public/styles.css` fájlban vannak. Új tartalomhoz ezeket használd; ugyanarra a szerepre ne hozz létre eltérő megjelenést.

| Elem | CSS-osztály | Használat |
| --- | --- | --- |
| Tartalmi szélesség | `.container` | Szakaszok közös vízszintes igazítása |
| Képes bemutatkozó panel | `.about-layout`, `.portrait`, `.about-copy` | Kép és szöveg egy közös világos felületen |
| Csomagsor | `.package`, `.package-count`, `.package-copy` | Színes alkalomszám és világos név–leírás panel |
| Cselekvés | `.text-link`, `.contact-link` | Rövid feliratú kapszulahivatkozás, valódi célponttal |
| Közösségi profilok | `.social-links`, `.social-link` | Egységes, egyszínű platformlogók; a Kapcsolat szakaszban platformnévvel |
| Navigáció | `.chapter-nav` | Egyetlen, alul lebegő kapszulamenü |
| Témacsoport és lenyitható leírás | `.service-group`, `.disclosure-list`, `.disclosure` | Színes csoportfejhez kapcsolódó, közös világos panel |
| Rövid tartalmi hivatkozás | `.inline-link` | Aláhúzott link a megfelelő részletes tartalomhoz |

## Főoldal

1. **Nyitókép:** teljes szélességű petrol vízgrafika. Középre rendezett fehér tipográfia a kép nyugodt felső részén; a hullám az alsó részt tölti ki. Szonja neve, a márkanév és a tevékenységek szerepelnek. Nincs felső menü vagy további gombsor.
2. **Rólam:** halvány zsálya háttéren közös, lekerekített törtfehér panel, valódi fotóval és rövid bemutatkozással. 900 px-től kép balra, szöveg jobbra; kisebb nézetben egymás alatt. A fotó teljes, 3:2 arányú kompozíciója és eredeti vízjele maradjon meg; alatta ne ismétlődjön a név külön képaláírásként. A szakaszcím „Szonja vagyok.”, a menüpont „Rólam”. Az Alkalmak hivatkozás mellett külön, 48 × 48 px-es kör alakú Instagram- és Facebook-link legyen.
3. **Alkalmak:** petrol felület, finom kontúrvonalak. Három témablokk: Hangfürdők; Reiki és érintés; Önismeret és rítusok. Asztalon balra színes, íves csoportcím, jobbra közös törtfehér panel a szolgáltatások neveivel. 900 px alatt a csoportcím a lista fölé kerül. Minden szolgáltatás neve eleve látszik; a teljes sor helyben nyitja a hozzá tartozó leírást. Nincs külön választóképernyő, oldalsó szolgáltatásmenü vagy modal.
4. **Csomagok:** zsálya háttéren három vízszintes sor. Balra színes, íves alkalomszám; jobbra világos, lekerekített panelben név, rövid leírás, közös munka időtartama, teljes díj és részletfizetés. Hold – 4 alkalom; Föld – 8 alkalom; Pandora – 12 alkalom. Mobilon is maradjon egymás mellett a számmező és a tartalom, nagyított szövegnél egymás alá kerülhetnek. Alattuk két helyben nyitható sor: „A mentorálás menete” és „Részvétel és fizetés”, majd egy közös egyeztetési link. A mészkő az alsó szegélyen maradjon, ne fedjen szöveget.
5. **Kapcsolat:** petrol alap, középre rendezett „Kapcsolat” cím és rövid tájékoztatás az egyeztetésről. Két egyenrangú kapszulahivatkozás Instagram- és Facebook-logóval, látható platformnévvel. Alattuk a valódi e-mail-cím kattintható `mailto:` hivatkozás. Mobilon a kapszulák szükség szerint egymás alá törjenek. Ne legyen közösségi hírfolyam, ismételt profilnév, új lebegő eszköztár vagy további menüpont.

A szolgáltatásnevek natív lenyitó vezérlők, a csomagsorok szöveges tartalmak. A csomagsor ne kapjon kattinthatóságot sugalló hoverhatást. Ne mutass árlistát vagy eseménynaptárt igazolt, publikálásra szánt adatok nélkül.

A lábléc 700 px-től három oszlopból áll: balra a márkanév, középen „Vetor Szonja · Budapest”, jobbra az évszám. A két szélső oszlop egyforma széles legyen, hogy a középső szöveg az oldal középvonalára kerüljön. Mobilon és nagyított szövegnél a három elem egymás alatt, középre igazítva jelenjen meg.

## Helyben nyíló részletek

- Minden leírás, díj és feltétel a főoldal statikus HTML-jében legyen. Ne tölts be tartalmat kattintáskor; ne legyen betöltőállapot, felugró ablak vagy külön részletnézet.
- A szolgáltatások egyetlen szintű, natív `details` / `summary` sorok. A három témacsoportban 5, 3 és 5 szolgáltatás látható; a csoportokat nem kell előbb lenyitni.
- A szolgáltatások közül egyszerre egy leírás lehet nyitva. A `name` attribútum JavaScript nélkül is biztosítsa ezt. A csomagok két részletező sora külön csoportot alkot.
- A sor megnyitása vagy bezárása ne navigáljon, és ne adjon új bejegyzést az előzményekhez. Ha a korábbi leírás összehúzása elmozdítaná a kiválasztott címet, a görgetés kompenzálja az eltérést. A fókusz maradjon a működtetett fejlécen.
- A teljes fejléc aktiválható egérrel, érintéssel, Enterrel és Szóközzel. Plusz/mínusz jel mutassa a nyitási állapotot; a billentyűzetfókusz látszódjon.
- A szolgáltatásnevek Lora betűvel, 1,125rem méretben szerepeljenek. A csoportcím Cinzel Decorative, `clamp(1.625rem,2.5vw,2rem)`. Címsorhierarchia: szakasz `h2`, témacsoport `h3`, szolgáltatás `h4`.
- A zárt sor törtfehér. A nyitott sor fejléce és leírása egységes, halvány zsályás felület (`--color-expanded`), petrol szöveggel; ne legyen külön sötétebb fejléccsík. A nyitott állapotot a színkülönbség mellett a mínuszjel és a megjelenő tartalom jelzi. A csoport külső lekerekítései maradjanak meg.
- A zárt sor hoverállapota a világos zsálya 20%-os áttetsző rétege legyen; maradjon halványabb a nyitott sor kiemelésénél.
- A leírás közvetlenül a saját címe alatt jelenjen meg. Ne ismételje meg a címet, és ne kapjon belső kártyákat. Hosszú szöveg legfeljebb 66ch széles legyen; a panel magassága természetesen növekedjen.
- A fejléc aktiválásakor a nyitás és a zárás 360 ms-os magasságátmenet és áttűnés (`--duration-disclosure`, `--ease`). Gyors ismételt aktiváláskor az átmenet az aktuális állapotból forduljon vissza. Közvetlen horgonyra navigáláskor és csökkentett mozgásnál nincs animáció.
- Csak az egész oldal görgethető; ne legyen belső görgetődoboz vagy lezárt háttér. Az animáció alatt is maradjon használható a görgetés, a billentyűzet és a hivatkozások.
- Minden szolgáltatás és csomag kapjon állandó, olvasható horgonyt. A közvetlen link a megfelelő leírást nyissa meg; a belső linkek és a böngészős Vissza/Előre a szokásos módon működjenek.
- A csomagok ára és részletfizetése mindig látszik. A mentorálás felépítése, gyakorisága, otthoni gyakorlatai és bővítése egy közös lenyitásban, rövid alcímek alatt szerepeljen. A részvétel és fizetés külön lenyitást kapjon. Nincs egymásba ágyazott accordion.
- A korábbi `/szolgaltatasok/` és `/csomagok/` címek a főoldal megfelelő részéhez vezessenek, a meglévő horgony megtartásával. A tartalomnak egyetlen szerkesztendő forrása legyen.

## Tartalombővítés

- Tartsd meg a főoldal sorrendjét: márka → Szonja → alkalmak → csomagok → kapcsolat. A szolgáltatásnevek és csomagárak láthatók, a hosszú leírások helyben lenyithatók legyenek.
- A színes mező rövid címet vagy alkalomszámot hordozzon. A leírás, feltételek és további adatok a kapcsolódó világos panelbe kerüljenek.
- Hosszabb szöveget rövid bekezdésekkel, szükség esetén alcímmel vagy listával tagolj. Ne készíts külön kártyát, címkét vagy ikont minden bekezdéshez.
- A panelek magassága igazodjon a tartalomhoz. Ne vágj le szöveget, és ne zsugorítsd a betűket azért, hogy több tartalom férjen egy sorba.
- Minden szolgáltatás leírásának végén a hozzá tartozó kapcsolatfelvételi vagy foglalási link legyen. A csomagokhoz egy közös egyeztetési link elegendő. Ne tegyél fölé általános felszólítást vagy újabb címet; további link csak eltérő, működő célponthoz kerüljön.
- Az egyeztetési és üzenetes jelentkezési gombok az oldalon belüli `#kapcsolat` szakaszra vezessenek. Itt a látogató válasszon Instagram, Facebook és e-mail között. A tényleges MotiBro-foglalás közvetlen link maradjon; a közösségi ikonok továbbra is a profilokat nyissák meg.
- A foglalási gomb felirata „Időpontfoglalás”. A felirat a látogató műveletét nevezze meg, ne a háttérben használt foglalórendszert; az új lap jelzése a hozzáférhető névben szerepeljen.
- A részletek bővülése ne szaporítsa automatikusan a lebegő menü pontjait. A menü a fő fejezetek között vezessen.
- Az új képek kövessék a meghatározott anyag- és színvilágot; a szolgáltatássorokhoz ne adj öncélú kivágott tárgyképeket.

## Lebegő menü és mozgás

- Az alsó, középre rögzített kapszulamenü mind az öt fő fejezetet tartalmazza: kezdés, Rólam, Alkalmak, Csomagok, Kapcsolat. A szolgáltatások alkategóriái az Alkalmak szakaszban szerepeljenek.
- Törtfehér felület, petrol szöveg, finom árnyék. Az aktív pont petrol hátterű és `aria-current="location"` attribútumot kap.
- A napikon külső vonala a görgetés előrehaladását jelöli.
- Mobilon legalább 16 px, asztalon 24 px távolság a nézet aljától; a safe area értékét is vedd figyelembe.
- Természetes görgetés; nincs wheel/touch felülírás, kötelező lapozás vagy hosszan rögzített szakasz. A görgetés leírásnyitás közben is maradjon természetes.
- A nyitókép legfeljebb 6%-kal nagyulhat, a kép és a felirat legfeljebb 2rem-et mozdulhat görgetés közben. A mozgás visszafelé is ugyanazt az útvonalat követi.
- Hover/fókusz visszajelzés 220–250 ms. Nincs folyamatos dekoratív animáció, automatikus hang, kurzorkövető effekt vagy hullámindító gomb.
- Görgetésenként legfeljebb egy `requestAnimationFrame`; nyugalomban és háttérben nincs animációs ciklus.

## Reszponzivitás és hozzáférhetőség

- 900 px alatt a bemutatkozás képes és szöveges oszlopa egymás alá rendeződik. 700 px alatt a csomagon belüli név és leírás is egymás alá kerül. A csomagok minden nézetben három sorban szerepelnek.
- `prefers-reduced-motion: reduce`, 740 px-nél alacsonyabb, 360 px-nél keskenyebb nézet vagy nagyított szöveg esetén nincs képmozgatás.
- 200%-os szövegnagyításkor egyoszlopos tartalom, természetes magasság és tördelhető címek. A menü ilyenkor a lap elejére kerülhet, hogy ne takarja a tartalmat.
- A teljes tartalom és minden hivatkozás JavaScript nélkül is használható. Képhiány esetén a háttérszínek biztosítsák az olvashatóságot.
- Legalább 44 × 44 CSS px célfelületek; jól látható billentyűzetfókusz és tartalomra ugró link.
- Az új lapon nyíló közösségi link hozzáférhető neve nevezze meg a platformot és jelezze az új lapot. A logó dekoratív SVG, a link nevét szöveg adja. Csak ellenőrzött profil használható; forrása az `ASSETS.md`-be kerüljön.
- Ellenőrzendő: 320 px, 390 px, tablet, nagy asztali, fekvő mobil, 200%-os szöveg, csökkentett mozgás, JavaScript és képek hiánya.

## Képek

- Szonjáról csak valódi, ellenőrzött kép használható.
- A hullám és a mészkő illusztráció, nem tényleges helyszín. Forrásuk és szerkesztési leírásuk: `ASSETS.md`.
- Reszponzív WebP, megadott méretek. A nyitókép elsőbbséggel, a többi késleltetve töltődjön.
- A mészkő alfa-csatornáját őrizd meg. Ne égess webes feliratot a képekbe.
- Dekoratív képen üres alt, jelentéssel bíró képen rövid magyar alt.
