import React from 'react';

export default function ConsentModal({open, onClose, onConfirm}) {
  const [video, setVideo] = React.useState(false);
  const [audio, setAudio] = React.useState(false);
  const [bio, setBio] = React.useState(false);
  const [age, setAge] = React.useState(false);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-6">
        <h3 className="text-lg font-bold">Consent to recording & verification</h3>
        <p className="mt-2 text-sm text-slate-600">Please choose which features you consent to for this meeting. You can opt out at any time.</p>
        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-3"><input type="checkbox" checked={video} onChange={e=>setVideo(e.target.checked)} /> Video recording</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={audio} onChange={e=>setAudio(e.target.checked)} /> Audio recording</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={bio} onChange={e=>setBio(e.target.checked)} /> Use device biometrics for verification</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={age} onChange={e=>setAge(e.target.checked)} /> I confirm I am 18 or older</label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={()=>{ if(!age){alert('You must confirm age'); return;} onConfirm({video, audio, bio, age}) }}>Start meeting</button>
        </div>
      </div>
    </div>
  );
}
