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
    desc: "ID + selfie match to reduce catfish and throwaway accounts.",
  },
  {
    icon: <IdCard className="h-6 w-6" aria-hidden />,
    title: "Smart ID Check",
    desc: "On-device checks with liveness—privacy-first by design.",
  },
  {
    icon: <Smartphone className="h-6 w-6" aria-hidden />,
    title: "One-Tap SOS",
    desc: "Silent alert with live location to trusted contacts.",
  },
  {
    icon: <MapPin className="h-6 w-6" aria-hidden />,
    title: "Meet Plan",
    desc: "Share where/when you’ll meet. Auto-expires when you’re safe.",
  },
  {
    icon: <BellRing className="h-6 w-6" aria-hidden />,
    title: "Auto Check-ins",
    desc: "Light nudges during the meet; escalate only if needed.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6" aria-hidden />,
    title: "Trusted Community",
    desc: "Build reputation with verified, safe meetups.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    bullets: ["Verify 1 profile", "1 trusted contact", "Basic meet plan", "Email support"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Plus",
    price: "$4",
    period: "/mo",
    bullets: ["Passkey sign-in", "Up to 5 contacts", "Auto check-ins", "Priority support"],
    cta: "Go Plus",
    highlight: true,
  },
  {
    name: "Pro",
    price: "$8",
    period: "/mo",
    bullets: ["Unlimited contacts", "Export meet receipts", "Advanced controls", "Early access"],
    cta: "Go Pro",
    highlight: false,
  },
];

