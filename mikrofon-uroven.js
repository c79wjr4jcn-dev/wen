// QEN – farba a žiara kruhu mikrofónu podľa stavu + skutočná hlasitosť (decibely).
var MIC_UROVNE = {
  vypnute: [0, 'siva', 'Mikrofón vypnutý'],
  start: [1, 'modra', 'Zapínam…'],
  audio: [2, 'zelena', 'Počúvam'],
  zvuk: [3, 'zelena', 'Počujem zvuk'],
  rec: [4, 'zelena', 'Počujem reč'],
  text: [3, 'zelena', 'Rozumiem'],
  hluche: [1, 'oranzova', 'Nepočujem – ťukni na 🎤'],
  chyba: [1, 'cervena', 'Mikrofón nejde']
};
function urovenZUdalosti(udalost, dlzkaTextu) {
  if (!Object.prototype.hasOwnProperty.call(MIC_UROVNE, udalost)) throw new RangeError('neznáma udalosť: ' + udalost);
  var u = MIC_UROVNE[udalost];
  var ciarky = u[0];
  if (udalost === 'text') {
    var n = (typeof dlzkaTextu === 'number' && isFinite(dlzkaTextu) && dlzkaTextu > 0) ? dlzkaTextu : 0;
    ciarky = 3 + Math.min(2, Math.floor(n / 15));
  }
  return { ciarky: ciarky, farba: u[1], popis: u[2] };
}
// rms 0–1 → 0–5 čiarok podľa decibelov
function urovenZRms(rms) {
  if (typeof rms !== 'number' || !isFinite(rms) || rms <= 0) return 0;
  var db = 20 * Math.log10(rms);
  if (db < -55) return 0;
  if (db < -45) return 1;
  if (db < -38) return 2;
  if (db < -30) return 3;
  if (db < -22) return 4;
  return 5;
}
if (typeof module !== 'undefined') module.exports = { urovenZUdalosti, urovenZRms };
