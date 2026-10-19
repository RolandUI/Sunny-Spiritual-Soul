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
- A teljes név: **Vetor Szonja Mercédesz**. A névvel azonosító feliratokban, metaadatokban és képleírásokban ezt használd; a személyes bemutatkozás maradhat „Szonja vagyok.”.
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
- A **Sunny Spiritual Soul egyetlen, egyenrangú márkanév**. Ne emeld ki külön a Sunny szót. A nyitóképen és a láblécben az eredeti, teljes logót használd (`public/assets/logo.webp`), saját színeivel és változatlan arányaival. A márkanevet ne ismételd mellette nagy szöveges feliratként.
- A nyitóképi logó szélessége legfeljebb 30rem, a nézetmagasság 58%-a és a tartalmi szélesség közül a legkisebb. A láblécben apró, 3rem széles márkajelzésként jelenjen meg, legalább 44 px magas kattintható területtel. Petrol háttéren jelenjen meg; ne kapjon keretet, árnyékot, színszűrőt vagy animált torzítást. Az eredeti átlátszó PNG: `references/brand/logo-original.png`.
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
- A leírásokon belüli tagolást térköz, tipográfia és igazítás adja. Ne tegyél elválasztóvonalat az árak, módszerleírások vagy alkalomadatok köré és közé; ne váltsd ki őket újabb keretekkel, kártyákkal vagy váltakozó sávszínekkel.
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

1. **Nyitókép:** teljes szélességű petrol vízgrafika. A nyugodt felső részen középre rendezett eredeti logó; alatta Vetor Szonja Mercédesz neve, a holisztikus tanácsadás és a tevékenységek rövid felsorolása. A logó a `h1` része, „Sunny Spiritual Soul” képleírással. A hullám az alsó részt tölti ki. Keskeny nézetben a háttérkép bal-középső részlete látszódjon (`object-position: 12% 70%`), így a jobb oldali magas hullámcsúcs kikerül a feliratok mögül. A 700–899 px-es köztes nézetben további 32 px lefelé tolás biztosítson helyet a feliratoknak. 900 px-től a háttér kerete a nyitóképpel azonos méretű legyen, `object-fit: cover` és `object-position: 12% 40%` mellett. A `--hero-wave-offset` a nézet szélességéhez és magasságához igazodó, legfeljebb 128 px-es függőleges eltolás: nagy képernyőn 0, kisebb laptopon helyet hagy a feliratoknak. Ne legyen külön 35%-os felső eltolás vagy megnövelt képkeret: a víz az alsó részen végig látszódjon. Az eltolás felső illesztése csak a kép üres, sötét részén simuljon a háttérbe, az eltolás hosszával azonos átmenettel; ez a víz körvonalát nem érintheti. Ne takard le vagy halványítsd el a hullámot a szövegre tett háttérátmenettel; az olvashatóságot a kép pozíciója biztosítsa. Nincs felső menü vagy további gombsor.
2. **Rólam:** halvány zsálya háttéren közös, lekerekített törtfehér panel, valódi fotóval és rövid bemutatkozással. 1000 px-től a cím közös, teljes szélességű fejléc legyen; alatta a kép balra, a szöveg jobbra, egymáshoz függőlegesen középre igazítva jelenjen meg. A szövegoszlop kapjon több helyet (0,9 : 1,1 oszloparány). Kisebb nézetben kép → cím → szöveg sorrendben, közös, legfeljebb 36rem széles tengelyen jelenjenek meg. A címet a tartalomtól 24 px, asztalon 32 px tér válassza el. A fotó teljes, 3:2 arányú kompozíciója és eredeti vízjele maradjon meg; alatta ne ismétlődjön a név külön képaláírásként. A szakaszcím „Szonja vagyok.”, kézi sortörés nélkül; a menüpont „Rólam”. A bemutatkozás két összefüggő, azonos betűméretű bekezdésben vezessen a támogatás céljától a közös munka módszereihez, 16 px bekezdésközzel. A személyes, budapesti helyszín a bemutatkozás mondatába épüljön, ne kapjon külön feliratsort. A szöveg alatt a „Megnézem az alkalmakat” hivatkozás mellett külön, 48 × 48 px-es kör alakú Instagram- és Facebook-link legyen.
3. **Alkalmak:** petrol felület, finom kontúrvonalak. Három témablokk: Hangfürdők; Reiki és érintés; Önismeret és rítusok. Asztalon balra színes, íves csoportcím, jobbra közös törtfehér panel a szolgáltatások neveivel. 900 px alatt a csoportcím a lista fölé kerül. Minden szolgáltatás neve eleve látszik; a teljes sor helyben nyitja a hozzá tartozó leírást. Nincs külön választóképernyő, oldalsó szolgáltatásmenü vagy modal.
4. **Csomagok:** zsálya háttéren három vízszintes sor. Balra színes, íves alkalomszám; jobbra világos, lekerekített panelben név, rövid leírás, közös munka időtartama, teljes díj és részletfizetés. Hold – 4 alkalom; Föld – 8 alkalom; Pandora – 12 alkalom. Mobilon is maradjon egymás mellett a számmező és a tartalom, nagyított szövegnél egymás alá kerülhetnek. Alattuk két helyben nyitható sor: „A mentorálás menete” és „Részvétel és fizetés”, majd egy közös egyeztetési link. A mészkő a szakasz aljára igazított, abszolút pozicionált háttérkép legyen, `object-fit: contain` méretezéssel: a teljes képfájl férjen el vágás nélkül. Ne foglaljon külön helyet a dokumentumfolyamban; a szakasz magasságát a tartalom és a szokásos szakasztérköz adja. A tartalmi panelek és az egyeztetési gomb a hegy elé rétegződhetnek, olvasható, saját háttérrel.
5. **Kapcsolat:** petrol alap, középre rendezett „Kapcsolat” cím és rövid tájékoztatás az egyeztetésről. Két egyenrangú kapszulahivatkozás Instagram- és Facebook-logóval, látható platformnévvel. Alattuk a valódi e-mail-cím kattintható `mailto:` hivatkozás. Mobilon a kapszulák szükség szerint egymás alá törjenek. Ne legyen közösségi hírfolyam, ismételt profilnév, új lebegő eszköztár vagy további menüpont.

