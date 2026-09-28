'use strict';
/* Everything the page says, in English and German. Every fact comes from the master CV. */
const T=(en,de)=>({en,de});

const UI={
  play:T('Play the story','Story abspielen'), stop:T('Stop','Stopp'), replay:T('↻ replay','↻ nochmal'),
  prev:T('Previous','Zurück'), next:T('Next','Weiter'), email:T('Email','E-Mail'),
  hint:T('Scroll, swipe or use ← →','Scrollen, wischen oder ← → nutzen'),
  timeline:T('Timeline','Zeitleiste'), profile:T('Profile','Profil'), story:T('My story','Meine Story'),
  skills:T('Stack & skills','Stack & Kenntnisse'), today:T('today','heute'),
  storyStep:T('My story, step by step','Meine Story, Schritt für Schritt'), playShort:T('Play it · 3 min','Abspielen · 3 Min.'),
  storyNote:T('Click a milestone to jump into that part of the story.','Ein Klick auf einen Meilenstein führt direkt in diesen Teil der Story.'),
  storyHead:T('Five years, step by step.','Fünf Jahre, Schritt für Schritt.'), job:T('Jobs','Jobs'), ownSys:T('Own systems','Eigene Systeme'),
  back:T('Back to the profile','Zurück zum Profil'), again:T('Watch again','Nochmal ansehen'),
  enlarge:T('Enlarge','Vergrößern'), close:T('Close','Schließen')
};

