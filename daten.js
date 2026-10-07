/* Inhalte zur 1. Spanischarbeit (WP 9). Grundlage: Infoblatt der Lehrkraft, Lehrwerk S. 8–27.
   Nichts Persönliches hier rein (Namen, Räume) – die Seite ist öffentlich. */
const ZAHLEN = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
  "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"];
const GRAMMATIK = "https://nahol2021.github.io/vokabel-upload/grammatik.html";

window.ARBEIT = {
  titel: "1. Klassenarbeit · Mi., 14.10.",
  untertitel: "Schriftlicher Teil und mündlicher Teil (Rollenkarten) · Lehrwerk S. 8–27",
  datum: "2026-10-14",
  hinweis: "Die Regeln zum Nachschlagen stehen auch in deiner <a href=\"" + GRAMMATIK + "\">Grammatik-Sammlung</a> (dort Spanisch wählen). Einen Text über dich schreiben übst du in den <a href=\"https://nahol2021.github.io/schreibformen/#spanisch-presentarse\">Schreibformen</a>.",
  lernplan: [
    "<b>Vokabeln</b> S. 8 bis Unidad 1 B (aus deinem Navigium)",
    "<b>Begrüßen & verabschieden</b>, Befinden",
    "<b>Sich vorstellen</b>: Name, Alter, Herkunft, Sprachen, Telefonnummer",
    "<b>Wohnort & Stadtviertel</b> beschreiben (hay …)",
    "<b>Aktivitäten am Nachmittag</b> + Häufigkeit",
    "<b>Andere vorstellen</b> (Este / Esta es …)",
    "<b>Buchstabieren</b> und Aussprache",
    "<b>Konjugation</b>: -ar / -er / -ir, ser, hacer",
    "<b>Aussagesätze</b> und <b>Fragen</b> (Fragewörter, Sí/no-Fragen)",
    "<b>Artikel</b> (Genus), <b>Plural</b>, <b>Zahlen 0–20</b>",
    "<b>Dialog mit Rollenkarte</b> üben (mündlicher Teil)",
    "Probearbeit, dann Fehlertrainer leer machen"
  ],
  abschnitte: [
  {
    id: "vokabeln", titel: "Vokabeln", kurz: "S. 8 bis Unidad 1 B – aus deinem Navigium",
    bloecke: [{ typ: "karteikarten" }, { typ: "vokSchreiben" }, { typ: "vokListe", ueberschrift: "Alle Wörter" }]
  },
  {
    id: "verben", titel: "Verben konjugieren", kurz: "-ar, -er, -ir, ser und hacer",
    bloecke: [
      { typ: "tabelle", kopf: ["", "hablar", "comer", "vivir", "ser", "hacer"], zeilen: [
        ["yo", "habl<b>o</b>", "com<b>o</b>", "viv<b>o</b>", "<b>soy</b>", "<b>hago</b>"],
        ["tú", "habl<b>as</b>", "com<b>es</b>", "viv<b>es</b>", "<b>eres</b>", "hac<b>es</b>"],
        ["él / ella / usted", "habl<b>a</b>", "com<b>e</b>", "viv<b>e</b>", "<b>es</b>", "hac<b>e</b>"],
        ["nosotros/-as", "habl<b>amos</b>", "com<b>emos</b>", "viv<b>imos</b>", "<b>somos</b>", "hac<b>emos</b>"],
        ["vosotros/-as", "habl<b>áis</b>", "com<b>éis</b>", "viv<b>ís</b>", "<b>sois</b>", "hac<b>éis</b>"],
        ["ellos / ellas / ustedes", "habl<b>an</b>", "com<b>en</b>", "viv<b>en</b>", "<b>son</b>", "hac<b>en</b>"] ] },
      { typ: "zwei", items: [
        { titel: "So geht's", html: "Endung weg (-ar, -er, -ir), neue Endung an den Stamm. <b>-er</b> und <b>-ir</b> unterscheiden sich nur bei <i>nosotros</i> und <i>vosotros</i>." },
        { titel: "Merken", html: "<b>ser</b> ist ganz unregelmäßig. <b>hacer</b> ist nur bei <i>yo</i> unregelmäßig: <b>hago</b>. Das Pronomen (yo, tú …) lässt man meistens weg – die Endung zeigt die Person." } ] },
      { typ: "uebung", id: "v-endung", art: "auswahl", titel: "Wer ist gemeint?", intro: "Zu welcher Person passt die Form?",
        kategorien: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"], items: [
          { q: "escuchas", a: 1 }, { q: "nadamos", a: 3 }, { q: "vivís", a: 4 }, { q: "compran", a: 5 }, { q: "hago", a: 0 },
          { q: "es", a: 2 }, { q: "sois", a: 4 }, { q: "charla", a: 2 }, { q: "comemos", a: 3 }, { q: "eres", a: 1 }, { q: "toman", a: 5 }, { q: "estudio", a: 0 },
          { q: "leéis", a: 4 }, { q: "escribe", a: 2 }, { q: "compartimos", a: 3 }, { q: "bebo", a: 0 }, { q: "viven", a: 5 } ] },
      { typ: "uebung", id: "v-regel", art: "luecke", titel: "Regelmäßige Verben", intro: "Setz das Verb in der richtigen Form ein. <b>Enter</b> springt weiter.", items: [
        { s: "Yo {{hablo::hablar}} alemán y un poco de español." },
        { s: "¿Tú {{escuchas::escuchar}} música por la tarde?" },
        { s: "Mi amiga {{nada::nadar}} en la piscina." },
        { s: "Nosotros {{estudiamos::estudiar}} en casa." },
        { s: "¿Vosotros {{tomáis::tomar}} un chocolate?", why: "vosotros bei -ar: -áis (mit Akzent)." },
        { s: "Ellos {{compran::comprar}} ropa en el centro comercial." },
        { s: "Yo {{vivo::vivir}} en Berlín." },
        { s: "¿Tú {{comes::comer}} en la cafetería?" },
        { s: "Ana y Pablo {{viven::vivir}} en el barrio." },
        { s: "Nosotras {{charlamos::charlar}} en el patio." },
        { s: "¿Vosotros {{vivís::vivir}} aquí?", why: "vosotros bei -ir: -ís." },
        { s: "Mis amigos {{quedan::quedar}} en el parque." },
        { s: "¿Qué {{necesitas::necesitar}} para la clase?" },
        { s: "Nosotros {{comemos::comer}} en la heladería." },
        { s: "Yo {{leo::leer}} cómics por la tarde." },
        { s: "¿Tú {{bebes::beber}} un zumo?" },
        { s: "Nosotros {{escribimos::escribir}} mensajes.", why: "nosotros bei -ir: -imos." },
        { s: "Mis primos {{comparten::compartir}} fotos en Internet." },
        { s: "¿Vosotros {{comprendéis::comprender}} el ejercicio?", why: "vosotros bei -er: -éis." },
        { s: "Mi prima {{chatea::chatear}} con sus amigas." },
        { s: "Yo {{miro::mirar}} vídeos en casa." },
        { s: "¿Qué {{buscas::buscar}} en Internet?" } ] },
      { typ: "uebung", id: "v-ser-hacer", art: "luecke", titel: "ser und hacer", items: [
        { s: "Yo {{soy::ser}} de Alemania." },
        { s: "¿De dónde {{eres::ser}} tú?" },
        { s: "Este {{es::ser}} mi vecino Pablo." },
        { s: "Nosotros {{somos::ser}} compañeros de clase." },
        { s: "¿Vosotros {{sois::ser}} de Madrid?" },
        { s: "Ellas {{son::ser}} mis amigas." },
        { s: "¿Qué {{haces::hacer}} por la tarde?" },
        { s: "Yo {{hago::hacer}} los deberes.", why: "hacer ist bei yo unregelmäßig: hago." },
        { s: "¿Qué {{hacéis::hacer}} vosotros en el polideportivo?" },
        { s: "Nosotros {{hacemos::hacer}} los deberes en el patio." },
        { s: "¿Qué {{hacen::hacer}} Ana y Pablo por la tarde?" },
        { s: "Lucía {{hace::hacer}} los deberes con Pablo." } ] }
    ]
  },
  {
    id: "artikel", titel: "Artikel und Plural", kurz: "el / la / un / una, Genus, Mehrzahl",
    bloecke: [
      { typ: "tabelle", kopf: ["", "männlich", "weiblich"], zeilen: [
        ["bestimmt Sg.", "<b>el</b> barrio", "<b>la</b> ciudad"], ["bestimmt Pl.", "<b>los</b> barrios", "<b>las</b> ciudades"],
        ["unbestimmt Sg.", "<b>un</b> cine", "<b>una</b> piscina"], ["unbestimmt Pl.", "<b>unos</b> parques", "<b>unas</b> tiendas"] ] },
      { typ: "zwei", items: [
        { titel: "Genus", html: "Meist: <b>-o</b> → männlich, <b>-a</b> → weiblich. Aber nicht immer: <i>la ciudad, la clase, el parque</i>. Darum jedes Nomen <b>mit Artikel</b> lernen." },
        { titel: "Plural", html: "Endet auf Vokal → <b>+s</b>: amigo → amigos. Endet auf Konsonant → <b>+es</b>: profesor → profesores, ciudad → ciudades." } ] },
      { typ: "box", titel: "hay – es gibt", html: "<b>hay</b> + <b>un/una</b> oder + Nomen im <b>Plural ohne Artikel</b>: <i>En mi barrio hay un cine y tiendas.</i> Nie <i>hay el …</i>." },
      { typ: "uebung", id: "a-genus", art: "auswahl", titel: "el oder la?", kategorien: ["el", "la", "los", "las"], items: [
        { q: "___ barrio", a: 0 }, { q: "___ ciudad", a: 1, why: "la ciudad – endet nicht auf -a und ist trotzdem weiblich." }, { q: "___ tienda", a: 1 }, { q: "___ cine", a: 0 },
        { q: "___ piscina", a: 1 }, { q: "___ libro", a: 0 }, { q: "___ deberes", a: 2 }, { q: "___ amigas", a: 3 }, { q: "___ clase", a: 1, why: "la clase – weiblich, obwohl auf -e." },
        { q: "___ parque", a: 0 }, { q: "___ música", a: 1 }, { q: "___ instituto", a: 0 }, { q: "___ heladerías", a: 3 }, { q: "___ profesores", a: 2 } ] },
      { typ: "uebung", id: "a-hay", art: "auswahl", titel: "Nach hay", items: [
        { q: "En mi barrio hay ___ cine.", o: ["un", "el"], a: 0, why: "Nach hay nie der bestimmte Artikel." },
        { q: "En el centro hay ___ piscina.", o: ["una", "la"], a: 0 },
        { q: "En el barrio hay ___ tiendas.", o: ["– (kein Artikel)", "las"], a: 0, why: "hay + Plural ohne Artikel." },
        { q: "___ polideportivo está aquí.", o: ["El", "Un"], a: 0, why: "Hier ist ein bestimmtes Sportzentrum gemeint – kein hay." } ] },
      { typ: "uebung", id: "a-plural", art: "luecke", titel: "Plural bilden", items: [
        { s: "el amigo → los {{amigos}}" }, { s: "la tienda → las {{tiendas}}" }, { s: "el profesor → los {{profesores}}" },
        { s: "la ciudad → las {{ciudades}}" }, { s: "el parque → los {{parques}}" }, { s: "la clase → las {{clases}}" },
        { s: "el compañero → los {{compañeros}}" }, { s: "la heladería → las {{heladerías}}" }, { s: "el libro → los {{libros}}" }, { s: "la librería → las {{librerías}}" } ] }
    ]
  },
  {
    id: "fragen", titel: "Sätze und Fragen", kurz: "Fragewörter, Sí/no-Fragen, Satzbau",
    bloecke: [
      { typ: "tabelle", kopf: ["Fragewort", "Deutsch", "Beispiel"], zeilen: [
        ["¿Qué?", "was", "¿Qué haces por la tarde?"], ["¿Quién? / ¿Quiénes?", "wer", "¿Quién es?"], ["¿Cómo?", "wie", "¿Cómo te llamas?"],
        ["¿Dónde?", "wo", "¿Dónde vives?"], ["¿De dónde?", "woher", "¿De dónde eres?"], ["¿Cuántos/-as?", "wie viele", "¿Cuántos años tienes?"],
        ["¿Cuál?", "welche/r/s", "¿Cuál es tu número de teléfono?"], ["¿Qué tal?", "wie geht's / wie ist …", "¿Qué tal el barrio?"] ] },
      { typ: "zwei", items: [
        { titel: "Fragen", html: "Am Anfang <b>¿</b>, am Ende <b>?</b>. Fragewörter tragen <b>immer einen Akzent</b>: qué, cómo, dónde …" },
        { titel: "Sí/no-Fragen", html: "Wie ein Aussagesatz, nur mit <b>¿…?</b> und Frage-Melodie: <i>¿Hablas inglés?</i> – <i>Sí, hablo inglés.</i> / <i>No, no hablo inglés.</i>" } ] },
      { typ: "uebung", id: "f-wort", art: "auswahl", titel: "Welches Fragewort?", items: [
        { q: "¿___ te llamas? – Me llamo Pablo.", o: ["Cómo", "Qué", "Dónde"], a: 0 },
        { q: "¿___ eres? – Soy de Berlín.", o: ["De dónde", "Dónde", "Quién"], a: 0 },
        { q: "¿___ años tienes? – Tengo catorce años.", o: ["Cuántos", "Qué", "Cómo"], a: 0 },
        { q: "¿___ vives? – Vivo en el barrio.", o: ["Dónde", "De dónde", "Cuál"], a: 0 },
        { q: "¿___ haces por la tarde? – Escucho música.", o: ["Qué", "Quién", "Cómo"], a: 0 },
        { q: "¿___ es? – Es mi vecina Ana.", o: ["Quién", "Qué", "Cuál"], a: 0 },
        { q: "¿___ es tu número de teléfono?", o: ["Cuál", "Qué", "Cuántos"], a: 0 },
        { q: "¿___ tal? – Muy bien, gracias.", o: ["Qué", "Cómo", "Cuál"], a: 0 },
        { q: "¿___ hay en tu barrio? – Hay un cine.", o: ["Qué", "Dónde", "Quién"], a: 0 },
        { q: "¿___ son? – Son mis compañeros.", o: ["Quiénes", "Quién", "Cuántos"], a: 0, why: "Mehrere Personen → ¿Quiénes?" },
        { q: "¿___ lenguas hablas? – Hablo alemán e inglés.", o: ["Qué", "Cómo", "Dónde"], a: 0, why: "¿Qué + Nomen? = welche …?" } ] },
      { typ: "uebung", id: "f-satz", art: "satz", titel: "Sätze bauen", intro: "Tipp die Wörter in der richtigen Reihenfolge an. Antippen oben nimmt ein Wort zurück.", items: [
        { q: "Was machst du nachmittags?", a: ["¿Qué haces por la tarde?"] },
        { q: "In meinem Viertel gibt es ein Kino.", a: ["En mi barrio hay un cine."] },
        { q: "Manchmal treffen wir uns im Park.", a: ["A veces quedamos en el parque.", "Quedamos a veces en el parque."] },
        { q: "Das ist meine Freundin Ana.", a: ["Esta es mi amiga Ana."] },
        { q: "Woher kommt ihr?", a: ["¿De dónde sois?"] },
        { q: "Mein Nachbar heißt Pablo.", a: ["Mi vecino se llama Pablo."] },
        { q: "Ich höre immer Musik.", a: ["Siempre escucho música.", "Escucho siempre música.", "Escucho música siempre."] },
        { q: "Sprichst du Englisch?", a: ["¿Hablas inglés?"] },
        { q: "Normalerweise lese ich Comics.", a: ["Normalmente leo cómics.", "Leo cómics normalmente."] },
        { q: "Ich chatte mit meinem Cousin.", a: ["Chateo con mi primo."] },
        { q: "Ich spreche Deutsch und auch ein bisschen Spanisch.", a: ["Hablo alemán y también un poco de español."] } ] }
    ]
  },
  {
    id: "zahlen", titel: "Zahlen und Häufigkeit", kurz: "0–20, Telefonnummer, siempre, a veces …",
    bloecke: [
      { typ: "box", titel: "0–20", html: ZAHLEN.map((z, i) => i + " " + z).join(" · ") + "<br><span class=\"leise\">16–19 schreibt man zusammen: dieci<b>séis</b> (mit Akzent), diecisiete …</span>" },
      { typ: "box", titel: "Telefonnummer", html: "<i>Mi número de teléfono es el seis, cuatro, dos …</i> – Ziffern einzeln sagen." },
      { typ: "uebung", id: "z-schreiben", art: "luecke", titel: "Zahl als Wort", items: [
        { s: "7 → {{siete}}" }, { s: "12 → {{doce}}" }, { s: "15 → {{quince}}" }, { s: "16 → {{dieciséis}}", why: "mit Akzent auf dem é" }, { s: "4 → {{cuatro}}" },
        { s: "11 → {{once}}" }, { s: "19 → {{diecinueve}}" }, { s: "20 → {{veinte}}" }, { s: "13 → {{trece}}" }, { s: "9 → {{nueve}}" } ] },
      { typ: "uebung", id: "z-hoeren", art: "hoeren", titel: "Hör die Zahl", intro: "Tipp auf „Anhören“ und schreib die Zahl als Ziffer.",
        items: [3, 14, 6, 17, 11, 9, 20, 2, 13, 18].map(n => ({ sprich: ZAHLEN[n], a: [String(n)], platzhalter: "Ziffer" })) },
      { typ: "tabelle", ueberschrift: "Wie oft?", kopf: ["Spanisch", "Deutsch"], zeilen: [
        ["siempre", "immer"], ["todos los días", "jeden Tag"], ["normalmente", "normalerweise"], ["a veces", "manchmal"], ["nunca", "nie"] ] },
      { typ: "box", html: "<span class=\"leise\"><i>siempre</i>, <i>normalmente</i> und <i>a veces</i> stehen in deinem Navigium. <i>todos los días</i> und <i>nunca</i> sind übliche Ergänzungen – frag nach, ob ihr die hattet.</span>" },
      { typ: "uebung", id: "z-oft", art: "auswahl", titel: "Häufigkeit", items: [
        { q: "„Ich höre <b>immer</b> Musik.“ → ___ escucho música.", o: ["Siempre", "A veces", "Nunca"], a: 0 },
        { q: "„<b>Manchmal</b> schwimme ich.“ → ___ nado.", o: ["A veces", "Siempre", "Todos los días"], a: 0 },
        { q: "„Ich lerne <b>jeden Tag</b>.“ → Estudio ___.", o: ["todos los días", "a veces", "nunca"], a: 0 },
        { q: "„Ich schwimme <b>nie</b>.“ → ___ nado.", o: ["Nunca", "Siempre", "A veces"], a: 0 },
        { q: "„<b>Normalerweise</b> mache ich die Hausaufgaben zu Hause.“ → ___ hago los deberes en casa.", o: ["Normalmente", "Nunca", "Solo"], a: 0 } ] }
    ]
  },
  {
    id: "buchstabieren", titel: "Buchstabieren", kurz: "El alfabeto, Aussprache",
    bloecke: [
      { typ: "alphabet", buchstaben: [["a", "a"], ["b", "be"], ["c", "ce"], ["d", "de"], ["e", "e"], ["f", "efe"], ["g", "ge"], ["h", "hache"], ["i", "i"], ["j", "jota"], ["k", "ka"], ["l", "ele"], ["m", "eme"], ["n", "ene"], ["ñ", "eñe"], ["o", "o"], ["p", "pe"], ["q", "cu"], ["r", "erre"], ["s", "ese"], ["t", "te"], ["u", "u"], ["v", "uve"], ["w", "uve doble"], ["x", "equis"], ["y", "i griega"], ["z", "zeta"]] },
      { typ: "box", titel: "Aufpassen", html: "<b>h</b> spricht man nie (hola = „ola“). <b>j</b> und <b>g</b> vor e/i klingen wie „ch“ in Bach. <b>ll</b> ≈ „j“. <b>ñ</b> = „nj“. <b>c</b> vor e/i und <b>z</b> = englisches „th“." },
      { typ: "uebung", id: "b-hoeren", art: "hoeren", titel: "Was wird buchstabiert?", intro: "Hör zu und schreib das Wort.",
        items: ["barrio", "patio", "parque", "cine", "tienda", "piscina", "libro", "ropa", "tarde", "verano"].map(w => ({ sprich: w.split("").map(c => ({ a: "a", b: "be", c: "ce", d: "de", e: "e", f: "efe", g: "ge", h: "hache", i: "i", j: "jota", l: "ele", m: "eme", n: "ene", o: "o", p: "pe", q: "cu", r: "erre", s: "ese", t: "te", u: "u", v: "uve", z: "zeta" })[c]).join(", "), a: [w], tempo: .7 })) }
    ]
  },
  {
    id: "muendlich", titel: "Mündlicher Teil", kurz: "Dialoge mit Rollenkarte üben",
    bloecke: [
      { typ: "text", html: "So übst du: Lies, was die andere Person sagt (🔊 zum Anhören), überleg dir deine Antwort und <b>sag sie laut</b>. Erst dann „Vorschlag zeigen“. Achte auf Aussprache und reagiere auf dein Gegenüber (<i>¡Qué guay!</i>, <i>¡Genial!</i>)." },
      { typ: "dialog", titel: "1 · Kennenlernen", partner: "Ana", situation: "Du triffst Ana im Patio. Sie ist neu.", zuege: [
        { es: "¡Hola! ¿Qué tal?" },
        { du: "Grüße, sag, wie es dir geht, und frag zurück.", es: "¡Hola! Muy bien, gracias. ¿Y tú?" },
        { es: "Fenomenal. Soy Ana. ¿Cómo te llamas?" },
        { du: "Sag deinen Namen.", es: "Me llamo … / Soy …" },
        { es: "¿Cuántos años tienes?" },
        { du: "Sag dein Alter.", es: "Tengo catorce años." },
        { es: "¿De dónde eres?" },
        { du: "Sag, woher du kommst.", es: "Soy de Alemania." },
        { es: "¿Qué lenguas hablas?" },
        { du: "Nenne deine Sprachen.", es: "Hablo alemán, inglés y un poco de español." },
        { es: "¿Cuál es tu número de teléfono?" },
        { du: "Sag eine Telefonnummer (Ziffern einzeln).", es: "Mi número es el seis, cuatro, dos, ocho, uno, nueve." },
        { es: "¡Genial! ¡Hasta luego!" },
        { du: "Verabschiede dich.", es: "¡Adiós! ¡Hasta luego!" } ] },
      { typ: "dialog", titel: "2 · Mein Viertel und mein Nachmittag", partner: "Pablo", situation: "Pablo fragt dich nach deinem Viertel und deinen Nachmittagen.", zuege: [
        { es: "¿Dónde vives?" },
        { du: "Sag, wo du wohnst.", es: "Vivo en … , en el barrio …" },
        { es: "¿Qué hay en tu barrio?" },
        { du: "Nenne drei Dinge in deinem Viertel.", es: "En mi barrio hay un cine, una piscina y tiendas." },
        { es: "¿Qué haces por la tarde?" },
        { du: "Sag, was du nachmittags machst – mit Häufigkeit.", es: "Normalmente hago los deberes en casa. A veces leo cómics o chateo con mis amigos." },
        { es: "Yo charlo con mis amigos en el parque." },
        { du: "Reagiere und schlag vor, euch zu verabreden.", es: "¡Qué guay! ¿Quedamos en el parque?" },
        { es: "¡Claro! ¡Adiós!" },
        { du: "Verabschiede dich.", es: "¡Hasta luego!" } ] },
      { typ: "dialog", titel: "3 · Jemanden vorstellen", partner: "Profesora", situation: "Du stellst deiner Lehrerin deine Freundin Lena vor.", zuege: [
        { es: "¿Quién es?" },
        { du: "Stell Lena vor.", es: "Esta es mi amiga Lena." },
        { es: "¿De dónde es?" },
        { du: "Sag, woher sie kommt.", es: "Es de Berlín." },
        { es: "¿Y qué hace por la tarde?" },
        { du: "Sag, was sie nachmittags macht.", es: "Escucha música y a veces nada en la piscina." } ] },
      { typ: "tabelle", ueberschrift: "Redemittel", kopf: ["Wofür", "Spanisch"], zeilen: [
        ["Begrüßen", "¡Hola! · ¿Qué tal? · ¿Y tú?"], ["Befinden", "Muy bien / superbién · Bien · Regular · Más o menos · Mal · Fatal"],
        ["Sich vorstellen", "Me llamo … · Soy … · Tengo … años · Soy de … · Hablo … y también un poco de … · Mi número de teléfono es el …"],
        ["Wohnort", "Vivo en … · En mi barrio hay … · Mi barrio es …"], ["Nachmittag", "Por la tarde … · siempre · normalmente · a veces · Quedo con mis amigos · Leo / Chateo / Miro vídeos"],
        ["Andere vorstellen", "Este es … / Esta es … · Se llama … · Es de …"], ["Reagieren", "¡Qué guay! · ¡Genial! · ¡Claro! · ¡Mira!"],
        ["Verabschieden", "¡Adiós! · ¡Hasta luego!"] ] }
    ]
  }
  ]
};
