import crypto from 'crypto';

export function signPayload(payload, secret) {
  const h = crypto.createHmac('sha256', secret);
  h.update(JSON.stringify(payload));
  return h.digest('base64');
}
