import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, CalendarDays, ChevronLeft, ChevronRight, Clock3, Expand, MapPin, Wallet, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getProjects } from '../lib/api';
import type { Project } from '../lib/api';
import { useLang, px } from '../hooks/useLang';
import { siteImage } from '../lib/media';

type Category = Project['category'];

const CATEGORY_LABEL: Record<Category, string> = {
  industrial: 'Industrial',
  commercial: 'Commercial & Retail',
  residential: 'Residential',
  'food-beverage': 'Food & Beverage',
  infrastructure: 'Infrastructure',
  water: 'Water & Utilities',
  educational: 'Educational',
  engineering: 'Engineering & Power',
};

const CATEGORY_CHALLENGE: Record<Category, string> = {
  industrial: 'Live production lines that could not stop. Heavy civil works, steel and full MEP scope had to land inside a running factory — safely, and on a tight programme.',
  commercial: 'A fast-track retail opening with zero room for delay — shoppers, stock and launch dates were already fixed before we mobilised.',
  residential: 'Large-scale enabling and structures where mobilisation speed and site discipline set the tone for everything that followed.',
  'food-beverage': 'A hygienic production environment with zero tolerance for error — stainless lines, freezers and halls built to food-grade standards.',
  infrastructure: 'Critical networks spanning long distances and live utilities — power, roads and water where failure was simply not an option.',
  water: 'Water structures that must perform for decades — tanks, pools and treatment works built watertight from day one.',
  educational: 'A learning environment on a fixed academic calendar — classrooms, labs and landscape delivered ready for students.',
  engineering: 'Precision power and testing works where measurement is the deliverable — verified, documented and formally handed over.',
};

function isRemote(src: string): boolean {
  return /^(https?:|data:|blob:)/.test(src);
}
function withParams(src: string, params: string): string {
  if (!isRemote(src)) return siteImage(src);
  const base = src.split('?')[0];
  return `${base}?${params}`;
}
const heroImg = (src: string) => withParams(src, 'w=2000&q=80&auto=format&fit=crop');
const cardImg = (src: string) => withParams(src, 'w=1200&q=70&auto=format&fit=crop');

