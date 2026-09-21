import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Quote() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  return (
    <div className="pt-[72px] bg-ink-deep min-h-screen py-16 text-white">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-soft uppercase">RFQ — Request for Quotation</p>
        <h1 className="font-display mt-3 text-4xl md:text-5xl font-black">{t('cta.title')}</h1>
        <p className="mt-3 text-mist">{t('cta.sub')}</p>
        <div className="mt-6 flex gap-2">{[1, 2].map((s) => <span key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? 'bg-brand' : 'bg-white/15'}`} />)}</div>
        {done ? <div className="mt-8 rounded-3xl border border-brand/40 bg-brand/15 p-10 text-center text-xl font-bold text-brand-soft">{t('contactPage.ok')}</div> : (
          <div className="mt-8 rounded-3xl bg-white/[0.06] p-8 ring-1 ring-white/10">
            {step === 1 ? (
              <div className="grid gap-3">
                {['Civil / Architecture', 'Finishing', 'Mechanical (HVAC / Fire)', 'Electrical / BMS', 'Food Solution (Stainless)'].map((o) => (
                  <button key={o} onClick={() => setStep(2)} className="rounded-2xl border border-white/15 px-6 py-4 text-start font-bold hover:border-brand hover:bg-brand/10">{o}</button>
                ))}
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder={t('contactPage.name')} className="rounded-2xl bg-white/10 px-5 py-4 outline-none placeholder:text-mist/60 focus:ring-2 ring-brand" />
                  <input required placeholder={t('contactPage.phone')} className="rounded-2xl bg-white/10 px-5 py-4 outline-none placeholder:text-mist/60 focus:ring-2 ring-brand" />
                </div>
                <textarea rows={4} placeholder={t('contactPage.msg')} className="w-full rounded-2xl bg-white/10 px-5 py-4 outline-none placeholder:text-mist/60 focus:ring-2 ring-brand" />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="rounded-2xl border border-white/20 px-6 py-4 font-bold">←</button>
                  <button className="flex-1 rounded-2xl bg-brand py-4 font-bold text-[#15150F] hover:bg-brand-dark">{t('contactPage.send')}</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
