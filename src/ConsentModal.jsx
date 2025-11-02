import React from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";

export default function ConsentModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  const [form, setForm] = React.useState({
    video: true,
    audio: true,
    bio: true,
    age: true,
  });

  function toggleField(f) {
    setForm((prev) => ({ ...prev, [f]: !prev[f] }));
  }

  function handleConfirm() {
    onConfirm(form);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900/95 text-gray-100 rounded-2xl w-[92vw] max-w-md border border-white/10 shadow-2xl p-6">
        <CardHeader className="pb-3 text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Meeting Consent
          </CardTitle>
          <p className="text-gray-300 text-sm mt-1">
            Please confirm what you agree to share during this meeting.
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {[
            ["video", "Video capture (only if SOS activated)"],
            ["audio", "Audio capture (only if SOS activated)"],
            ["bio", "Biometric verification (fingerprint or face ID)"],
            ["age", "Confirm you are 18+ and legally consenting"],
          ].map(([field, label]) => (
            <label
              key={field}
              className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={form[field]}
                onChange={() => toggleField(field)}
                className="accent-indigo-500 h-4 w-4"
              />
              <span className="text-gray-100 text-sm">{label}</span>
            </label>
          ))}
        </CardContent>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-200 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-white/10 text-white hover:bg-white/20 rounded-2xl"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
