/* Übungsseite zur 1. Spanischarbeit. Inhalte: daten.js, Vokabeln: data/vokabeln.js (aus Navigium). */

/* ---------- Werkzeuge ---------- */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()) { if (c == null || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(c)); }
  return e;
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const mischen = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = s => String(s).toLowerCase().replace(/[¿¡.,!?;:"“”„]/g, " ").replace(/\s+/g, " ").trim();
const ohneAkzent = s => s.normalize("NFD").replace(/[̀-̂̄-ͯ]/g, "").normalize("NFC"); // ñ (Tilde) bleibt
const speicher = {
  get(k, d) { try { const v = localStorage.getItem("es9:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("es9:" + k, JSON.stringify(v)); } catch (e) {} }
};
const fett = s => String(s ?? "").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

/* ---------- Stand und Fehler ---------- */
const stand = id => speicher.get("stand", {})[id];
function merke(id, r, n) { const s = speicher.get("stand", {}); const alt = s[id]; const w = n ? r / n : 0; s[id] = { best: Math.max(alt ? alt.best : 0, w) }; speicher.set("stand", s); }
const ITEMS = {};
function fehler(id, ok) { const f = speicher.get("fehler", {}); if (ok) delete f[id]; else f[id] = 1; speicher.set("fehler", f); }

/* ---------- Aufgaben ---------- */
function auswahlItem(it, id, { sofort = true, kategorien, fest, beiAntwort } = {}) {
  const opts = it.o || kategorien; const idx = opts.map((_, i) => i); const reihe = fest || kategorien ? idx : mischen(idx);
  const richtig = Array.isArray(it.a) ? it.a : [it.a];
  let gewaehlt = null, fertig = false; const k = {};
  const rueck = h("div", { class: "rueck", hidden: true });
  const markieren = () => {
    fertig = true;
    for (const i in k) { const n = +i; k[i].disabled = true; if (richtig.includes(n)) k[i].classList.add("ok"); else if (n === gewaehlt) k[i].classList.add("nein"); }
    const ok = richtig.includes(gewaehlt);
    rueck.hidden = false; rueck.className = "rueck " + (ok ? "ok" : "nein");
    rueck.innerHTML = (ok ? "✓ " : "✗ ") + (it.why ? fett(it.why) : ok ? "Richtig." : "Richtig: <b>" + esc(opts[richtig[0]]) + "</b>");
    return ok;
  };
  reihe.forEach(i => { k[i] = h("button", { class: "option", type: "button", onclick() {
    if (fertig) return; gewaehlt = i;
    if (sofort) { const ok = markieren(); fehler(id, ok); beiAntwort && beiAntwort(ok); }
    else { for (const j in k) k[j].style.outline = ""; k[i].style.outline = "2px solid currentColor"; }
  } }, opts[i]); });
  return { el: h("li", { class: "aufgabe" }, h("div", { class: "frage", html: fett(it.q) }), h("div", { class: "optionen" }, reihe.map(i => k[i])), rueck), pruefen: markieren, zeigen() {} };
}

function lueckeItem(it, id) {
  const frage = h("div", { class: "frage" }); const felder = [];
  let rest = it.s, m;
  const muster = /\{\{(.+?)\}\}/;
  while ((m = rest.match(muster))) {
    frage.append(document.createTextNode(rest.slice(0, m.index)));
    const [antw, hinweis] = m[1].split("::");
    const ans = antw.split("|");
    const inp = h("input", { class: "luecke", type: "text", id: "f-" + id + "-" + felder.length, autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: hinweis || "", style: "width:" + (Math.max(...ans.map(a => a.length), (hinweis || "").length, 4) + 3) + "ch", "aria-label": "Lücke" });
    felder.push({ inp, ans }); frage.append(inp); rest = rest.slice(m.index + m[0].length);
  }
  frage.append(document.createTextNode(rest));
  const rueck = h("div", { class: "rueck", hidden: true });
  return { el: h("li", { class: "aufgabe" }, frage, rueck), felder: felder.map(f => f.inp),
    pruefen() {
      let alle = true, akzent = false;
      felder.forEach(f => {
        const v = norm(f.inp.value); const ok = f.ans.some(a => norm(a) === v);
        if (!ok && f.ans.some(a => ohneAkzent(norm(a)) === ohneAkzent(v))) akzent = true;
        f.inp.classList.remove("gezeigt"); f.inp.classList.toggle("ok", ok); f.inp.classList.toggle("nein", !ok); if (!ok) alle = false;
      });
      rueck.hidden = false; rueck.className = "rueck " + (alle ? "ok" : "nein");
      const loesung = felder.map(f => "<b>" + esc(f.ans[0]) + "</b>").join(" · ");
      rueck.innerHTML = alle ? "✓ Richtig." : (akzent ? "Fast – achte auf den Akzent: " : "✗ Richtig: ") + loesung + (it.why ? " – " + fett(it.why) : "");
      return alle;
    },
    zeigen() { felder.forEach(f => { if (!f.inp.classList.contains("ok")) { f.inp.value = f.ans[0]; f.inp.classList.remove("nein"); f.inp.classList.add("gezeigt"); } }); }
  };
}

function satzItem(it, id) {
  const ziel = it.a[0].split(" "); const vorrat = mischen(ziel.map((w, i) => ({ w, i }))); const gewaehlt = [];
  const oben = h("div", { class: "wortchips gebaut" }), unten = h("div", { class: "wortchips" }), rueck = h("div", { class: "rueck", hidden: true });
  let fertig = false;
  const zeichnen = () => {
    oben.innerHTML = ""; unten.innerHTML = "";
    gewaehlt.forEach((t, k) => oben.append(h("button", { type: "button", onclick() { if (fertig) return; gewaehlt.splice(k, 1); zeichnen(); } }, t.w)));
    vorrat.filter(t => !gewaehlt.includes(t)).forEach(t => unten.append(h("button", { type: "button", onclick() { if (fertig) return; gewaehlt.push(t); zeichnen(); } }, t.w)));
  };
  zeichnen();
  return { el: h("li", { class: "aufgabe" }, h("div", { class: "frage", html: fett(it.q) }), oben, unten, rueck),
    pruefen() {
      fertig = true; const satz = norm(gewaehlt.map(t => t.w).join(" "));
      const ok = gewaehlt.length === ziel.length && it.a.some(a => norm(a) === satz);
      rueck.hidden = false; rueck.className = "rueck " + (ok ? "ok" : "nein");
      rueck.innerHTML = ok ? "✓ Richtig." : "✗ Richtig: <b>" + esc(it.a[0]) + "</b>" + (it.why ? " – " + fett(it.why) : "");
      return ok;
    },
    zeigen() { gewaehlt.length = 0; ziel.forEach((w, i) => gewaehlt.push(vorrat.find(t => t.i === i))); fertig = true; zeichnen(); }
  };
}

const BAU = { luecke: lueckeItem, satz: satzItem };

function enterWeiter(box, amEnde) {
  box.addEventListener("keydown", e => {
    if (e.key !== "Enter" || !e.target.matches("input.luecke")) return;
    e.preventDefault(); const alle = $$("input.luecke", box); const i = alle.indexOf(e.target);
    if (i < alle.length - 1) alle[i + 1].focus(); else amEnde && amEnde();
  });
}

/* Übungskarte: Auswahl gibt sofort Rückmeldung, alles andere mit "Prüfen". */
function uebung(u) {
  if (Array.isArray(u.items)) u.items.forEach((it, i) => { ITEMS[u.id + "-" + i] = { art: u.art, it, kategorien: u.kategorien, titel: u.titel }; });
  const marke = h("span", { class: "marke-klein" }), koerper = h("div"), ergebnis = h("p", { class: "ergebnis", role: "status" }), fuss = h("div", { class: "knoepfe" });
  const markeSetzen = () => { const s = stand(u.id); marke.textContent = s ? "Bestwert " + Math.round(s.best * 100) + " %" : "noch offen"; marke.className = "marke-klein" + (s && s.best >= .8 ? " gut" : ""); };
  const fertig = (r, n) => { merke(u.id, r, n); markeSetzen(); ergebnis.textContent = r + " von " + n + " richtig" + (r === n ? " – sitzt!" : " – Fehler landen im Fehlertrainer."); };
  const items = () => typeof u.items === "function" ? u.items() : u.items;
  const neu = () => {
    koerper.innerHTML = ""; fuss.innerHTML = ""; ergebnis.textContent = "";
    const liste = items(); const ol = h("ol", { class: "aufgaben" }); koerper.append(ol);
    const reihe = u.festeReihenfolge ? liste.map((_, i) => i) : mischen(liste.map((_, i) => i));
    if (u.art === "auswahl") {
      let b = 0, r = 0;
      reihe.forEach(i => ol.append(auswahlItem(liste[i], u.id + "-" + i, { kategorien: u.kategorien, beiAntwort(ok) { b++; if (ok) r++; if (b === reihe.length) fertig(r, reihe.length); } }).el));
      fuss.append(h("button", { class: "knopf leise", type: "button", onclick: neu }, "Neu mischen"));
    } else {
      const ctrl = reihe.map(i => { const id = liste[i].id || u.id + "-" + i; if (liste[i].id) ITEMS[id] = { art: u.art, it: liste[i], titel: u.titel }; const c = BAU[u.art](liste[i], id); ol.append(c.el); return { id, c }; });
      const pruefen = () => { let r = 0; ctrl.forEach(({ id, c }) => { const ok = c.pruefen(); fehler(id, ok); if (ok) r++; }); fertig(r, ctrl.length); };
      enterWeiter(ol, pruefen);
      fuss.append(h("button", { class: "knopf haupt", type: "button", onclick: pruefen }, "Prüfen"),
        h("button", { class: "knopf", type: "button", onclick() { ctrl.forEach(({ c }) => c.zeigen()); } }, "Lösungen zeigen"),
        h("button", { class: "knopf leise", type: "button", onclick: neu }, u.festeReihenfolge ? "Leeren" : "Neue Runde"));
    }
  };
  markeSetzen(); neu();
  return h("section", { class: "uebung" }, h("div", { class: "uebkopf" }, h("h3", {}, u.titel), marke), u.intro ? h("p", { class: "intro", html: fett(u.intro) }) : null, koerper, ergebnis, fuss);
}

/* ---------- Vokabeln (nur aus Navigium) ---------- */
const VOK = (window.VOKABELN?.lektionen || []).flatMap(l => l.vokabeln.map(v => ({ ...v, lektion: l.name })));
const vokId = v => "voc:" + v.es;
// Muster wie "¡Qué + adj./adv.!" oder "bienvenido a ..." sind keine Rechtschreibaufgabe – nur Karteikarte.
const SCHREIBBAR = VOK.filter(v => !/\+|\.\.\.|…/.test(v.es));
// Antwortvarianten: "el amigo, la amiga" → beide Teile; "escuchar algo" → auch ohne "algo".
function vokVarianten(es) {
  const out = new Set([es]);
  es.split(/,\s*/).forEach(t => out.add(t.trim()));
  [...out].forEach(t => { out.add(t.replace(/\s+(algo|a alguien)$/, "")); out.add(t.replace(/^[¡¿]|[!?]$/g, "")); });
  return [...out].filter(Boolean);
}
SCHREIBBAR.forEach(v => { ITEMS[vokId(v)] = { art: "luecke", it: { s: v.de.join("; ") + " → {{" + vokVarianten(v.es).join("|") + "}}" }, titel: "Vokabeln" }; });

function karteikarten() {
  let stapel = mischen(VOK), offen = false, anzahl = stapel.length;
  const box = h("div");
  const zeichnen = () => {
    box.innerHTML = "";
    if (!stapel.length) { merke("vok-karten", 1, 1); box.append(h("div", { class: "rueck ok" }, "✓ Alle " + anzahl + " Karten geschafft."), h("div", { class: "knoepfe" }, h("button", { class: "knopf", type: "button", onclick() { stapel = mischen(VOK); anzahl = stapel.length; zeichnen(); } }, "Nochmal mischen"))); return; }
    const v = stapel[0];
    box.append(h("button", { class: "karte", type: "button", onclick() { offen = !offen; zeichnen(); } },
      offen ? [h("div", { class: "gross" }, v.de.join("; ")), h("div", { class: "klein" }, v.es)] : [h("div", { class: "gross" }, v.es), h("div", { class: "klein" }, "antippen für die Bedeutung")]),
      h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick() { stapel.shift(); offen = false; zeichnen(); } }, "Kann ich"),
        h("button", { class: "knopf", type: "button", onclick() { stapel.push(stapel.shift()); offen = false; zeichnen(); } }, "Nochmal"),
        h("span", { class: "leise" }, "noch " + stapel.length)));
  };
  zeichnen();
  return h("section", { class: "uebung" }, h("div", { class: "uebkopf" }, h("h3", {}, "Karteikarten"), h("span", { class: "marke-klein" }, VOK.length + " Wörter")), h("p", { class: "intro" }, "„Kann ich“ legt die Karte weg, „Nochmal“ schiebt sie nach hinten."), box);
}
const vokSchreiben = () => uebung({ id: "vok-schreiben", art: "luecke", titel: "Schreiben", intro: "Schreib das spanische Wort – mit Akzenten und ¡! ¿? wo nötig. „algo“ darfst du weglassen. Zehn Wörter pro Runde.",
  items: () => mischen(SCHREIBBAR).slice(0, 10).map(v => ({ id: vokId(v), ...ITEMS[vokId(v)].it })) });

/* ---------- Abschnitte rendern ---------- */
const BLOCK = {
  text: b => h("p", { html: b.html }),
  box: b => h("div", { class: "box" }, b.titel ? h("div", { class: "etikett" }, b.titel) : null, h("div", { html: b.html })),
  zwei: b => h("div", { class: "zwei" }, b.items.map(BLOCK.box)),
  tabelle: b => h("div", { class: "tabrahmen" }, h("table", {}, h("tr", {}, b.kopf.map(k => h("th", {}, k))), b.zeilen.map(z => h("tr", {}, z.map(c => h("td", { html: c })))))),
  uebung: b => uebung(b),
  karteikarten: () => karteikarten(),
  vokSchreiben: () => vokSchreiben(),
  vokListe: () => h("div", { class: "tabrahmen" }, h("table", {}, h("tr", {}, h("th", {}, "Español"), h("th", {}, "Deutsch")),
    VOK.map(v => h("tr", {}, h("td", {}, h("span", { style: "display:flex;gap:8px;align-items:center" }, h("b", {}, v.es))), h("td", {}, v.de.join("; ")))))),
  alphabet: b => h("div", { class: "wortwolke" }, b.buchstaben.map(([g, n]) => h("span", { class: "knopf", style: "padding:8px 10px" }, g + " – " + n))),
  dialog: b => {
    const zuege = b.zuege.map(z => z.du
      ? (() => { const l = h("div", { class: "es", hidden: true }, z.es); return h("div", { class: "zug du" }, h("div", { class: "wer" }, "Du"), h("div", {}, z.du), l,
          h("div", { class: "knoepfe", style: "margin-top:6px" }, h("button", { class: "knopf", type: "button", onclick() { l.hidden = !l.hidden; } }, "Vorschlag zeigen"))); })()
      : h("div", { class: "zug" }, h("div", { class: "wer" }, b.partner), h("div", { style: "display:flex;gap:8px;align-items:center" }, h("span", { class: "es" }, z.es))));
    return h("section", { class: "uebung" }, h("h3", {}, b.titel), b.situation ? h("p", { class: "intro" }, b.situation) : null, h("div", { class: "dialog" }, zuege));
  }
};

/* ---------- Probearbeit und Fehlertrainer ---------- */
function probearbeit() {
  const box = h("div");
  const starten = () => {
    box.innerHTML = "";
    const pool = Object.entries(ITEMS).filter(([id, x]) => !id.startsWith("voc:"));
    const wahl = [...mischen(pool).slice(0, 20), ...mischen(SCHREIBBAR).slice(0, 5).map(v => [vokId(v), ITEMS[vokId(v)]])];
    const ol = h("ol", { class: "aufgaben" });
    const ctrl = wahl.map(([id, x]) => { const c = x.art === "auswahl" ? auswahlItem(x.it, id, { sofort: false, kategorien: x.kategorien }) : BAU[x.art](x.it, id + "-p"); ol.append(c.el); return { id, c }; });
    const ergebnis = h("div");
    enterWeiter(ol);
    box.append(h("section", { class: "uebung" }, ol, h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick() {
      let r = 0; ctrl.forEach(({ id, c }) => { const ok = c.pruefen(); fehler(id, ok); if (ok) r++; });
      merke("probe", r, ctrl.length); this.disabled = true;
      const p = r / ctrl.length; const note = p >= .92 ? "1" : p >= .81 ? "2" : p >= .67 ? "3" : p >= .5 ? "4" : p >= .3 ? "5" : "6";
      ergebnis.innerHTML = ""; ergebnis.append(h("div", { class: "ergebnisbox" }, h("div", { class: "gross" }, r + " / " + ctrl.length), h("div", {}, "grob etwa Note " + note), h("p", { class: "leise", style: "margin:6px 0 0" }, "Nur zur Orientierung. Die Fehler stehen jetzt im Fehlertrainer.")));
      ergebnis.scrollIntoView({ behavior: "smooth", block: "center" });
    } }, "Abgeben"))), ergebnis);
  };
  return h("div", {}, h("p", { class: "intro" }, "25 zufällige Aufgaben aus allen Bereichen, Rückmeldung erst beim Abgeben – wie in der Arbeit."),
    h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick: starten }, "Probearbeit starten")), box);
}
function fehlertrainer() {
  const ids = Object.keys(speicher.get("fehler", {})).filter(id => ITEMS[id]).slice(0, 30);
  if (!ids.length) return h("div", { class: "box" }, "Gerade keine offenen Fehler. Was du irgendwo falsch hast, landet hier – bis du es richtig hast.");
  const ol = h("ol", { class: "aufgaben" });
  const ctrl = ids.map(id => { const x = ITEMS[id]; const c = x.art === "auswahl" ? auswahlItem(x.it, id, { sofort: false, kategorien: x.kategorien }) : BAU[x.art](x.it, id + "-f"); c.el.prepend(h("div", { class: "leise" }, x.titel)); ol.append(c.el); return { id, c }; });
  const status = h("p", { class: "ergebnis" });
  enterWeiter(ol);
  return h("section", { class: "uebung" }, h("div", { class: "uebkopf" }, h("h3", {}, ids.length + " offene Fehler"), h("span", { class: "marke-klein" }, "max. 30 pro Runde")), ol, status,
    h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick() { let r = 0; ctrl.forEach(({ id, c }) => { const ok = c.pruefen(); fehler(id, ok); if (ok) r++; }); status.textContent = r + " von " + ctrl.length + " richtig – die richtigen sind raus."; } }, "Prüfen"),
      h("button", { class: "knopf", type: "button", onclick() { route(); } }, "Liste aktualisieren")));
}

