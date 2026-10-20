# Sunny Spiritual Soul – designirányelvek

Ez a dokumentum a tartós arculati és UX-elveket rögzíti. Csak ezek változásakor bővítsd; javítási előzmény, munkanapló, képernyőméretenkénti finomhangolás és kódleírás ne kerüljön ide. A pontos tokenek és komponensstílusok forrása a `public/styles.css`, a képeké az `ASSETS.md` és a `references/brand/`.

## Arculat

- Mély petrol, tompa zsálya és törtfehér felületek; ezüstös víz, világos mészkő és visszafogott organikus kontúrvonalak.
- A referencia kapcsolódó mezőit kövesd: színes, íves fej- vagy számmezőhöz illesztett világos tartalmi panel. Nagy, összefüggő, lekerekített felületekkel dolgozz.
- A **Sunny Spiritual Soul** egyetlen, egyenrangú márkanév. Az eredeti logót változatlan arányokkal és színekkel használd: hangsúlyosan a nyitóképen, apró jelzésként a láblécben.
- A teljes név **Vetor Szonja Mercédesz**. Szonját valódi fotó képviselje, az eredeti kompozíció és vízjel megőrzésével.
- A hullám a nyitó szekció, a mészkő a Csomagok képi eleme. A hullám pozíciója biztosítsa a feliratok olvashatóságát, ne a kép elhalványítása. A hegy vágás nélkül, a tartalom mögött jelenjen meg, külön üres szakasz nélkül.

## Tipográfia és felületek

- **Cinzel Decorative:** címek.
- **Lora:** törzsszöveg, szolgáltatásnevek és a nyitókép logó alatti szövegei.
- **Manrope:** navigáció, gombok, árak és rövid kezelőfelületi címkék.
- A színeket, méreteket, térközöket és lekerekítéseket a közös CSS-tokenekből vedd. Használd újra a meglévő komponenseket.
- Legyen következetes igazítás, kényelmes sorköz és jól olvasható szövegszélesség. A panelek igazodjanak a tartalomhoz; a szöveget ne zsugorítsd vagy vágd le a helyhiány miatt.
- A tagolást elsősorban térköz és tipográfia adja. Kerüld a dekoratív elválasztókat, ismétlődő nyilakat, belső kártyákat és címkéket. Árnyék csak a lebegő menün szükséges.
- A nyitott részletek egységes, halvány zsályás hátteret kapjanak, petrol szöveggel és egyértelmű állapotjelzéssel.

## Oldalszerkezet

A főoldal rövid áttekintést adjon; a részletek helyben legyenek elérhetők.

1. **Nyitókép:** eredeti logó, név és rövid felsorolás a hullámos háttéren.
2. **Rólam:** valódi fotó és összefüggő, személyes bemutatkozás egy közös világos panelben. Széles nézetben kiegyensúlyozott kép–szöveg elrendezés, keskeny nézetben egy oszlop. Kapcsolódjon hozzá a szolgáltatások hivatkozása és a közösségi profilok.
3. **Szolgáltatások:** Hangfürdők; Reiki és érintés; Önismeret és rítusok. A szolgáltatásnevek mindig látszanak, a leírás és az ár a saját sor alatt nyílik ki.
4. **Csomagok:** egymás alatti ajánlatok, színes alkalomszámmal és világos tartalmi panellel. A teljes ár és a részletfizetés mindig látható; a folyamat és a részvételi feltételek lenyithatók.
5. **Tudnivalók:** önálló, világos szekció a Csomagok után, egyoszlopos, lenyitható kérdésekkel. Ne használja a szolgáltatáskategóriák oldalsó címmezőjét.
6. **Kapcsolat:** jól látható Instagram-, Facebook- és e-mail-elérhetőség. A lábléc visszafogott, kiegyensúlyozott és középre igazított legyen.

## Navigáció és működés

- Egyetlen alsó, lebegő kapszulamenü vezessen a fő fejezetekhez: Kezdőlap, Rólam, Szolgáltatások, Csomagok, Tudnivalók, Kapcsolat. A kezdőlapot visszafogott vonalas napikon jelölje.
- A menü maradjon szellős, amíg van hely; mobilon egy kompakt „Menü” gomb nyisson fölötte egy egyoszlopos panelt az összes fejezettel. Választáskor, Escape-re vagy a menün kívülre lépve a panel záródjon be. A menüpontok és a célfejezetek neve egyezzen meg. Az aktív háttér folyamatosan csússzon a választott pontra, köztes megállások nélkül.
- A szolgáltatások helyben, egyetlen szintű lenyitással működjenek, modal és külön részletoldal nélkül. Egyszerre egy szolgáltatás legyen nyitva; a csomagok részletei külön csoportot alkossanak.
- A nyitás és zárás legyen finoman animált. Nyitáskor a fejléc kerüljön a nézet tetejére; a kézi görgetés megszakíthassa az automatikus mozgást. Bezáráskor ne ugorjon el a tartalom.
- Maradjon természetes az oldal görgetése. Ne legyen belső görgetődoboz, görgetést átvevő effekt vagy folyamatos dekoratív animáció.
- A részletek közvetlenül hivatkozhatók legyenek, és a böngészős Vissza/Előre működjön kiszámíthatóan.
- Az egyeztetési gombok a Kapcsolat szakaszra vezessenek, ahol a látogató csatornát választhat. A tényleges foglalási link közvetlenül a foglalásra mutasson, „Időpontfoglalás” felirattal.

## Szöveg és tartalom

- Magyar, tegeződő, természetes szöveg; a bemutatkozás egyes szám első személyben szóljon. A bekezdések gondolatai kapcsolódjanak egymáshoz.
- Minden mondat adjon információt vagy segítsen dönteni. Kerüld a töltelékszöveget, az általános spirituális ígéreteket, a kezelőfelület magyarázását és a technikai platformneveket a cselekvési feliratokban.
- Csak igazolt üzleti adat, ár, időpont és állítás szerepeljen. A szolgáltatásbérleteket és a komplex mentorálási csomagokat egyértelműen különböztesd meg.
- Új tartalom a meglévő szerkezetbe illeszkedjen; ne növelje indokolatlanul a főoldal hosszát, a menüpontok számát vagy a vizuális zajt.

## Reszponzivitás és hozzáférhetőség

- Mobilból kiinduló, tartalomhoz igazodó elrendezés. A köztes szélességeken is legyen rendezett; ne csak mobilon és nagy asztalon működjön.
- Biztosíts megfelelő kontrasztot, látható billentyűzetfókuszt, szemantikus címsorokat és legalább 44 × 44 px-es érintési célokat.
- Nagyított szövegnél ne vesszen el tartalom, és a lebegő menü ne takarja a kezelőelemeket. A csökkentett mozgás beállítását tartsd tiszteletben.
- A tartalom és a hivatkozások JavaScript nélkül is használhatók legyenek. Képhiány esetén is maradjon olvasható az oldal; a dekoratív képek ne kapjanak felolvasott leírást.
