import { generateRegistrationOptions } from '@simplewebauthn/server';
export default async function handler(req, res) {
  const body = (req.method==='POST') ? await jsonBody(req) : {};
  const userId = body.userId || 'demo-user';
  const rpID = new URL(process.env.SITE_URL || 'https://msa-landing.vercel.app').hostname;
  const options = generateRegistrationOptions({
    rpName: 'Meet Safe Always',
    rpID,
    userID: userId,
    userName: body.username || 'demo@meetsafe.app',
    attestationType: 'none',
    authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'preferred' },
    timeout: 60000,
    pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
  });
  // TODO: store options.challenge server-side associated with userId
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify(options));
}

function jsonBody(req) {
  return new Promise((resolve) => {
    let d=''; req.on('data', c=>d+=c); req.on('end', ()=>{ try{resolve(JSON.parse(d||'{}'))}catch(e){resolve({})}});
  });
}