A szolgáltatásnevek natív lenyitó vezérlők, a csomagsorok szöveges tartalmak. A csomagsor ne kapjon kattinthatóságot sugalló hoverhatást. Ne mutass árlistát vagy eseménynaptárt igazolt, publikálásra szánt adatok nélkül.

A lábléc 700 px-től három oszlopból áll: balra a kezdőlapra vezető eredeti logó, középen „Vetor Szonja Mercédesz · Budapest”, jobbra az évszám. A két szélső oszlop egyforma széles legyen, hogy a középső szöveg az oldal középvonalára kerüljön. Mobilon és nagyított szövegnél a három elem egymás alatt, középre igazítva jelenjen meg. A logólink hozzáférhető neve jelezze a márkát és a visszalépés célját.

## Helyben nyíló részletek

- Minden leírás, díj és feltétel a főoldal statikus HTML-jében legyen. Ne tölts be tartalmat kattintáskor; ne legyen betöltőállapot, felugró ablak vagy külön részletnézet.
- A szolgáltatások egyetlen szintű, natív `details` / `summary` sorok. A három témacsoportban 5, 3 és 5 szolgáltatás látható; a csoportokat nem kell előbb lenyitni.
- A szolgáltatások közül egyszerre egy leírás lehet nyitva. A `name` attribútum JavaScript nélkül is biztosítsa ezt. A csomagok két részletező sora külön csoportot alkot.
- A sor megnyitása vagy bezárása ne navigáljon, és ne adjon új bejegyzést az előzményekhez. Nyitáskor a fejléc a lenyitással együtt görgessen a nézet tetejéhez, a közös felső görgetési térköz megtartásával. Közben kompenzálja a korábbi leírás összehúzódását. Bezáráskor maradjon a fejléc a helyén. A kézi görgetés vagy új billentyűzetes művelet szakítsa meg az automatikus odagörgetést. A fókusz maradjon a működtetett fejlécen; csökkentett mozgásnál az igazítás azonnali legyen.
- A teljes fejléc aktiválható egérrel, érintéssel, Enterrel és Szóközzel. Plusz/mínusz jel mutassa a nyitási állapotot; a billentyűzetfókusz látszódjon.
- A szolgáltatásnevek Lora betűvel, 1,125rem méretben szerepeljenek. A csoportcím Cinzel Decorative, `clamp(1.625rem,2.5vw,2rem)`. Címsorhierarchia: szakasz `h2`, témacsoport `h3`, szolgáltatás `h4`.
- A zárt sor törtfehér. A nyitott sor fejléce és leírása egységes, halvány zsályás felület (`--color-expanded`), petrol szöveggel; ne legyen külön sötétebb fejléccsík. A nyitott állapotot a színkülönbség mellett a mínuszjel és a megjelenő tartalom jelzi. A csoport külső lekerekítései maradjanak meg.
- A zárt sor hoverállapota a világos zsálya 20%-os áttetsző rétege legyen; maradjon halványabb a nyitott sor kiemelésénél.
- A leírás közvetlenül a saját címe alatt jelenjen meg. Ne ismételje meg a címet, és ne kapjon belső kártyákat. Hosszú szöveg legfeljebb 66ch széles legyen; a panel magassága természetesen növekedjen.
- A fejléc aktiválásakor a nyitás és a zárás 360 ms-os magasságátmenet és áttűnés (`--duration-disclosure`, `--ease`). Gyors ismételt aktiváláskor az átmenet az aktuális állapotból forduljon vissza. Közvetlen horgonyra navigáláskor és csökkentett mozgásnál nincs animáció.
- Csak az egész oldal görgethető; ne legyen belső görgetődoboz vagy lezárt háttér. Az animáció alatt is maradjon használható a görgetés, a billentyűzet és a hivatkozások.
- Minden szolgáltatás és csomag kapjon állandó, olvasható horgonyt. A közvetlen link a megfelelő leírást nyissa meg; a belső linkek és a böngészős Vissza/Előre a szokásos módon működjenek.
- A csomagok ára és részletfizetése mindig látszik. A mentorálás felépítése, gyakorisága, otthoni gyakorlatai és bővítése egy közös lenyitásban, rövid alcímek alatt szerepeljen. A részvétel és fizetés külön lenyitást kapjon. Nincs egymásba ágyazott accordion.
- Az alkalmak díjai a saját lenyitott leírásukban, a kapcsolatfelvétel előtt jelenjenek meg. A `.session-prices` leírólista bal oszlopa az időtartam vagy részvételi változat, jobb oszlopa az ár. Az összeget és a pénznemet tartsd együtt; nagyított szövegnél a két oszlop egymás alá kerülhet. A sorok között 16 px, a családi változatok csoportjai között 32 px szabad tér legyen, elválasztóvonalak, újabb lenyitó és külön árkártyák nélkül. A módszerleírásokat, alkalomadatokat és díjakat 32 px külső térköz tagolja.
- A négyalkalmas szolgáltatásdíj és a komplex mentorálás ára külön ajánlat. A konzultáció négyalkalmas díját ne nevezd Hold csomagnak. Az árakat, a „Ft/fő” és „Ft-tól” feltételeket kizárólag az átadott árlisták alapján add meg.
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

