import { useEffect, useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import { getClients } from '../lib/api';

export default function Clients() {
  const [clients, setClients] = useState<string[] | null>(null);
  useEffect(() => {
    getClients().then(setClients);
  }, []);
  return (
    <div className="pt-[72px] bg-white py-16 min-h-screen"><div className="mx-auto max-w-7xl px-5">
      <h1 className="font-display text-4xl md:text-5xl font-black text-ink">Clients & Partners</h1>
      <p className="mt-3 text-ink-soft">Industrial, retail, developers and public sector.</p>
      {clients === null ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[76px] animate-pulse rounded-2xl bg-mist-bg ring-1 ring-ink/5" />
        ))}</div>
      ) : (
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{clients.map((c) => (
        <div key={c} className="flex items-center gap-3 rounded-2xl bg-mist-bg p-6 font-display font-extrabold text-ink card-hover ring-1 ring-ink/5"><BadgeCheck className="text-brand" />{c}</div>
      ))}</div>
      )}
    </div></div>
  );
}