// ---------------- the profile: what a recruiter reads first ----------------
const PROFILE={
  name:'Hussein Altaka',
  role:T('Backend / Full Stack Developer','Backend / Full Stack Developer'), focus:'Python &amp; Django',
  contact:[
    {kind:'mail',label:'hussinthamer211@gmail.com',href:'mailto:hussinthamer211@gmail.com'},
    {kind:'linkedin',label:'LinkedIn',href:'https://www.linkedin.com/in/hosin211'},
    {kind:'github',label:'GitHub',href:'https://github.com/hosin211'}
  ],
  summary:T(
    'Backend-focused full-stack engineer, 5 years of production Python and Django. At Apicbase, a Belgian food-tech SaaS serving 500+ client locations, I build backend systems and APIs with Django, PostgreSQL, Celery and AWS. Outside the day job I built, and run on my own, the systems behind two power plants and every college of Al-Nahrain University.',
    'Full-Stack-Entwickler mit Schwerpunkt Backend und 5 Jahren Python und Django im Produktivbetrieb. Bei Apicbase, einem belgischen Food-Tech-SaaS mit über 500 Kundenstandorten, entwickle ich Backend-Systeme und APIs mit Django, PostgreSQL, Celery und AWS. Daneben habe ich allein die Systeme gebaut, auf denen zwei Kraftwerke und alle Fakultäten der Al-Nahrain University laufen, und betreibe sie selbst.'),
  facts:[
    [T('Experience','Erfahrung'),T('5 years of production Python &amp; Django','5 Jahre Python &amp; Django im Produktivbetrieb')],
    [T('Now','Aktuell'),T('Full Stack Developer, Apicbase (Belgium, remote)','Full Stack Developer, Apicbase (Belgien, remote)')],
    [T('Own systems','Eigene Systeme'),T('Al-Nahrain University, every college · Keppt, two power plants','Al-Nahrain University, alle Fakultäten · Keppt, zwei Kraftwerke')],
    [T('Based in','Standort'),T('Baghdad, Iraq','Bagdad, Irak')],
    [T('Education','Studium'),T('B.Sc. Systems Engineering, Al-Nahrain University','B.Sc. Systems Engineering, Al-Nahrain University')],
    [T('Languages','Sprachen'),T('Arabic native · English C1 · German A1, learning','Arabisch Muttersprache · Englisch C1 · Deutsch A1, im Aufbau')]
  ],
  skills:[
    {h:T('Languages','Programmiersprachen'),items:[['Python',T('5 y','5 J.')],['JavaScript'],['SQL'],['HTML / CSS']]},
    {h:T('Frameworks','Frameworks'),items:[['Django',T('5 y','5 J.')],['Django REST Framework',T('3+ y','3+ J.')],['Celery']]},
    {h:T('Databases','Datenbanken'),items:[['PostgreSQL',T('5 y','5 J.')],['Redis',T('2 y','2 J.')],['Elasticsearch',T('1 y','1 J.')]]},
    {h:T('Infrastructure','Infrastruktur'),items:[['AWS: SQS, Redshift, read replicas'],['Linux'],['Docker'],['CI/CD'],['Git'],['Datadog'],['Rollbar']]},
    {h:T('Frontend','Frontend'),items:[['Vue.js 3',T('2 y','2 J.')],['HTMX',T('3+ y','3+ J.')],['JavaScript']]},
    {h:T('Testing · AI tools','Tests · KI-Werkzeuge'),items:[['TDD'],['Django unittest'],['Coverage'],['Claude Code',T('daily','täglich')]]}
  ],
  // three numbers worth a click: each opens the story at the step behind it
  proof:[
    {v:'500+',l:T('client locations on the platform I work on','Kundenstandorte auf der Plattform, an der ich arbeite'),go:'clients',tone:'ind'},
    {v:'&lt;1 s',l:T('slowest inventory pages, down from 25 s','langsamste Bestandsseiten, vorher 25 s'),go:'speed',tone:'ind'},
    {v:'2',l:T('power plants run on the system I built','Kraftwerke laufen auf dem System, das ich gebaut habe'),go:'keppt',tone:'amb'}
  ],
  // the career as milestones on one line, in the order they began: jobs above it, own systems below it
  milestones:[
    {go:'al-hadi',side:'up',tone:'teal',dates:'08/2021 – 05/2023',name:'Al-Hadi University College',
      role:T('Software Developer, then led the software unit','Software Developer, dann Leitung der Software-Abteilung'),
      hi:[T('Platform V1, solo','Plattform V1, allein'),T('First server','Erster Server'),T('Paper admissions gone','Papieranträge abgeschafft')]},
    {go:'al-nahrain',side:'down',tone:'amb',dates:T('2023 → today','2023 → heute'),name:'Al-Nahrain University',
      role:T('Own system, built alone','Eigenes System, allein gebaut'),
      hi:[T('Started in one college','Start in einer Fakultät'),T('Now every college','Heute alle Fakultäten')]},
    {go:'apicbase',side:'up',tone:'ind',dates:T('05/2023 → today','05/2023 → heute'),name:'Apicbase',badge:T('Year 4','Jahr 4'),
      role:T('Full Stack Developer · Belgium, remote','Full Stack Developer · Belgien, remote'),
      hi:[T('500+ client locations','500+ Kundenstandorte'),T('Real-time stock pipeline','Echtzeit-Bestands-Pipeline'),T('25 s → &lt;1 s','25 s → &lt;1 s')]},
    {go:'keppt',side:'down',tone:'amb',dates:T('2023 → today','2023 → heute'),name:'Keppt · KMS',
      role:T('Own system, built alone','Eigenes System, allein gebaut'),
      hi:[T('Two power plants','Zwei Kraftwerke'),T('200+ engineers each','Je 200+ Ingenieure')]},
    {today:true,side:'up',tone:'ink',dates:T('Today','Heute'),name:T('Still building.','Und es geht weiter.'),
      role:T('Year 4 at Apicbase, and both of my systems still running.','Im vierten Jahr bei Apicbase, und beide Systeme laufen weiter.')}
  ]
};

// ---------------- the story ----------------
// Chapters open a span on the time axis; the beats inside a span keep their order, not a date.
const LANES=[
  {id:'alhadi',lane:1,from:2021.58,to:2023.37,tone:'teal',label:T('Al-Hadi · 2021–23','Al-Hadi · 2021–23'),short:'Al-Hadi'},
  {id:'apicbase',lane:1,from:2023.37,to:null,tone:'ind',label:T('Apicbase · 2023 → today','Apicbase · 2023 → heute'),short:'Apicbase'},
  {id:'own',lane:2,from:2023.0,to:null,tone:'amb',label:T('Own systems · 2023 → today','Eigene Systeme · 2023 → heute'),short:T('Own systems','Eigene Systeme')}
];

