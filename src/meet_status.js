export default async function handler(req, res) {
  const q = req.url.split('?')[1] || '';
  const params = Object.fromEntries(new URLSearchParams(q));
  const meetId = params.meetId || null;
  // TODO: lookup DB for meetId and return status
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({ meetId, status:'PENDING' }));
}
