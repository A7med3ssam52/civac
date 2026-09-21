import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, Factory, Fan, Paintbrush, Building2, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { detectLang } from '../lib/lang';
import { clients, projects } from '../data/projects';
import { services } from '../data/services';
import { Counter, SectionHeading } from '../components/ui';

function useLang() {
  const { pathname, hash } = useLocation();
  return detectLang(pathname, hash);
}
const px = (l: string, p: string) => (l === 'ar' ? `/ar${p === '/' ? '' : p}` : p);
const icons: Record<string, any> = { building: Building2, paint: Paintbrush, fan: Fan, zap: Zap, factory: Factory };

export default function Home() {
  const { t } = useTranslation();
  const lang = useLang();
  const [filter, setFilter] = useState<string>('all');
  const cats = useMemo(() => ['all', ...Array.from(new Set(projects.map((p) => p.category)))], []);
  const shown = useMemo(() => (filter === 'all' ? projects.slice(0, 6) : projects.filter((p) => p.category === filter).slice(0, 6)), [filter]);

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-deep">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=2000&q=70&auto=format&fit=crop" alt="CIVAC site" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-ink-deep/60 px-4 py-2 text-xs font-bold tracking-widest text-brand-soft backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />{t('hero.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display mt-5 max-w-4xl text-5xl md:text-7xl font-black leading-[1.02] text-white text-balance">
            {t('hero.titleA')}<br /><span className="text-brand-soft">{t('hero.titleB')}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-5 max-w-2xl text-lg text-mist">{t('hero.subtitle')}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-8 flex flex-wrap gap-3">
            <Link to={px(lang, '/projects')} className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-bold text-[#15150F] hover:bg-brand-dark">{t('hero.cta1')}<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link>
            <Link to={px(lang, '/quote')} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-bold text-white hover:border-brand hover:text-brand-soft">{t('hero.cta2')}<ArrowUpRight size={18} /></Link>
          </motion.div>
          <div className="mt-10 flex items-center gap-2 text-xs tracking-widest text-mist/70">{t('hero.scroll')}<ChevronDown size={14} className="animate-bounce" /></div>
        </div>
      </section>

      <section className="bg-ink-deep border-t border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-2 md:grid-cols-4">
          {(t('stats', { returnObjects: true }) as any[]).map((s, i) => (
            <div key={i} className="px-6 py-8 text-center md:border-s md:border-white/10 md:first:border-0">
              <div className="font-display text-4xl md:text-5xl font-black text-white"><Counter to={s.value} suffix={s.suffix} /></div>
              <div className="mt-2 text-sm text-mist">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-mist-bg py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} sub={t('services.subtitle')} />
            <Link to={px(lang, '/services')} className="rounded-full border border-ink px-6 py-3 text-sm font-bold text-ink hover:bg-ink hover:text-white">{t('services.viewAll')}</Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {services.map((s, i) => {
              const Icon = icons[s.icon] ?? Factory;
              return (
                <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="card-hover group rounded-3xl bg-ink p-6 text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-[#15150F]"><Icon size={22} /></div>
                  <h3 className="font-display mt-5 font-extrabold leading-snug">{lang === 'ar' ? s.titleAr : s.titleEn}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist/85">{lang === 'ar' ? s.descAr : s.descEn}</p>
                  <Link to={px(lang, `/services/${s.id}`)} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-soft">→</Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow={t('projects.eyebrow')} title={t('projects.title')} sub={t('projects.subtitle')} />
          <div className="mt-8 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${filter === c ? 'bg-ink text-white' : 'bg-mist-bg text-ink-soft hover:bg-mist-light'}`}>
                {c === 'all' ? t('projects.all') : c}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <motion.article key={p.slug} layout initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="card-hover group overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.titleEn} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 start-4 rounded-full bg-ink-deep/85 px-3 py-1.5 text-xs font-bold text-brand-soft backdrop-blur">{p.category}</span>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold tracking-wider text-brand-deep">{lang === 'ar' ? p.clientAr : p.clientEn} • {p.year}</div>
                  <h3 className="font-display mt-2 font-extrabold leading-snug text-ink">{lang === 'ar' ? p.titleAr : p.titleEn}</h3>
                  <div className="mt-3 flex gap-4 text-xs text-ink-soft/80"><span>{t('projects.budget')}: <b className="text-ink">{lang === 'ar' ? p.budgetAr : p.budget}</b></span><span>{t('projects.duration')}: <b className="text-ink">{lang === 'ar' ? p.durationAr : p.duration}</b></span></div>
                  <Link to={px(lang, `/projects/${p.slug}`)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-brand-deep">{t('projects.details')}<ArrowRight size={15} /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="overflow-hidden border-y border-ink/10 bg-mist-bg py-14">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-ink-soft/70 uppercase">{t('clients.eyebrow')}</p>
          <h3 className="font-display mt-3 text-2xl md:text-3xl font-extrabold text-ink">{t('clients.title')}</h3>
        </div>
        <div className="relative mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-4 pe-4">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 font-display font-bold text-ink-soft ring-1 ring-ink/10"><BadgeCheck size={16} className="text-brand" />{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY + PROCESS */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t('why.eyebrow')} title={t('why.title')} />
            <div className="mt-8 space-y-4">
              {(t('why.items', { returnObjects: true }) as any[]).map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-4 rounded-2xl bg-mist-bg p-5 ring-1 ring-ink/5">
                  <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-black text-[#15150F]">{i + 1}</span>
                  <span><b className="font-display block text-ink">{w.t}</b><span className="text-sm text-ink-soft/85">{w.d}</span></span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-white md:p-10">
            <SectionHeading dark eyebrow={t('process.eyebrow')} title={t('process.title')} />
            <div className="relative mt-8 space-y-0">
              {(t('process.steps', { returnObjects: true }) as any[]).map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative ps-10 pb-8 last:pb-0">
                  <span className="absolute start-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-black text-[#15150F]">{i + 1}</span>
                  {i < 3 && <span className="absolute start-[13px] top-9 h-[calc(100%-2rem)] w-px bg-brand/40" />}
                  <b className="font-display block">{s.t}</b>
                  <span className="text-sm text-mist/85">{s.d}</span>
                </motion.div>
              ))}
            </div>
            <Link to={px(lang, '/quote')} className="mt-6 block rounded-2xl bg-brand py-4 text-center font-bold text-[#15150F] hover:bg-brand-dark">{t('cta.btn1')}</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-deep py-20">
        <div className="absolute -top-24 -end-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-black text-white text-balance">{t('cta.title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-mist">{t('cta.sub')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={px(lang, '/quote')} className="rounded-full bg-brand px-8 py-4 font-bold text-[#15150F] hover:bg-brand-dark">{t('cta.btn1')}</Link>
            <a href="https://wa.me/201067271246" target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-8 py-4 font-bold text-white hover:border-brand">{t('cta.btn2')}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