const SLIDES=[
  {id:'story',group:'start',type:'intro',tone:'teal',scene:'map',
    kick:T('My story · 2021 → today','Meine Story · 2021 → heute'), title:T('Five years, <span class="acc">step by step.</span>','Fünf Jahre, <span class="acc">Schritt für Schritt.</span>'),
    sub:T('The day job: a college in Baghdad, then a Belgian SaaS, remote. Alongside it, production systems I built and still run on my own.',
          'Im Job: erst eine Hochschule in Bagdad, dann ein belgisches SaaS, remote. Daneben Produktivsysteme, die ich allein gebaut habe und bis heute betreibe.'),
    aria:T('A timeline from 2021 to today: Al-Hadi University College, then Apicbase, and alongside it, own systems from 2023.','Eine Zeitleiste von 2021 bis heute: Al-Hadi University College, dann Apicbase, und daneben ab 2023 eigene Systeme.')},

  {id:'al-hadi',group:'alhadi',type:'chapter',tone:'teal',num:'2021',
    kick:T('Chapter 01 · Baghdad','Kapitel 01 · Bagdad'), title:T('Al-Hadi University College','Al-Hadi University College'),
    meta:T('08/2021 – 05/2023 · <b>Software Developer</b> · Higher education','08/2021 – 05/2023 · <b>Software Developer</b> · Hochschule')},

  {id:'platform',group:'alhadi',type:'beat',tone:'teal',scene:'platform',
    kick:T('The platform','Die Plattform'), title:T('Built the college platform. Solo.','Die Hochschulplattform gebaut. Allein.'),
    sub:T('V1 of the college management platform, from the first model to production. Then the public website, rebuilt from scratch: <em>legacy PHP to Django</em>, a full UX redesign, with admissions built in.',
          'Version 1 der Verwaltungsplattform der Hochschule, vom ersten Datenmodell bis in den Produktivbetrieb. Danach die öffentliche Website, komplett neu gebaut: <em>von altem PHP zu Django</em>, mit neuem UX-Design und integrierter Bewerbung.'),
    chips:[['Django',8.2],['Python',8.3],['HTMX',8.4],['PostgreSQL',8.5]],
    aria:T('Code turns into the college platform module by module: students, results, fees, documents. Then the old PHP website gives way to a new Django site with online admissions.','Aus Code entsteht Modul für Modul die Hochschulplattform: Studierende, Noten, Gebühren, Dokumente. Danach weicht die alte PHP-Website einer neuen Django-Seite mit Online-Bewerbung.')},

  {id:'server-room',group:'alhadi',type:'beat',tone:'teal',scene:'server',
    kick:T('The server room','Der Serverraum'), title:T('Set up the first server. Alone.','Den ersten Server aufgesetzt. Allein.'),
    sub:T('<em>Hardware, Linux, provisioning</em>, then both the website and the platform deployed on it. Sentry for errors, DNS moved to Cloudflare.',
          '<em>Hardware, Linux, Provisioning</em>, dann Website und Plattform darauf ausgerollt. Sentry für Fehler, DNS zu Cloudflare umgezogen.'),
    checks:[[T('First server, live','Erster Server, live'),4.6],[T('Then the switch','Dann der Switch'),8.4],[T('Then the whole rack','Dann das ganze Rack'),11.1]],
    chips:[['Linux',11.35],['Sentry',11.45],['Cloudflare DNS',11.55]],
    aria:T("In an empty server room, Hussein racks the college's first server, then the switch, then fills the whole rack.",'In einem leeren Serverraum baut Hussein den ersten Server der Hochschule ein, dann den Switch, dann das ganze Rack.')},

  {id:'admissions',group:'alhadi',type:'beat',tone:'teal',scene:'admissions',
    kick:T('Admissions','Zulassung'), title:T('Paper admissions, gone.','Schluss mit Papieranträgen.'),
    sub:T('An online portal replaced paper admissions, end to end.','Ein Online-Portal hat die Papieranträge ersetzt, von Anfang bis Ende.'),
    stat:{count:2000,at:1.6,run:[1.8,4.6],label:T('students a year','Studierende pro Jahr'),tone:'amb'},
    aria:T('Stacks of paper forms fly into the online portal, and a grid of 200 dots, each one ten students, fills up.','Stapel von Papierformularen fliegen ins Online-Portal, und ein Raster aus 200 Punkten, jeder für zehn Studierende, füllt sich.')},

  {id:'campus',group:'alhadi',type:'beat',tone:'teal',scene:'campus',
    kick:T('The whole university','Die ganze Hochschule'), title:T('University-wide in one academic year.','In einem Studienjahr hochschulweit im Einsatz.'),
    sub:T('Results, fees and documents moved onto the platform. <em>Card payments for student fees</em>, among the first universities in Iraq, with a payroll pipeline behind it: fingerprint attendance, salary calculation, month-end payment instructions to the bank.',
          'Noten, Gebühren und Dokumente liefen über die Plattform. <em>Kartenzahlung für Studiengebühren</em>, als eine der ersten Hochschulen im Irak, dahinter eine Gehaltsabrechnung: Zeiterfassung per Fingerabdruck, Gehaltsberechnung und Zahlungsanweisungen an die Bank zum Monatsende.'),
    aria:T('Five parts of the college join the platform one by one within one academic year, and card payments reach the fees office.','Fünf Bereiche der Hochschule schließen sich innerhalb eines Studienjahres nacheinander der Plattform an, und Kartenzahlungen erreichen die Gebührenstelle.')},

  {id:'team',group:'alhadi',type:'beat',tone:'teal',scene:'team',
    kick:T('The team','Das Team'), title:T('Then I led the unit.','Dann habe ich die Abteilung geleitet.'),
    sub:T('The Software Systems &amp; Networks Unit: <em>a team of 3 engineers</em>, backend, frontend and mobile.','Die Abteilung Softwaresysteme &amp; Netzwerke: <em>ein Team aus 3 Entwicklern</em>, Backend, Frontend und Mobile.'),
    aria:T('An org chart: the unit lead on top, with backend, frontend and mobile engineers below.','Ein Organigramm: oben die Leitung der Abteilung, darunter die Entwickler für Backend, Frontend und Mobile.')},

  {id:'apicbase',group:'apicbase',type:'chapter',tone:'ind',num:'2023',
    kick:T('Chapter 02 · Belgium, remote','Kapitel 02 · Belgien, remote'), title:T('Apicbase','Apicbase'), badge:T('YEAR 4','JAHR 4'),
    meta:T('Food-tech SaaS · 05/2023 → today · <b>Full Stack Developer</b>','Food-Tech-SaaS · 05/2023 → heute · <b>Full Stack Developer</b>')},

  {id:'remote',group:'apicbase',type:'beat',tone:'ind',scene:'move',
    kick:T('05/2023 · The move','05/2023 · Der Wechsel'), title:T('A Belgian SaaS. <span class="acc">Remote.</span>','Ein belgisches SaaS. <span class="acc">Remote.</span>'),
    sub:T('Still at my desk in Baghdad. The work goes to Belgium, and this is my fourth year.','Weiter an meinem Schreibtisch in Bagdad. Die Arbeit geht nach Belgien, inzwischen im vierten Jahr.'),
    aria:T('A line arcs from a desk in Baghdad to an office in Belgium, and the years count up to year four.','Eine Linie spannt sich von einem Schreibtisch in Bagdad zu einem Büro in Belgien, und die Jahre zählen bis zum vierten.')},

  {id:'clients',group:'apicbase',type:'beat',tone:'ind',scene:'restaurants',
    kick:T('The clients','Die Kunden'),
    title:T('<span class="num" data-count="500" data-count-at="0.3,2.9">500+</span> client locations.','<span class="num" data-count="500" data-count-at="0.3,2.9">500+</span> Kundenstandorte.'),
    sub:T('Restaurant kitchens that run their stock, recipes and orders on one multi-tenant Django platform. <em>I work across the whole stack.</em>','Restaurantküchen, die Bestand, Rezepte und Bestellungen auf einer mandantenfähigen Django-Plattform führen. <em>Ich arbeite über den ganzen Stack.</em>'),
    aria:T('A city full of restaurants lights up, then the camera zooms into one of them.','Eine Stadt voller Restaurants leuchtet auf, dann zoomt die Kamera in eines davon.')},

  {id:'stock-pipeline',group:'apicbase',type:'beat',tone:'ind',scene:'pipeline',
    kick:T('The stock pipeline','Die Bestands-Pipeline'), title:T('The real-time stock pipeline.','Die Echtzeit-Bestands-Pipeline.'),
    sub:T('I own it, and every client runs on it. I moved it off the request path onto an <em>ordered event queue</em>: requests come back right away, and stock updates in order behind them.',
          'Ich verantworte sie, und jeder Kunde läuft darauf. Ich habe sie aus dem Request-Pfad in eine <em>geordnete Event-Queue</em> verlagert: Anfragen antworten sofort, und der Bestand wird dahinter in der richtigen Reihenfolge aktualisiert.'),
    chips:[['Amazon SQS FIFO',7.6,'amb'],['Celery',7.7],['PostgreSQL',7.8]],
    checks:[[T('Two years live','Seit zwei Jahren live'),8.3],[T('Every client on it','Alle Kunden darauf'),8.5],[T('None rolled back','Kein Rollback'),8.7]],
    aria:T('Sales from the till and deliveries from a van become numbered events on a conveyor; one worker applies them to the stock ledger in order, while the till answers at once.','Verkäufe an der Kasse und Lieferungen werden zu nummerierten Ereignissen auf einem Förderband; ein Worker bucht sie der Reihe nach in den Bestand, während die Kasse sofort antwortet.')},

  {id:'speed',group:'apicbase',type:'beat',tone:'ind',scene:'speed',
    kick:T('Speed','Geschwindigkeit'), title:T('Made it fast. <span class="acc">Twice.</span>','Schneller gemacht. <span class="acc">Zweimal.</span>'),
    wins:[[T('<span class="bad">25&nbsp;s</span> → <span class="acc">&lt;1&nbsp;s</span>','<span class="bad">25&nbsp;s</span> → <span class="acc">&lt;1&nbsp;s</span>'),T('the slowest inventory pages','die langsamsten Bestandsseiten'),4.0],
          [T('<span class="acc">25%</span> faster','<span class="acc">25&nbsp;%</span> schneller'),T('responses for our heaviest-data client','Antworten für unseren datenstärksten Kunden'),6.8]],
    chips:[[T('server-side paging','serverseitiges Paging'),7.0,'ind'],[T('rewritten queries','neu geschriebene Queries'),7.1,'ind']],
    aria:T('Two wins: an inventory page that took 25 seconds now opens in under one, and the same request for the heaviest-data client finishes 25% sooner.','Zwei Erfolge: Eine Bestandsseite, die 25 Sekunden brauchte, öffnet sich in unter einer Sekunde, und dieselbe Anfrage für den datenstärksten Kunden ist 25 % schneller fertig.')},

  {id:'analytics',group:'apicbase',type:'beat',tone:'ind',scene:'dashboard',
    kick:T('Analytics','Analytics'), title:T('The analytics dashboard, end to end.','Das Analytics-Dashboard, von der API bis zur Oberfläche.'),
    sub:T('The dashboard and its API. Heavy queries on <em>Amazon Redshift</em>, the rest on <em>Postgres read replicas behind Redis</em>.','Dashboard und API. Schwere Abfragen laufen auf <em>Amazon Redshift</em>, der Rest auf <em>Postgres-Read-Replicas hinter Redis</em>.'),
    stat:{text:'~500 ms',at:5.2,label:T('under load, on the busiest accounts','unter Last, bei den aktivsten Accounts'),tone:'teal'},
    aria:T('A dashboard builds itself while its queries run on their own lanes: heavy ones to Redshift, the rest through Redis to Postgres read replicas.','Ein Dashboard baut sich auf, während seine Abfragen auf eigenen Wegen laufen: schwere zu Redshift, der Rest über Redis zu Postgres-Read-Replicas.')},

  {id:'public-api',group:'apicbase',type:'beat',tone:'ind',scene:'api',
    kick:T('The public API','Die öffentliche API'), title:T('A public REST API.','Eine öffentliche REST-API.'),
    sub:T("For production planning and order fulfilment, so <em>customers' own systems and the mobile app</em> can do work that only the web UI could before.",'Für Produktionsplanung und Auftragsabwicklung. Damit können <em>die eigenen Systeme der Kunden und die mobile App</em> Aufgaben erledigen, die vorher nur über die Web-Oberfläche gingen.'),
    aria:T("A gate opens in the platform's wall: a customer's own system and the mobile app each get their own lane to production planning and order fulfilment.",'In der Wand der Plattform öffnet sich ein Tor: Kundensysteme und die mobile App bekommen je einen eigenen Weg zu Produktionsplanung und Auftragsabwicklung.')},

  {id:'ci',group:'apicbase',type:'beat',tone:'ind',scene:'ci',
    kick:T('Automated tests','Automatische Tests'), title:T('Testing every change: <span class="bad">2&nbsp;h</span> → <span class="acc">49&nbsp;min.</span>','Jede Änderung testen: <span class="bad">2&nbsp;h</span> → <span class="acc">49&nbsp;min.</span>'),
    sub:T('Every code change runs the full automated test suite before it ships. I cut that run from 2 hours to 49 minutes, then made the test database start in <em>6 seconds instead of 16 minutes</em>.',
          'Jede Codeänderung durchläuft vor dem Release alle automatischen Tests. Ich habe diesen Lauf von 2 Stunden auf 49 Minuten verkürzt und danach den Start der Testdatenbank von 16 Minuten auf <em>6 Sekunden</em> gebracht.'),
    chips:[['CI/CD',5.8,'ind'],['Django tests',5.9,'ind'],['PostgreSQL',6.0,'ind']],
    aria:T('The automated test run before each release shrinks from two hours and six cups of coffee to 49 minutes and one cup; then the test database starts in 6 seconds instead of 16 minutes.','Der automatische Testlauf vor jedem Release schrumpft von zwei Stunden und sechs Kaffeebechern auf 49 Minuten und einen Becher; danach startet die Testdatenbank in 6 Sekunden statt in 16 Minuten.')},

  {id:'permissions',group:'apicbase',type:'beat',tone:'ind',scene:'access',
    kick:T('Permissions','Berechtigungen'), title:T('Permissions, rebuilt across the platform.','Berechtigungen, plattformweit neu gebaut.'),
    sub:T('I led the platform-wide move from role-based checks to <em>per-resource policies</em>, for every tenant.','Ich habe die plattformweite Umstellung von rollenbasierten Prüfungen auf <em>Richtlinien pro Ressource</em> geleitet, für jeden Mandanten.'),
    checks:[[T('Every tenant','Jeder Mandant'),6.8],[T('Every resource','Jede Ressource'),7.0]],
    aria:T('In a grid of tenants and resources, one role used to open a whole tenant; after the rollout, every resource in every tenant has its own policy.','In einem Raster aus Mandanten und Ressourcen öffnete eine Rolle früher einen ganzen Mandanten; nach dem Rollout hat jede Ressource in jedem Mandanten ihre eigene Richtlinie.')},

  {id:'own-systems',group:'own',type:'chapter',tone:'amb',num:'+2',
    kick:T('Outside the day job · 2023 → today','Neben dem Job · 2023 → heute'), title:T('Systems I built alone.','Systeme, die ich allein gebaut habe.'),
    meta:T('Today <b>a whole university</b> and <b>two power plants</b> run on them.','Heute laufen <b>eine ganze Universität</b> und <b>zwei Kraftwerke</b> darauf.')},

  {id:'al-nahrain',group:'own',type:'beat',tone:'amb',scene:'university',
    kick:T('Al-Nahrain University · Baghdad','Al-Nahrain University · Bagdad'), title:T('A whole university runs on it.','Eine ganze Universität läuft darauf.'),
    sub:T("Al-Nahrain is one of Iraq's leading universities. The system started in 2023 in one college, Information Engineering. Today <em>every college in the university</em> runs on it.",
          'Al-Nahrain gehört zu den führenden Universitäten des Irak. Das System startete 2023 in einer einzigen Fakultät, Information Engineering. Heute läuft <em>jede Fakultät der Universität</em> darauf.'),
    nums:[[T('All','Alle'),T('colleges, one system','Fakultäten, ein System'),4.9],['200+',T('staff use it daily','Nutzer täglich'),5.2],['18',T('live dashboards','Live-Dashboards'),5.5],['2023',T('in production since','im Betrieb seit'),5.8]],
    note:T('Students from first year to PhD, staff and faculty, fees and payroll, research and certificates. Each college works in its own sealed space, hardened in a security pass across every boundary.',
           'Studierende vom ersten Semester bis zur Promotion, Personal und Lehrende, Gebühren und Gehälter, Forschung und Bescheinigungen. Jede Fakultät arbeitet in ihrem eigenen abgeschotteten Bereich, in einem Sicherheitsdurchgang an jeder Grenze gehärtet.'),
    chips:[['Django 4',0,'amb'],['PostgreSQL',0,'amb'],['HTMX',0,'amb']],
    aria:T('A university campus: Information Engineering lights up first, then the light runs down the campus streets until every college is on the same system, each in its own space.','Ein Universitätscampus: Zuerst leuchtet Information Engineering auf, dann läuft das Licht durch die Straßen, bis jede Fakultät auf demselben System ist, jede in ihrem eigenen Bereich.')},

  {id:'keppt',group:'own',type:'beat',tone:'amb',scene:'plants',
    kick:T('Keppt · KMS','Keppt · KMS'), title:T('Two power plants run on it.','Zwei Kraftwerke laufen darauf.'),
    sub:T('Keppt runs two combined-cycle power plants, 730 MW and 650 MW. Each plant has more than 200 engineers and <em>its own copy of KMS</em>. It runs every part of the plant, from maintenance and safety permits to stores, HR and ISO quality.',
          'Keppt betreibt zwei GuD-Kraftwerke mit 730 MW und 650 MW. Jedes Kraftwerk hat mehr als 200 Ingenieure und <em>seine eigene KMS-Instanz</em>. KMS steuert jeden Bereich des Kraftwerks, von Instandhaltung und Arbeitsfreigaben bis zu Lager, Personal und ISO-Qualität.'),
    nums:[['400+',T('daily users, 200+ per plant','Nutzer täglich, 200+ pro Kraftwerk'),4.3],[T('20,000+','20.000+'),T('work orders','Arbeitsaufträge'),5.3],[T('6,500+','6.500+'),T('fault notifications','Störmeldungen'),5.5],['7',T('departments','Abteilungen'),5.7]],
    note:T("It replaced a Siemens system. I led that migration with the plants' engineers and built KMS as the only developer. On top sits an OAuth2 MCP server, so AI tools can query it, read-only.",
           'KMS hat ein Siemens-System abgelöst. Die Migration habe ich mit den Ingenieuren der Kraftwerke geleitet und KMS als einziger Entwickler gebaut. Darauf sitzt ein OAuth2-MCP-Server, über den KI-Werkzeuge lesend darauf zugreifen.'),
    chips:[['Django 4.2',0,'amb'],['PostgreSQL',0,'amb'],['Docker',0,'amb']],
    aria:T('Two power plants side by side, each with its own KMS server and a crowd of engineers; below them, the parts of the plant KMS runs light up one by one.','Zwei Kraftwerke nebeneinander, jedes mit eigenem KMS-Server und vielen Ingenieuren; darunter leuchten nacheinander die Bereiche auf, die KMS steuert.')},

  {id:'kms-safety',group:'own',type:'beat',tone:'amb',scene:'permit',
    kick:T('KMS · Safety','KMS · Sicherheit'), title:T('No permit, no work.','Ohne Freigabe keine Arbeit.'),
    sub:T('Every job on live equipment goes through one of <em>six safety permit types</em> and a lockout/isolation gate, approved before the work starts.',
          'Jeder Einsatz an Anlagen in Betrieb läuft über eine von <em>sechs Arten von Arbeitsfreigaben</em> und eine Freigabe für Freischalten und Sichern, bevor die Arbeit beginnt.'),
    checks:[[T('Six permit types','Sechs Freigabearten'),5.2],[T('Lockout approved first','Sperrung zuerst freigegeben'),5.5]],
    aria:T('At a power plant, a work order on a pump goes through lockout, a permit to work and the job itself, then closes.','In einem Kraftwerk durchläuft ein Arbeitsauftrag an einer Pumpe Sperrung, Arbeitsfreigabe und den Einsatz selbst und wird dann geschlossen.')},

  {id:'end',group:'end',type:'end',tone:'teal',
    kick:T('5 years · still building','5 Jahre · und es geht weiter'),
    title:T("That's the story so far.",'Das war die Story bisher.'),
    name:'Hussein Altaka', role:T('Backend / Full Stack Developer · <b>Python &amp; Django</b>','Backend / Full Stack Developer · <b>Python &amp; Django</b>')}
];
