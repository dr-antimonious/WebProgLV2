# LV 2 zadatak - JavaScript komandne aplikacije

Zadatak je napraviti command line JavaScript aplikaciju koja će simulirati košaricu u web stranici za trgovinu. Sučelje, specifikaciju i rad aplikacije morate dizajnirati sami. Obratite pozornost na lakoću korištenja aplikacije. Npr. možda je lakše korisniku upisati “kupi patike” nego “kupi item-125sa4134d”, ili je možda dobra značajka imati mogućnost pretrage proizvoda. 

Dizajn sučelja, sigurnost (provjera greški i sl.), lakoća korištenja (dizajn sučelja, korisne greške, postoji li “help” komanda i sl.) i potpunost rješenja će se bodovati.

Minimalni zahtjevi su da korisnik može vidjeti popis svih artikala, vidjeti svoju košaricu, dodavati i brisati artikle iz košarice te kupiti sve odabrane proizvode (ako za to ima novaca). Svaku komandu/akciju je potrebno definirati u zasebnoj funkciji.

U **main.js** postoji kod kojeg možete koristiti kao početnu točku za razvoj aplikacije.

Nakon što je aplikacija izrađena, potrebno je napisati dokumentaciju (uređivanjem ovog README dokumenta) koja opisuje sve moguće komande, njihove argumente i što obavljaju ili vraćaju. Npr.

> buy 
> > Add an item with the specified name to the cart. Will search list of items (case insensitive) by the name. If no matching item is found, returns an error. 

Osim toga, potrebno je opisati općeniti dizajn komandne aplikacije, na što ste obraćali pozornost te generalne upute kako koristiti aplikaciju. Zamislite da pišete README za javni GitHub repozitorij vaše aplikacije.

## Pokretanje JavaScript komandnih aplikacija

Potrebno je instalirati Node: [https://nodejs.dev/en/](https://nodejs.dev/en/)

Nakon instalacije, moguće je pokretati JavaScript datoteke iz terminala:

```shell
node main.js
```

## Resursi

Ideje o tome kako dizajnirati komandno sučelje

- [https://clig.dev/#guidelines](https://clig.dev/#guidelines)
- [https://www.makeareadme.com](https://www.makeareadme.com/)

JavaScript osnove:

- [https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- [https://javascript.info/first-steps](https://javascript.info/first-steps)
