import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Shield,
  Smartphone,
  BellRing,
  IdCard,
  MapPin,
  HeartHandshake,
  QrCode,
  ArrowRight,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import ConsentModal from "./ConsentModal";

const features = [
  {
    icon: <Shield className="h-6 w-6" aria-hidden />,
    title: "Verified Profiles",
    desc: "Multi-signal verification: ID scan, selfie match, and reputation signals to reduce catfish and burner accounts.",
  },
  {
    icon: <IdCard className="h-6 w-6" aria-hidden />,
    title: "Smart ID Check",
    desc: "On-device checks with tamper cues and liveness prompts—privacy-first by design.",
  },
  {
    icon: <Smartphone className="h-6 w-6" aria-hidden />,
    title: "One-Tap SOS",
    desc: "Hold-to-activate safety beacon with live location and emergency contact ping.",
  },
  {
    icon: <MapPin className="h-6 w-6" aria-hidden />,
    title: "Meet Map",
    desc: "Private, one-time location sharing that auto-expires when both users mark themselves safe.",
  },
  {
    icon: <BellRing className="h-6 w-6" aria-hidden />,
    title: "Real-Time Alerts",
    desc: "If a meeting goes off-script, contacts and nearby users can receive instant alerts.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6" aria-hidden />,
    title: "Trusted Community",
    desc: "Profiles grow a trust score through verified meetups, peer reviews, and consistent safe behavior.",
  },
];

export default function App() {
  // --- Consent & Verify (demo wiring) ---
  const [consentOpen, setConsentOpen] = React.useState(false);
  const [qrOpen, setQrOpen] = React.useState(false);
  const [qrUrl, setQrUrl] = React.useState("");
  const [meetId, setMeetId] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  function onStartMeetingClick() {
    setConsentOpen(true);
  }

  async function handleConsentConfirm({ video, audio, bio, age }) {
    try {
      setBusy(true);
      const res = await fetch("/api/meeting_consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "demo-user-1",
          meetingId: "demo-meeting-1",
          consentVideo: !!video,
          consentAudio: !!audio,
          consentBiometric: !!bio,
          ageAttestation: !!age,
        }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Consent failed");
      setConsentOpen(false);
      alert("✅ Consent saved for this meeting.");
    } catch (e) {
      alert("❌ " + e.message);
    } finally {
      setBusy(false);
    }
  }

  async function startVerifyQR() {
    try {
      setBusy(true);
      const res = await fetch("/api/meet_start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: "demo-user-1" }),
      });
      const j = await res.json();
      if (!j.meetId || !j.qrUrl) throw new Error("Could not start meet");
      setMeetId(j.meetId);
      setQrUrl(j.qrUrl);
      setQrOpen(true);
    } catch (e) {
      alert("❌ " + e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-100 via-brand-50 to-brand-400 text-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center">
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Safe Always
        </motion.h1>
        <p className="text-xl text-slate-700 italic mb-8">
          Identity verified. Plans shared. Safety built in.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button className="rounded-2xl">
            Try the demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="secondary" className="rounded-2xl">
            Watch 90-sec overview
          </Button>
        </div>

        {/* New Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
  <Button
    className="rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-brand-400 text-white font-semibold shadow-md hover:shadow-lg transition"
    onClick={onStartMeetingClick}
    disabled={busy}
  >
    Start Meeting (Consent)
  </Button>
  <Button
    className="rounded-2xl bg-gradient-to-r from-brand-500 via-teal-400 to-brand-300 text-white font-semibold shadow-md hover:shadow-lg transition"
    onClick={startVerifyQR}
    disabled={busy}
  >
    Verify Me (QR)
  </Button>
</div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Card key={i} className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              {f.icon}
              <CardTitle>{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">{f.desc}</CardContent>
          </Card>
        ))}
      </section>

      {/* Consent Modal */}
      <ConsentModal
        open={consentOpen}
        onClose={() => setConsentOpen(false)}
        onConfirm={handleConsentConfirm}
      />

      {/* QR Dialog */}
      {qrOpen && (
        <dialog
          open
          className="rounded-2xl p-0 w-[92vw] max-w-md border border-slate-200 shadow-2xl"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-1">Verify Me</h3>
            <p className="text-slate-600 mb-4">
              Have the other person scan this QR to open your verification page.
            </p>
            {qrUrl ? (
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="QR code"
                  width="240"
                  height="240"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                    qrUrl
                  )}`}
                />
                <a
                  className="text-sm text-brand-700 underline break-all"
                  href={qrUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {qrUrl}
                </a>
                <p className="text-xs text-slate-500">Meet ID: {meetId}</p>
              </div>
            ) : (
              <p>Generating QR…</p>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setQrOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
