const dns = require('dns').promises;

const COMMON = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'live.com',
 'yahoo.es', 'hotmail.es', 'outlook.es', 'unisangil.edu.co'];
const EXEMPT = ['mail.com', 'email.com', 'msn.com', 'me.com', 'aol.com', 'gmx.com', 'proton.me',
'protonmail.com', 'pm.me', 'yandex.com', 'zoho.com'];   
function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
 d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
} } return d[a.length][b.length];
}


function suggestDomain(domain) {
  if (COMMON.includes(domain) || EXEMPT.includes(domain)) return null;
  let best = null, bestD = 3;
  for (const c of COMMON) {
    const dist = distance(domain, c);
    if (dist < bestD) { bestD = dist; best = c; }
  }
  return bestD <= 2 ? best : null;
}


async function domainExists(domain) {
  const lookup = async () => {
    try {
      const mx = await dns.resolveMx(domain);
      if (mx.length) return true;
    } catch (err) {
      if (!['ENOTFOUND', 'ENODATA'].includes(err.code)) return true;   
        }  
    try {
      await dns.resolve4(domain);
      return true;
    } catch (err) {
      return !['ENOTFOUND', 'ENODATA'].includes(err.code);
    }
  };
  const timeout = new Promise((resolve) => setTimeout(() => resolve(true), 3000));   // si tarda mucho, no bloquea
  return Promise.race([lookup(), timeout]);
}

module.exports = { suggestDomain, domainExists };
