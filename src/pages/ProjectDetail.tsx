import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getProjects } from '../lib/api';
import type { Project } from '../lib/api';
import { useLang, px } from '../hooks/useLang';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useLang();
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    getProjects().then(setProjects);
  }, []);
  if (projects === null) {
    return (
      <div className="pt-[72px]">
        <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink-deep">
          <div className="mx-auto w-full max-w-7xl px-5 py-16">
            <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
            <div className="mt-4 h-14 w-3/4 animate-pulse rounded-2xl bg-white/10" />
            <div className="mt-4 h-6 w-1/2 animate-pulse rounded-full bg-white/10" />
          </div>
        </section>
      </div>
    );
  }
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <div className="pt-32 text-center">Not found — <Link to={px(lang, '/projects')}>back</Link></div>;
  return (
    <div className="pt-[72px]">
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink-deep">
        <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-16">
          <Link to={px(lang, '/projects')} className="text-sm font-bold text-brand-soft">← {t('projects.eyebrow')}</Link>
          <h1 className="font-display mt-3 max-w-4xl text-4xl md:text-6xl font-black text-white">{lang === 'ar' ? p.titleAr : p.titleEn}</h1>
          <p className="mt-3 text-mist">{lang === 'ar' ? p.clientAr : p.clientEn} • {lang === 'ar' ? p.locationAr : p.locationEn}</p>
        </div>
      </section>
      <section className="bg-white py-12"><div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-4">
        {[[t('projects.client'), lang === 'ar' ? p.clientAr : p.clientEn], [t('projects.budget'), lang === 'ar' ? p.budgetAr : p.budget], [t('projects.duration'), lang === 'ar' ? p.durationAr : p.duration], [t('projects.year'), p.year]].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-mist-bg p-5 ring-1 ring-ink/10"><div className="text-xs font-bold tracking-wider text-brand-deep uppercase">{k}</div><div className="font-display mt-1 text-xl font-extrabold text-ink">{v}</div></div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-5 mt-8 grid gap-8 md:grid-cols-2">
        <div><h3 className="font-display font-extrabold text-ink text-xl">{t('projects.scope')}</h3><ul className="mt-3 space-y-2">{(lang === 'ar' ? p.scopeAr : p.scopeEn).map((s) => <li key={s} className="flex gap-2 text-ink-soft"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{s}</li>)}</ul></div>
        <div className="rounded-3xl bg-ink p-8 text-white"><h3 className="font-display font-extrabold text-xl">Need similar scope?</h3><p className="mt-2 text-sm text-mist">Send BOQ or drawings — reply in 24h.</p><Link to={px(lang, '/quote')} className="mt-5 block rounded-2xl bg-brand py-3.5 text-center font-bold text-[#15150F]">Request similar project</Link></div>
      </div></section>
    </div>
  );
}