function ParallaxBand({ src, alt, kicker, title }: { src: string; alt: string; kicker: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} className="relative h-[46vh] overflow-hidden">
      <motion.img src={cardImg(src)} alt={alt} style={{ y }} className="absolute inset-0 h-[120%] w-full object-cover" />
      <div className="hero-gradient absolute inset-0" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-10">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-soft uppercase">{kicker}</p>
        <h2 className="font-display mt-2 max-w-3xl text-3xl md:text-5xl font-black text-white text-balance">{title}</h2>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useLang();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const gallery = (() => {
    if (projects === null) return [];
    const found = projects.find((x) => x.slug === slug);
    return found?.gallery ?? [];
  })();

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? null : (i + 1) % gallery.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, gallery.length]);

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

  const related = projects.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const facts = [
    { icon: Building2, k: t('projects.client'), v: p.client },
    { icon: Wallet, k: t('projects.budget'), v: p.budget },
    { icon: Clock3, k: t('projects.duration'), v: p.duration },
    { icon: CalendarDays, k: t('projects.year'), v: p.year },
  ];

  return (
    <div className="pt-[72px]">
      {/* HERO */}
      <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink-deep">
        <img src={heroImg(p.image)} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to={px(lang, '/projects')} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-soft"><ArrowLeft size={15} /> {t('projects.eyebrow')}</Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand px-4 py-1.5 text-xs font-black tracking-wider text-[#15150F] uppercase">{CATEGORY_LABEL[p.category]}</span>
              <span className="flex items-center gap-1.5 text-sm text-mist"><MapPin size={14} />{p.location}</span>
            </div>
            <h1 className="font-display mt-4 max-w-4xl text-4xl md:text-6xl font-black text-white text-balance">{p.title}</h1>
            <p className="mt-3 text-lg text-mist">{p.client}</p>
          </motion.div>
        </div>
      </section>

      {/* FACTS */}
      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="flex items-center gap-4 rounded-2xl bg-mist-bg p-5 ring-1 ring-ink/10">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand-soft"><f.icon size={20} /></span>
              <span>
                <span className="block text-xs font-bold tracking-wider text-brand-deep uppercase">{f.k}</span>
                <span className="font-display block text-lg font-extrabold text-ink">{f.v}</span>
              </span>
            </div>
          ))}
        </div>

        {/* SCOPE + CHALLENGE */}
        <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-5 lg:grid-cols-5">
          <div className="rounded-3xl bg-mist-bg p-8 ring-1 ring-ink/10 lg:col-span-3">
            <h2 className="font-display text-2xl font-extrabold text-ink">{t('projects.scope')}</h2>
            <ul className="mt-5 space-y-3">
              {p.scope.map((s) => (
                <li key={s} className="flex gap-3 text-ink-soft"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-white lg:col-span-2">
            <p className="text-xs font-bold tracking-[0.25em] text-brand-soft uppercase">The challenge</p>
            <p className="mt-3 leading-relaxed text-mist">{CATEGORY_CHALLENGE[p.category]}</p>
          </div>
        </div>
      </section>

      {/* GALLERY STORY */}
      {gallery.length > 0 && (
        <section className="bg-mist-bg py-20">
          <div className="mx-auto max-w-7xl px-5">
            <p className="text-xs font-bold tracking-[0.25em] text-brand-deep uppercase">Site story</p>
            <h2 className="font-display mt-2 text-3xl md:text-5xl font-black text-ink text-balance">Built around live operations.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {gallery.map((g, i) => (
                <motion.button
                  key={g.src}
                  type="button"
                  onClick={() => setLightbox(i)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.08 }}
                  className="card-hover group overflow-hidden rounded-3xl bg-white text-start ring-1 ring-ink/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={cardImg(g.src)} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute bottom-4 end-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink-deep/85 text-brand-soft backdrop-blur"><Expand size={16} /></span>
                  </div>
                  <div className="p-6">
                    <p className="font-display text-lg font-extrabold text-ink">{g.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.text}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      <ParallaxBand src={p.image} alt={p.title} kicker={p.client} title={p.title} />

      {/* RELATED + CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          {related.length > 0 && (
            <>
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Related projects</h2>
                <Link to={px(lang, '/projects')} className="inline-flex items-center gap-1 text-sm font-bold text-ink hover:text-brand-deep">{t('projects.details')}<ArrowRight size={15} /></Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} to={px(lang, `/projects/${r.slug}`)} className="card-hover group overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={cardImg(r.image)} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-bold text-brand-deep">{r.client} • {r.year}</div>
                      <h3 className="font-display mt-2 font-extrabold text-ink">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          <div className="relative mt-14 overflow-hidden rounded-3xl bg-ink-deep px-8 py-14 text-center">
            <div className="absolute -top-20 -end-20 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
            <h2 className="font-display relative text-3xl md:text-5xl font-black text-white text-balance">Need similar scope?</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-mist">Send BOQ or drawings — reply within 24 hours.</p>
            <Link to={px(lang, '/quote')} className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-bold text-[#15150F] hover:bg-brand-dark">Request similar project <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && gallery[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-deep/95 p-4 backdrop-blur"
            onClick={() => setLightbox(null)}
          >
            <button type="button" aria-label="close" onClick={() => setLightbox(null)} className="absolute top-5 end-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><X size={20} /></button>
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="previous"
                  onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }}
                  className="absolute start-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                ><ChevronLeft size={20} /></button>
                <button
                  type="button"
                  aria-label="next"
                  onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }}
                  className="absolute end-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                ><ChevronRight size={20} /></button>
              </>
            )}
            <motion.figure
              key={gallery[lightbox].src}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-h-[86vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-ink"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={heroImg(gallery[lightbox].src)} alt={gallery[lightbox].title} className="max-h-[62vh] w-full object-cover" />
              <figcaption className="p-6">
                <p className="font-display text-xl font-extrabold text-white">{gallery[lightbox].title}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist">{gallery[lightbox].text}</p>
                <p className="mt-3 text-xs font-bold tracking-widest text-brand-soft">{lightbox + 1} / {gallery.length}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
