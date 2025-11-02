import { verifyRegistrationResponse } from '@simplewebauthn/server';
export default async function handler(req, res) {
  const body = (req.method==='POST') ? await jsonBody(req) : {};
  // body contains client attestation response - verify with library and store credential
  // TODO: implement verifyRegistrationResponse(...) and persist credentialId, publicKey, signCount
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({ ok:true }));
}

function jsonBody(req) { return new Promise((resolve)=>{let d='';req.on('data',c=>d+=c);req.on('end',()=>{try{resolve(JSON.parse(d||'{}'))}catch(e){resolve({})}})}) }
