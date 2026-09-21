import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const { t } = useTranslation();
  const lang = useLocation().pathname.split('/').includes('ar') ? 'ar' : 'en';
  const [ok, setOk] = useState(false);
  return (
    <div className="pt-[72px] bg-mist-bg min-h-screen py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-ink text-balance">{t('contactPage.title')}</h1>
          <div className="mt-8 space-y-4 text-sm">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10"><b className="font-display block">Egypt — HQ</b>106 Nile Street, First Floor, Apartment 16, Dokki, Giza, Egypt<br />+20 106 727 1246 • +20 100 188 9992 • +20 100 891 3975<br />+20 2 3760 8366 • +20 2 3762 7066<br />civac@civac-eg.com • mech@civac-eg.com • elec@civac-eg.com • civil@civac-eg.com</div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10"><b className="font-display block">Saudi Arabia</b>7708 Thawban Al Nabawi St, Batha Quraysh District, Makkah — 5024 — 24352, Saudi Arabia<br />+966 566 855 589</div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10"><b className="font-display block">UAE</b>Business Center, Sharjah Publishing City Free Zone, Sharjah, United Arab Emirates<br />+971 581 959 610<br />info@maf-fzc.com • M.aleraky@maf-fzc.com</div>
          </div>
          <iframe title="map" className="mt-6 h-64 w-full rounded-3xl ring-1 ring-ink/10" loading="lazy" src="https://www.google.com/maps?q=Dokki,Giza,Egypt&output=embed" />
          <div className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-ink/10">
            <p className="text-xs font-bold tracking-[0.25em] text-ink-soft/70 uppercase">{lang === 'ar' ? 'جولة' : 'Office'}</p>
            <h2 className="font-display mt-2 text-2xl font-extrabold text-ink">{lang === 'ar' ? 'جولة في مكاتبنا' : 'Office Tour'}</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=70&auto=format&fit=crop" alt="CIVAC office" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=70&auto=format&fit=crop" alt="CIVAC office workspace" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=70&auto=format&fit=crop" alt="CIVAC meeting room" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            </div>
          </div>
          <div className="mt-4 rounded-3xl bg-ink p-6 text-white">
            <p className="text-xs font-bold tracking-[0.25em] text-brand-soft uppercase">{lang === 'ar' ? 'الهيكل التنظيمي' : 'Org Chart'}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
              {['Engineering', 'Projects', 'HSE', 'QA'].map((d) => (
                <div key={d} className="rounded-2xl bg-white/10 px-4 py-5 font-bold text-brand-soft ring-1 ring-white/10">{d}</div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} className="h-fit rounded-3xl bg-ink p-8 text-white lg:sticky lg:top-24">
          {ok ? <div className="rounded-2xl bg-brand/20 border border-brand/40 p-6 text-center font-bold text-brand-soft">{t('contactPage.ok')}</div> : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder={t('contactPage.name')} className="rounded-2xl bg-white/10 px-5 py-4 text-white placeholder:text-mist/60 outline-none ring-brand focus:ring-2" />
                <input required placeholder={t('contactPage.phone')} className="rounded-2xl bg-white/10 px-5 py-4 outline-none focus:ring-2 ring-brand placeholder:text-mist/60" />
              </div>
              <select className="w-full rounded-2xl bg-white/10 px-5 py-4 outline-none text-white [&>option]:text-black"><option>Civil / Architecture</option><option>Finishing</option><option>Mechanical</option><option>Electrical</option><option>Food Solution</option></select>
              <textarea required rows={5} placeholder={t('contactPage.msg')} className="w-full rounded-2xl bg-white/10 px-5 py-4 outline-none focus:ring-2 ring-brand placeholder:text-mist/60" />
              <button className="w-full rounded-2xl bg-brand py-4 font-bold text-[#15150F] hover:bg-brand-dark">{t('contactPage.send')}</button>
              <a href="https://wa.me/201067271246" target="_blank" rel="noreferrer" className="block text-center rounded-2xl border border-white/20 py-4 font-bold hover:border-brand">{t('cta.btn2')}</a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
