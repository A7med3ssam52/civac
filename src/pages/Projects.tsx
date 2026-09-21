import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getProjects } from '../lib/api';
import type { Project } from '../lib/api';
import { categories } from '../data/projects';
import { useLang, px } from '../hooks/useLang';
import { SectionHeading } from '../components/ui';

export default function Projects() {
  const { t } = useTranslation();
  const lang = useLang();
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    getProjects().then(setProjects);
  }, []);
  const [f, setF] = useState('all');
  const shown = (projects ?? []).filter((p) => f === 'all' || p.category === f);
  return (
    <div className="pt-[72px] bg-white min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow={t('projects.eyebrow')} title={t('projects.title')} sub={t('projects.subtitle')} />
        <div className="mt-8 flex flex-wrap gap-2">
          <button onClick={() => setF('all')} className={`rounded-full px-5 py-2.5 text-sm font-bold ${f === 'all' ? 'bg-ink text-white' : 'bg-mist-bg text-ink'}`}>{t('projects.all')} ({(projects ?? []).length})</button>
          {categories.map((c) => (
            <button key={c} onClick={() => setF(c)} className={`rounded-full px-5 py-2.5 text-sm font-bold ${f === c ? 'bg-ink text-white' : 'bg-mist-bg text-ink'}`}>{c}</button>
          ))}
        </div>
        {projects === null ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <div key={i} className="h-80 animate-pulse overflow-hidden rounded-3xl bg-mist-bg ring-1 ring-ink/10" />)}
          </div>
        ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <article key={p.slug} className="card-hover overflow-hidden rounded-3xl ring-1 ring-ink/10">
              <div className="relative aspect-[16/10] overflow-hidden group">
                <img src={p.image} alt={lang === 'ar' ? p.titleAr : p.titleEn} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-4 start-4 rounded-full bg-ink-deep/85 px-3 py-1.5 text-xs font-bold text-brand-soft backdrop-blur">{p.category}</span>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-brand-deep">{lang === 'ar' ? p.clientAr : p.clientEn} • {p.year}</div>
                <h3 className="font-display mt-2 font-extrabold text-ink">{lang === 'ar' ? p.titleAr : p.titleEn}</h3>
                <Link to={px(lang, `/projects/${p.slug}`)} className="mt-3 inline-flex items-center gap-1 text-sm font-bold">{t('projects.details')}<ArrowRight size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
