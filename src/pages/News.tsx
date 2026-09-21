import { useLang } from '../hooks/useLang';
import { posts } from '../data/news';

export default function News() {
  const lang = useLang();
  const isAr = lang === 'ar';
  return (
    <div className="pt-[72px] bg-mist-bg py-16 min-h-screen"><div className="mx-auto max-w-5xl px-5">
      <h1 className="font-display text-4xl md:text-5xl font-black text-ink">{isAr ? 'الأخبار ويوميات الموقع' : 'News & Site Diary'}</h1>
      <p className="mt-3 text-ink-soft">{isAr ? 'تسليمات حقيقية من مواقعنا في مصر والخليج.' : 'Real handovers from our sites across Egypt and the Gulf.'}</p>
      <div className="mt-8 space-y-4">{posts.map((p, i) => {
        const date = isAr ? p.dateAr : p.dateEn;
        const title = isAr ? p.titleAr : p.titleEn;
        const desc = isAr ? p.descAr : p.descEn;
        return (
        <article key={i} className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 card-hover">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img src={p.image} alt={title} loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute top-4 start-4 rounded-full bg-ink-deep/85 px-3 py-1.5 text-xs font-bold text-brand-soft backdrop-blur">{p.tag}</span>
          </div>
          <div className="flex gap-5 p-6">
            <span className="font-display rounded-2xl bg-ink px-4 py-3 h-fit font-black text-brand-soft text-sm whitespace-nowrap">{date}</span>
            <span>
              <span className="text-xs font-bold text-brand-deep uppercase tracking-wider">{p.tag}</span>
              <b className="font-display block text-lg text-ink">{title}</b>
              <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{desc}</span>
            </span>
          </div>
        </article>);})}</div>
    </div></div>
  );
}
