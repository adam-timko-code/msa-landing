import React from 'react';

export default function VerifyPage({meetId}) {
  const [status, setStatus] = React.useState('PENDING');
  React.useEffect(()=>{
    let t = setInterval(async ()=>{
      const res = await fetch('/api/meet_status?meetId=' + meetId);
      const j = await res.json();
      setStatus(j.status || 'PENDING');
    }, 2000);
    return ()=>clearInterval(t);
  },[meetId]);
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Verification for meeting {meetId}</h2>
      <p className="mt-4">Status: <strong>{status}</strong></p>
      <p className="mt-2 text-sm text-slate-600">Waiting for target user to Approve on their device...</p>
    </div>
  );
}
