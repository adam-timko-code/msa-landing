export default async function handler(req, res) {
  // Expect a body: { meetId, assertion } where assertion is the client WebAuthn result
  // TODO: verify assertion against stored public key for target user and mark meet VERIFIED
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({ ok:true }));
}
