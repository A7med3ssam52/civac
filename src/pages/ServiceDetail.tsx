import { Link, useLocation, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { services } from '../data/services';

export default function ServiceDetail() {
  const { id } = useParams();
  const lang = useLocation().pathname.split('/').includes('ar') ? 'ar' : 'en';
  const s = services.find((x) => x.id === id) ?? services[0];
  const related = projects.filter((p) => (s.id === 'civil' && ['industrial', 'residential', 'infrastructure'].includes(p.category)) || (s.id === 'food' && p.category === 'food-beverage') || (s.id === 'electrical' && p.category === 'infrastructure') || (s.id === 'mechanical' && p.category === 'engineering') || !['industrial'].includes(p.category)).slice(0, 3);
  const px = (p: string) => (lang === 'ar' ? `/ar${p}` : p);
  return (
    <div className="pt-[72px]">
      <section className="bg-ink-deep py-16 text-white"><div className="mx-auto max-w-7xl px-5">
        <Link to={px('/services')} className="text-sm text-brand-soft">← Services</Link>
        <h1 className="font-display mt-3 text-4xl md:text-6xl font-black">{lang === 'ar' ? s.titleAr : s.titleEn}</h1>
        <p className="mt-4 max-w-2xl text-mist">{lang === 'ar' ? s.descAr : s.descEn}</p>
        <div className="mt-6 flex flex-wrap gap-2">{(lang === 'ar' ? s.pointsAr : s.pointsEn).map((pt) => <span key={pt} className="rounded-full bg-white/10 px-4 py-2 text-sm">{pt}</span>)}</div>
        <Link to={px('/quote')} className="mt-8 inline-block rounded-full bg-brand px-8 py-4 font-bold text-[#15150F]">Request this scope</Link>
      </div></section>
      <section className="bg-white py-14"><div className="mx-auto max-w-7xl px-5">
        <h2 className="font-display text-2xl font-extrabold text-ink">Related projects</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((p) => (
          <Link key={p.slug} to={px(`/projects/${p.slug}`)} className="card-hover overflow-hidden rounded-3xl ring-1 ring-ink/10">
            <img src={p.image} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            <div className="p-5 font-bold text-ink text-sm">{lang === 'ar' ? p.titleAr : p.titleEn}</div>
          </Link>))}</div>
      </div></section>
    </div>
  );
}