export default function App() {
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
      let j = null;
      try {
        const res = await fetch("/api/meet_start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetUserId: "demo-user-1" }),
        });
        if (res.ok) j = await res.json();
      } catch (_) {}
      const localMeetId = `local-${Date.now().toString(36)}`;
      const goodMeetId = j?.meetId || localMeetId;
      const goodQrUrl = j?.qrUrl || `${window.location.origin}/verify/${goodMeetId}`;
      setMeetId(goodMeetId);
      setQrUrl(goodQrUrl);
      setQrOpen(true);
    } catch (e) {
      alert("❌ " + e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
  <div
    className="min-h-screen text-gray-100 bg-cover bg-center bg-fixed"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), url('/background.png.png')",
    }}
  >
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-indigo-600 text-white grid place-items-center font-bold">
              MSA
            </div>
            <span className="font-semibold tracking-tight text-white">Meet Safe Always</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="text-gray-200 hover:text-white">
              How it works
            </a>
            <a href="#features" className="text-gray-200 hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-gray-200 hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="text-gray-200 hover:text-white">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex text-gray-200 hover:text-white">
              Sign in
            </Button>
            <Button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
              Get the App
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Meet who’s really behind the profile.
            </motion.h1>
            <p className="mt-5 text-lg text-gray-200 max-w-prose">
              <em>Identity verified. Plans shared. Safety built in.</em> Connect confidently with
              privacy-first tools that turn first meets into safer meets.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="rounded-2xl bg-white/10 text-white hover:bg-white/20">
                Try the demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
                Watch 90-sec overview
              </Button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white"
                onClick={onStartMeetingClick}
                disabled={busy}
              >
                Start Meeting (Consent)
              </Button>
              <Button
                className="rounded-2xl bg-gradient-to-r from-slate-500 to-slate-400 text-white"
                onClick={startVerifyQR}
                disabled={busy}
              >
                Verify Me (QR)
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" /> No tracking between meets
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" /> You choose what to share
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl bg-white/10 backdrop-blur-md shadow-xl p-5 md:p-6 border border-white/15 text-gray-100">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Card className="rounded-2xl bg-white/10 border border-white/15 text-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Verify
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-200">
                    ID + selfie match builds trust without oversharing.
                  </CardContent>
                </Card>
                <Card className="rounded-2xl bg-white/10 border border-white/15 text-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-200">
                    Send a safety brief: where, when, and who you’re meeting.
                  </CardContent>
                </Card>
                <Card className="rounded-2xl bg-white/10 border border-white/15 text-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BellRing className="h-4 w-4" /> Check-in
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-200">
                    Automatic check-ins with quick replies or safe words.
                  </CardContent>
                </Card>
                <Card className="rounded-2xl bg-white/10 border border-white/15 text-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Smartphone className="h-4 w-4" /> SOS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-200">
                    Silent SOS shares live location and calls your people.
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 pb-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">How it works</h2>
          <p className="mt-3 text-gray-300">Three simple steps to safer meets.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="rounded-2xl bg-white/10 border border-white/15 text-gray-100">
              <CardHeader>
                <CardTitle className="text-xl">Step {n}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200">
                {n === 1 && (
                  <p>
                    Verify each other with ID + selfie and pick what to share. No public posting, no
                    stalking surface.
                  </p>
                )}
                {n === 2 && (
                  <p>
                    Create a meet plan with time window, venue, and discreet check-ins. Add trusted
                    contacts in one tap.
                  </p>
                )}
                {n === 3 && (
                  <p>
                    Enjoy the date. Check-ins run in the background. Miss one? We nudge you first,
                    then your contacts if needed.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Built for real-world safety
          </h2>
          <p className="mt-3 text-gray-300">
            Privacy-first design and practical tools that actually get used.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} className="rounded-2xl bg-white/10 border border-white/15 text-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {f.icon}
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-200">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10">
        <Card className="rounded-3xl bg-white/10 border border-white/15 text-gray-100">
          <CardContent className="p-6 md:p-10">
            <div className="md:flex items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold text-white">Be first to the beta</h3>
                <p className="mt-2 text-gray-300">
                  Join the early access list. We’ll only email you about launch and major updates.
                </p>
              </div>
              <form className="mt-6 md:mt-0 flex w-full md:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-2xl min-w-[240px] bg-white/80 text-gray-900 placeholder:text-gray-500"
                  required
                />
                <Button type="submit" className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
                  Notify me
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-gray-300">Start free. Upgrade when you want more control.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <Card
              key={i}
              className={`rounded-2xl bg-white/10 border text-gray-100 ${
                t.highlight ? "border-indigo-400 shadow-xl" : "border-white/15"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  {t.name}
                  {t.highlight && (
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-600 text-white">
                      Most popular
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">{t.price}</span>
                  <span className="text-gray-300 mb-1">{t.period}</span>
                </div>
                <ul className="mt-4 space-y-2 text-gray-200">
                  {t.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1" /> {b}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 rounded-2xl bg-white/10 text-white hover:bg-white/20">
                  {t.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">FAQs</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-gray-200">
          <div>
            <h3 className="font-semibold text-white">Do you track my location all the time?</h3>
            <p className="mt-2">
              No. Location pings only during an active meet window or SOS, and you control who sees it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">How does verification work?</h3>
            <p className="mt-2">
              We combine ID scan, selfie liveness, and optional signals. You choose what to share and with
              whom.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Can I use this outside dating apps?</h3>
            <p className="mt-2">Absolutely—use it for marketplace meetups, study groups, or any first-time meet.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">What happens if I miss a check-in?</h3>
            <p className="mt-2">
              We nudge you first. If there’s no response, we escalate to your trusted contacts per your
              rules.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-3 gap-6 text-sm text-gray-300">
          <div>
            <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold">
              MSA
            </div>
            <p className="mt-3">© {new Date().getFullYear()} Meet Safe Always. All rights reserved.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Company</p>
            <a href="#" className="block hover:text-white">
              About
            </a>
            <a href="#" className="block hover:text-white">
              Careers
            </a>
            <a href="#" className="block hover:text-white">
              Privacy
            </a>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Get the app</p>
            <a href="#" className="block hover:text-white">
              iOS (TestFlight)
            </a>
            <a href="#" className="block hover:text-white">
              Android (Beta)
            </a>
            <a href="#" className="block hover:text-white">
              Web demo
            </a>
          </div>
        </div>
      </footer>

      <ConsentModal open={consentOpen} onClose={() => setConsentOpen(false)} onConfirm={handleConsentConfirm} />

      {qrOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-[92vw] max-w-md border border-black/10 shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-1 text-gray-900">Verify Me</h3>
            <p className="text-slate-600 mb-4">
              Have the other person scan this QR to open your verification page.
            </p>
            {qrUrl ? (
              <div className="flex flex-col items-center gap-3">
                <img
                  alt="QR code"
                  width="240"
                  height="240"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrUrl)}`}
                />
                <a className="text-sm text-indigo-700 underline break-all" href={qrUrl} target="_blank" rel="noreferrer">
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
        </div>
      )}
    </div>
  );
}
