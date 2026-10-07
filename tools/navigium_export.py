"""Holt die Spanisch-Vokabeln für die 1. Arbeit aus Navigium und schreibt data/vokabeln.js.

Aufruf (Python-Umgebung und .env des Vokabel-Scanners):
    ~/claude-projects/vokabel-scanner/venv/bin/python tools/navigium_export.py

Welche Lektionen dazugehören, steht in LEKTIONEN. Doppelt gescannte Lektionen werden
über das spanische Wort zusammengelegt. Benutzername und Passwort landen nie in der Datei.
"""
import datetime, json, os, sys

SCANNER = os.path.expanduser("~/claude-projects/vokabel-scanner")
sys.path.insert(0, SCANNER)
from dotenv import load_dotenv  # noqa: E402
load_dotenv(os.path.join(SCANNER, ".env"))
from navigium_common import BASE, SCHOOL, login  # noqa: E402

# Lehrwerk S. 8 (Hola) bis S. 27 (El alfabeto). 315954 ist ein zweiter Scan von 315953.
LEKTIONEN = [("314109", "U1 · ¡Hola, amigos!"), ("315953", "U1 · Mi barrio / por la tarde"), ("315954", None)]
ZIEL = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "vokabeln.js")


def main():
    s = login()
    gesehen, gruppen = set(), []
    for lid, name in LEKTIONEN:
        r = s.get(f"{BASE}/schule/rest/vokabellektion/{lid}", params={"schule": SCHOOL, "user": s.navigium_user})
        r.raise_for_status()
        neu = []
        for v in sorted(r.json().get("vokabeln", []), key=lambda v: v.get("pos") or 0):
            if v["latein"] in gesehen:
                continue
            gesehen.add(v["latein"])
            neu.append({"es": v["latein"], "de": v.get("bedeutungen") or [], "wortart": v.get("wortart")})
        if name:
            gruppen.append({"id": lid, "name": name, "vokabeln": neu})
        elif neu:
            gruppen[-1]["vokabeln"].extend(neu)
    daten = {"quelle": "Navigium", "stand": datetime.date.today().isoformat(), "lektionen": gruppen}
    with open(ZIEL, "w", encoding="utf-8") as f:
        f.write("// Automatisch erzeugt von tools/navigium_export.py – nicht von Hand bearbeiten.\n")
        f.write("window.VOKABELN = " + json.dumps(daten, ensure_ascii=False, indent=1) + ";\n")
    print(sum(len(g["vokabeln"]) for g in gruppen), "Vokabeln ->", os.path.relpath(ZIEL))


if __name__ == "__main__":
    main()
