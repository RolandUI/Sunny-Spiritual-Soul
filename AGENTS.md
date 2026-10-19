# Fejlesztési szabályok

## Megvalósítás

- Végezd el a kért feladatot végig. Rutin megvalósítási döntésekhez ne kérj megerősítést.
- A legkisebb helyes változtatást készítsd; ne adj hozzá kéretlen funkciót, és ne refaktorálj kapcsolódás nélküli kódot.
- Módosítás előtt olvasd el az érintett kódot és ellenőrizd a Git-változásokat. Más munkáját ne írd felül.
- Kövesd a meglévő elnevezéseket, kódstílust, nullkezelést, aszinkron és hibakezelési mintákat.
- Használd újra a meglévő komponenseket. Új függőséget vagy absztrakciót csak konkrét szükséglethez vezess be.
- Statikus, Cloudflare Pages-en kiszolgálható oldalt készíts. Ne vezess be szerveroldali futtatást; a publikálható kimenet a `dist/` könyvtár.

## Felület és tartalom

- UI-munka előtt olvasd el és kövesd a [DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md) dokumentumot.
- A színeket, betűméreteket és térközöket közös tokenekből használd; ne definiáld őket komponensenként újra.
- Mobilból kiinduló, reszponzív felületet készíts szemantikus HTML-lel és billentyűzettel használható vezérlőkkel.
- A weboldal szövege magyar legyen, helyes ékezetekkel. Fájlkódolás: UTF-8.
- Ne találj ki üzleti adatot, árat, időpontot, ügyfélvéleményt, végzettséget vagy gyógyhatást.
- Hiányzó eredeti kép helyett használhatsz cserélhető illusztrációt; ne tüntesd fel Szonja, ügyfél vagy tényleges helyszín fotójaként.
- Ne hagyj üres hivatkozást, hatástalan gombot vagy működőnek álcázott űrlapot. Sikerjelzést csak sikeres művelet után mutass.

## Ellenőrzés

- Futtasd a módosításhoz tartozó lintet, típusellenőrzést, teszteket és buildet, ha a projektben elérhetők.
- Viselkedésváltozáshoz írj célzott tesztet; egyszerű szöveg- vagy stílusmódosításhoz ne gyárts felesleges teszteket.
- UI-változást ellenőrizz böngészőben mobilon és asztali nézetben, billentyűzettel, valamint az érintett üres és hibaállapotokkal.
- Az el nem végzett ellenőrzést nevezd meg; ne jelents ellenőrizetlen sikert.

## Kommunikáció és dokumentáció

- Válaszolj a felhasználó nyelvén, röviden: eredmény, módosítások, ellenőrzés. Ne ismételd meg a kérést, ne írj töltelékszöveget.
- Ha valami nem állapítható meg a kódból vagy a forrásokból, mondd ki; ne találgass tényként.
- Ebbe a fájlba csak tartós, végrehajtható szabály kerüljön. Projektállapotot, munkanaplót és elkészült feladatok listáját ne írj ide.
- Arculati döntést a DESIGN_GUIDELINES.md fájlban vezess át, ne duplikáld itt.