- A menüpontok 4 px-es közét és legfeljebb 24 px-es vízszintes belső térközét addig tartsd meg, amíg elférnek. A `--nav-gap` és `--nav-item-padding` a nézetszélességgel fokozatosan csökkenjen; ne a 700 px-es töréspontnál váljon hirtelen sűrűvé a menü. A legkisebb nézetekben a köz 0 px-ig, a belső tér 4 px-ig csökkenhet.

- Az alsó, középre rögzített kapszulamenü mind az öt fő fejezetet tartalmazza: kezdés, Rólam, Alkalmak, Csomagok, Kapcsolat. A szolgáltatások alkategóriái az Alkalmak szakaszban szerepeljenek.
- Törtfehér felület, petrol szöveg, finom árnyék. Az aktív pont petrol hátterű és `aria-current="location"` attribútumot kap.
- Az aktív háttér egyetlen, közös petrol kapszula legyen: 300 ms alatt (`--duration-nav`, `--ease`) csússzon át az új menüpontra, annak szélességéhez és magasságához igazodva. Ne tűnjön el vagy villanjon fel váltáskor. Gyors irányváltásnál az aktuális helyzetből folytassa a mozgást. Első megjelenéskor és csökkentett mozgásnál azonnal kerüljön a helyére; átméretezés és betűbetöltés után is kövesse a gomb méretét. A háttér ne takarja a szöveget vagy a billentyűzetfókuszt.
- Menüpont aktiválásakor a háttér közvetlenül a választott célra mozogjon. Az odagörgetés közben érintett köztes szakaszok ne indítsák újra az animációját. A cél elérésekor vagy a görgetés kézi megszakításakor térjen vissza az aktuális szakasz követéséhez; új menüpont aktiválása azonnal váltsa le a korábbi célt. A horgony, az előzmények és a billentyűzetes navigáció natív működése maradjon meg.
- A kezdőlap gombjában visszafogott, 30 px-es vonalas napikon legyen (`--nav-icon-size`), ne a részletes márkalogó vagy meditáló sziluett. Színe a gomb szövegszínét kövesse. A külső vékony kör a görgetés előrehaladását jelöli. A kattintható terület legalább 44 × 44 px, hozzáférhető neve „Kezdés”.
- Mobilon legalább 16 px, asztalon 24 px távolság a nézet aljától; a safe area értékét is vedd figyelembe.
- Természetes görgetés; nincs wheel/touch felülírás, kötelező lapozás vagy hosszan rögzített szakasz. A görgetés leírásnyitás közben is maradjon természetes.
- A nyitókép legfeljebb 6%-kal nagyulhat, a kép és a felirat legfeljebb 2rem-et mozdulhat görgetés közben. A mozgás visszafelé is ugyanazt az útvonalat követi.
- Hover/fókusz visszajelzés 220–250 ms. Nincs folyamatos dekoratív animáció, automatikus hang, kurzorkövető effekt vagy hullámindító gomb.
- Görgetésenként legfeljebb egy `requestAnimationFrame`; nyugalomban és háttérben nincs animációs ciklus.

## Reszponzivitás és hozzáférhetőség

- 1000 px alatt a bemutatkozás képes és szöveges oszlopa egymás alá rendeződik. 700 px alatt a csomagon belüli név és leírás is egymás alá kerül. A csomagok minden nézetben három sorban szerepelnek.
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
