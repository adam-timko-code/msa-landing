MSA Landing Feature: Consent + WebAuthn (prototype)

This package contains a feature branch scaffold for implementing:
- Per-meeting consent modal + /api/meeting_consent server handler
- WebAuthn server endpoints for registration and authentication using @simplewebauthn/server
- Meet challenge flow: /api/meet/start, /api/meet/approve, /api/meet/status
- Frontend consent modal component (React) and /verify/[meetId] page stub

**Important:** This is a developer scaffold. You must integrate with your DB, KMS, and production secrets.
See the PDF `concerns_and_risks.pdf` for legal & security considerations before deploying to production.