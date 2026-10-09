// QEN – samooprava mikrofónu. Čistá funkcia: povie, čo urobiť; nič sama nespúšťa.
var MIC_SKRYTE_LIMIT = 30000; // ms v pozadí, po ktorých sa pripraví nové rozpoznávanie
function rozhodniOpravu(stav, udalost) {
  var typ = udalost && udalost.typ;
  var s = { restartyVete: stav.restartyVete, skrytyOd: stav.skrytyOd };
  switch (typ) {
    case 'nova-veta': s.restartyVete = 0; return { stav: s, akcia: 'nic' };
    case 'bez-audia':
      if (s.restartyVete < 1) { s.restartyVete += 1; return { stav: s, akcia: 'restart' }; }
      return { stav: s, akcia: 'hluche' };
    case 'skryte': s.skrytyOd = udalost.cas; return { stav: s, akcia: 'zastav' };
    case 'viditelne': {
      var dlho = stav.skrytyOd != null && (udalost.cas - stav.skrytyOd) >= MIC_SKRYTE_LIMIT;
      s.skrytyOd = null;
      return { stav: s, akcia: dlho ? 'nova-instancia' : 'nic' };
    }
    default: throw new RangeError('neznámy typ udalosti: ' + typ);
  }
}
if (typeof module !== 'undefined') module.exports = { rozhodniOpravu };