/* ---------- Seiten ---------- */
const A = window.ARBEIT, main = $("#main"), pfad = $("#pfad");
// Alle Übungen einmal anlegen, damit Probearbeit und Fehlertrainer sie kennen.
A.abschnitte.forEach(ab => ab.bloecke.forEach(b => { if (b.typ === "uebung") (b.items || []).forEach((it, i) => { ITEMS[b.id + "-" + i] = { art: b.art, it, kategorien: b.kategorien, titel: b.titel }; }); }));
const abschnittIds = ab => ab.bloecke.filter(b => b.typ === "uebung").map(b => b.id).concat(ab.bloecke.some(b => b.typ === "vokSchreiben") ? ["vok-schreiben"] : []);
const prozent = ab => { const ids = abschnittIds(ab); return ids.length ? Math.round(100 * ids.reduce((a, id) => a + (stand(id) ? stand(id).best : 0), 0) / ids.length) : null; };

function start() {
  pfad.innerHTML = "";
  const tage = Math.ceil((new Date(A.datum + "T08:00:00") - new Date()) / 864e5);
  main.innerHTML = "";
  main.append(h("h1", {}, A.titel), h("p", { class: "lead" }, A.untertitel),
    h("p", { class: "countdown", html: tage > 0 ? "noch <b>" + tage + " Tag" + (tage === 1 ? "" : "e") + "</b> bis zur Arbeit" : tage === 0 ? "<b>Heute</b> ist die Arbeit – viel Erfolg!" : "Die Arbeit ist vorbei." }));
  const menue = h("div", { class: "menue" });
  A.abschnitte.forEach(ab => { const p = prozent(ab); menue.append(h("a", { href: "#" + ab.id }, h("span", { class: "titel" }, ab.titel, h("span", { class: "kurz" }, ab.kurz)), h("span", {}, p == null ? "" : p + " %"))); });
  const f = Object.keys(speicher.get("fehler", {})).filter(id => ITEMS[id]).length;
  menue.append(h("a", { href: "#probe" }, h("span", { class: "titel" }, "Probearbeit", h("span", { class: "kurz" }, "25 gemischte Aufgaben")), h("span", {}, stand("probe") ? Math.round(stand("probe").best * 100) + " %" : "")),
    h("a", { href: "#fehler" }, h("span", { class: "titel" }, "Fehlertrainer", h("span", { class: "kurz" }, "alles, was du falsch hattest")), h("span", {}, f ? f + " offen" : "")));
  main.append(menue);
  const plan = speicher.get("plan", {});
  main.append(h("h2", {}, "Was drankommt"), h("div", { class: "box haken" }, A.lernplan.map((p, i) => {
    const cb = h("input", { type: "checkbox", id: "plan-" + i }); cb.checked = !!plan[i];
    cb.addEventListener("change", () => { const s = speicher.get("plan", {}); s[i] = cb.checked; speicher.set("plan", s); });
    return h("label", { for: "plan-" + i }, cb, h("span", { html: p }));
  })));
  if (A.hinweis) main.append(h("p", { class: "hinweisbox", html: A.hinweis }));
  document.title = A.titel;
}
function seite(titel, kurz, inhalt) {
  pfad.innerHTML = ""; pfad.append(h("a", { href: "#" }, "← Übersicht"));
  main.innerHTML = ""; main.append(h("h1", {}, titel), kurz ? h("p", { class: "lead" }, kurz) : null, inhalt);
  document.title = titel + " – " + A.titel;
}
function route() {
  const id = location.hash.slice(1);
  const ab = A.abschnitte.find(a => a.id === id);
  if (ab) seite(ab.titel, ab.kurz, h("div", { class: "stapel" }, ab.bloecke.map(b => h("div", {}, b.ueberschrift ? h("h2", {}, b.ueberschrift) : null, BLOCK[b.typ](b)))));
  else if (id === "probe") seite("Probearbeit", "", probearbeit());
  else if (id === "fehler") seite("Fehlertrainer", "Ziel: leer.", fehlertrainer());
  else start();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
