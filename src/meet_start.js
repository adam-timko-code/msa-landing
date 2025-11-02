import crypto from 'crypto';

export default async function handler(req, res) {
  const body = (req.method === 'POST') ? await jsonBody(req) : {};
  const targetUserId = body.targetUserId;
  const meetId = crypto.randomUUID();
  const challenge = base64urlRandom(32);
  const expiresAt = Date.now() + 2*60*1000;
  // TODO: persist to DB: { meetId, targetUserId, challenge, status:'PENDING', expiresAt }
  const qrUrl = (process.env.SITE_URL || 'https://msa-landing.vercel.app') + '/verify/' + meetId;
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({ meetId, qrUrl, expiresAt }));
}

function base64urlRandom(len) {
  return Buffer.from(crypto.randomBytes(len)).toString('base64url');
}

function jsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch(e) { resolve({}); }
    });
    req.on('error', reject);
  });
}
