import React from "react";
import { motion } from "framer-motion";
import { Check, Shield, Smartphone, BellRing, IdCard, MapPin, HeartHandshake, QrCode, ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";

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
    icon: <HeartHandshake className="h-6 w-6" aria-hidden />,
    title: "Pre-Meet Vetting",
    desc: "Share a one-time safety brief before you meet: names, selfies, meet spot, time window, and expectations.",
  },
  {
    icon: <MapPin className="h-6 w-6" aria-hidden />,
    title: "Trusted Contacts",
    desc: "Hand off your plan to friends/family with automatic ETA and location breadcrumbs.",
  },
  {
    icon: <BellRing className="h-6 w-6" aria-hidden />,
    title: "Check-ins & Timers",
    desc: "Auto check-ins during the date, escalation if you miss one, and discrete exit cues.",
  },
  {
    icon: <Smartphone className="h-6 w-6" aria-hidden />,
    title: "Quick SOS",
    desc: "One-press SOS with silent video, location, and call tree to your chosen contacts.",
  },
  {
    icon: <QrCode className="h-6 w-6" aria-hidden />,
    title: "Venue QR Verify",
    desc: "Optional QR at coffee shops/bars to confirm you actually met—no more ghost meetups.",
  },
];

const tiers = [
  {
    name: "Essential",
    price: "$0",
    period: "forever",
    bullets: [
      "Basic profile verification",
      "1 trusted contact",
      "Single meet plan per week",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Plus",
    price: "$6",
    period: "/mo",
    bullets: [
      "Priority verification + selfie match",
      "Up to 5 trusted contacts",
      "Unlimited meet plans & check-ins",
      "Discreet SOS & call tree",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    bullets: [
      "Advanced venue QR verify",
      "Auto-escalation workflows",
      "Export safety reports",
      "Beta access to new features",
    ],
    cta: "Go Pro",
    highlight: false,
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-100 via-brand-50 to-brand-400 text-slate-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">MSA</div>
            <span className="font-semibold tracking-tight">Meet Safe Always</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-slate-600">How it works</a>
            <a href="#features" className="hover:text-slate-600">Features</a>
            <a href="#pricing" className="hover:text-slate-600">Pricing</a>
            <a href="#faq" className="hover:text-slate-600">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
            <Button className="rounded-2xl">Get the App</Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight"
            >
              Meet who’s really behind the profile.
            </motion.h1>
            <p className="mt-5 text-lg text-slate-600 max-w-prose">
              <em>Identity verified. Plans shared. Safety built in.</em> MSA brings trust, privacy, and peace of mind to real-world meetups—so you can connect confidently.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="rounded-2xl">
                Try the demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="secondary" className="rounded-2xl">Watch 90-sec overview</Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Check className="h-4 w-4" /> No tracking between meets</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4" /> You choose what to share</div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl bg-white shadow-xl p-4 md:p-6 border border-slate-200">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Card className="rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Verify</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-600">
                    ID + selfie match builds trust without oversharing.
                  </CardContent>
                </Card>
                <Card className="rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4" /> Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-600">
                    Send a safety brief: where, when, and who you’re meeting.
                  </CardContent>
                </Card>
                <Card className="rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2"><BellRing className="h-4 w-4" /> Check-in</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-600">
                    Automatic check-ins with quick replies or safe words.
                  </CardContent>
                </Card>
                <Card className="rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2"><Smartphone className="h-4 w-4" /> SOS</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-600">
                    Silent SOS shares live location and calls your people.
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-slate-600">Three simple steps to safer meets.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((n) => (
            <Card key={n} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl">Step {n}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                {n === 1 && (<p>Verify each other with ID + selfie and pick what to share. No public posting, no stalking surface.</p>)}
                {n === 2 && (<p>Create a meet plan with time window, venue, and a discreet check-in schedule. Add trusted contacts in one tap.</p>)}
                {n === 3 && (<p>Enjoy the date. Check-ins run in the background. Miss one? We nudge you first, then your contacts if needed.</p>)}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for real‑world safety</h2>
          <p className="mt-3 text-slate-600">Privacy-first design and practical tools that actually get used.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">{f.icon}{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <Card className="rounded-3xl">
          <CardContent className="p-6 md:p-10">
            <div className="md:flex items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold">Be first to the beta</h3>
                <p className="mt-2 text-slate-600">Join the early access list. We’ll only email you about launch and major updates.</p>
              </div>
              <form className="mt-6 md:mt-0 flex w-full md:w-auto gap-3" onSubmit={(e)=>e.preventDefault()}>
                <Input type="email" placeholder="you@example.com" className="rounded-2xl min-w-[240px]" required />
                <Button type="submit" className="rounded-2xl">Notify me</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="mt-3 text-slate-600">Start free. Upgrade when you want more control.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <Card key={i} className={`rounded-2xl border ${t.highlight ? 'border-slate-900 shadow-xl' : 'border-slate-200'}`}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  {t.name}
                  {t.highlight && <span className="text-xs px-2 py-1 rounded-full bg-slate-900 text-white">Most popular</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold">{t.price}</span>
                  <span className="text-slate-500 mb-1">{t.period}</span>
                </div>
                <ul className="mt-4 space-y-2 text-slate-600">
                  {t.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2"><Check className="h-4 w-4 mt-1" /> {b}</li>
                  ))}
                </ul>
                <Button className="w-full mt-6 rounded-2xl">{t.cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQs</h2>
          <p className="mt-3 text-slate-600">Short answers to common questions.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
          <div>
            <h3 className="font-semibold">Do you track my location all the time?</h3>
            <p className="mt-2 text-slate-600">No. Location pings only during an active meet window or SOS, and you control who sees it.</p>
          </div>
          <div>
            <h3 className="font-semibold">How does verification work?</h3>
            <p className="mt-2 text-slate-600">We combine ID scan, selfie liveness, and optional signals. You choose what to share and with whom.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I use this outside dating apps?</h3>
            <p className="mt-2 text-slate-600">Absolutely—use it for marketplace meetups, study groups, or any first-time meet.</p>
          </div>
          <div>
            <h3 className="font-semibold">What happens if I miss a check-in?</h3>
            <p className="mt-2 text-slate-600">We nudge you first. If there’s no response, we escalate to your trusted contacts per your rules.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-600">
          <div>
            <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">MSA</div>
            <p className="mt-3">© {new Date().getFullYear()} Meet Safe Always. All rights reserved.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-slate-800">Company</p>
            <a href="#" className="block hover:text-slate-900">About</a>
            <a href="#" className="block hover:text-slate-900">Careers</a>
            <a href="#" className="block hover:text-slate-900">Privacy</a>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-slate-800">Get the app</p>
            <a href="#" className="block hover:text-slate-900">iOS (TestFlight)</a>
            <a href="#" className="block hover:text-slate-900">Android (Beta)</a>
            <a href="#" className="block hover:text-slate-900">Web demo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
