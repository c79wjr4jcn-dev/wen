// QEN – režim mikrofónu na iPhone.
// 'jedna' = jedno rozpoznávanie reči pre všetky vety (Chrome sa nepýta pri každej vete).
// Ak dvakrát po sebe nič nepočuje, prepne sa na 'nova' = nové rozpoznávanie pri každej vete (doterajšie správanie).
function novyRezim() { return { rezim: 'jedna', hluche: 0 }; }
function dalsiRezim(stav, udalost) {
  if (udalost === 'text') return { rezim: stav.rezim, hluche: 0 };
  if (udalost === 'hluche') {
    const hluche = stav.hluche + 1;
    if (stav.rezim === 'jedna' && hluche >= 2) return { rezim: 'nova', hluche: 0 };
    return { rezim: stav.rezim, hluche: hluche };
  }
  throw new RangeError('neznáma udalosť mikrofónu: ' + udalost);
}
if (typeof module !== 'undefined') module.exports = { novyRezim, dalsiRezim };
