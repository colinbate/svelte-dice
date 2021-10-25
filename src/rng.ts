const MAX_INT = 2147483647;
const CHARSET = 'abcdefghijkmnpqrstuvwxyz-ABCDEFGHJKLMNPQRSTUVWXYZ_23456789';
const CLEN = CHARSET.length;
const DEFAULT_ID_LENGTH = 5;

function rand() {
  const a = new Uint32Array(1);
  window.crypto.getRandomValues(a);
  return (a[0] & MAX_INT) / MAX_INT;
}

export function randSide(sides: number) {
  return Math.floor(rand() * sides) + 1;
}

export function shortId(len = DEFAULT_ID_LENGTH) {
  let out = '';
  while (len) {
    const r = rand() * CLEN;
    out += CHARSET.charAt(r);
    len -= 1;
  }
  return out;
}
