import { signPayload } from './lib_sign.js';
import crypto from 'crypto';

export default async function handler(req, res) {
  try {
    const body = (req.method === 'POST') ? await jsonBody(req) : {};
    const rec = {
      id: crypto.randomUUID(),
      userId: body.userId || null,
      meetingId: body.meetingId || null,
      consentVideo: !!body.consentVideo,
      consentAudio: !!body.consentAudio,
      consentBiometric: !!body.consentBiometric,
      ageAttestation: !!body.ageAttestation,
      timestamp: new Date().toISOString(),
      ip: (req.headers['x-forwarded-for'] || req.socket.remoteAddress),
      ua: req.headers['user-agent'] || '',
    };
    // TODO: Persist rec to DB
    const serverSignature = signPayload(rec, process.env.CONSENT_SIGNING_SECRET || 'dev-secret');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, rec, serverSignature }));
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ ok:false, error: e.message }));
  }
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
