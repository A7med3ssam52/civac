import { useLocation } from 'react-router-dom';
import { detectLang } from '../lib/lang';

type Post = {
  dateEn: string;
  dateAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  tag: string;
  image: string;
};

const posts: Post[] = [
  {
    dateEn: 'Nov 15, 2025',
    dateAr: '15 نوفمبر 2025',
    titleEn: 'Heinz power & water package delivered (MV + LV + WWTP)',
    titleAr: 'تسليم حزمة القدرة والمياه لهاينز (جهد متوسط + منخفض + معالجة)',
    descEn:
      'Full MV/LV networks, switch gear, RMUs and transformers energized and tested. 61M EGP waste-water treatment plant commissioned and handed over.',
    descAr:
      'تشغيل واختبار شبكات الجهد المتوسط والمنخفض والموزعات والمحولات بالكامل. تشغيل وتسليم محطة معالجة الصرف بقيمة 61 مليون جنيه.',
    tag: 'Handover',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=70&auto=format&fit=crop',
  },
  {
    dateEn: 'Sep 01, 2025',
    dateAr: '1 سبتمبر 2025',
    titleEn: 'Koun Ras El Hekma mobilization with Mabany Edrees',
    titleAr: 'بدء تجهيز موقع كون رأس الحكمة مع مباني إدريس',
    descEn:
      'Enabling works and concrete structures underway on the North Coast. 150M EGP phase mobilized with full site setup and HSE plan.',
    descAr:
      'أعمال التمكين والهياكل الخرسانية جارية في الساحل الشمالي. بدء مرحلة بـ150 مليون جنيه مع تجهيز كامل للموقع وخطة سلامة.',
    tag: 'New project',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=70&auto=format&fit=crop',
  },
  {
    dateEn: 'Dec 20, 2024',
    dateAr: '20 ديسمبر 2024',
    titleEn: 'Heinz Jar & Bottle expansion — 295M EGP milestone',
    titleAr: 'توسعة البرطمانات والزجاجات لهاينز — إنجاز بـ295 مليون جنيه',
    descEn:
      'Civil, steel and full MEP scope completed over 18 months in 6th October. Jar and bottle lines handed over with finishing and commissioning.',
    descAr:
      'اكتمال الأعمال المدنية والمعدنية والكهروميكانيكا خلال 18 شهرًا في 6 أكتوبر. تسليم خطوط البرطمانات والزجاجات مع التشطيب والتشغيل.',
    tag: 'Industrial',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=70&auto=format&fit=crop',
  },
  {
    dateEn: 'Oct 10, 2023',
    dateAr: '10 أكتوبر 2023',
    titleEn: 'Carrefour fast-track fit-outs delivered in 2 months',
    titleAr: 'تسليم تشطيبات كارفور السريعة خلال شهرين',
    descEn:
      'El Hosary and Saraya El Qoba supermarkets fitted out in a 2-month fast-track. MEP retrofit and refrigeration interfaces completed without downtime.',
    descAr:
      'تشطيب فرعي الحصري وسرايا القبة بنظام المسار السريع خلال شهرين. تعديل الكهروميكانيكا وواجهات التبريد دون توقف التشغيل.',
    tag: 'Retail',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200&q=70&auto=format&fit=crop',
  },
];

export default function News() {
  const loc = useLocation();
  const lang = detectLang(loc.pathname, loc.hash);
  return (
    <div className="pt-[72px] bg-mist-bg py-16 min-h-screen"><div className="mx-auto max-w-5xl px-5">
      <h1 className="font-display text-4xl md:text-5xl font-black text-ink">{lang === 'ar' ? 'الأخبار ويوميات الموقع' : 'News & Site Diary'}</h1>
      <p className="mt-3 text-ink-soft">{lang === 'ar' ? 'تسليمات حقيقية من مواقعنا في مصر والخليج.' : 'Real handovers from our sites across Egypt and the Gulf.'}</p>
      <div className="mt-8 space-y-4">{posts.map((p, i) => (
        <article key={i} className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 card-hover">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img src={p.image} alt={lang === 'ar' ? p.titleAr : p.titleEn} loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute top-4 start-4 rounded-full bg-ink-deep/85 px-3 py-1.5 text-xs font-bold text-brand-soft backdrop-blur">{p.tag}</span>
          </div>
          <div className="flex gap-5 p-6">
            <span className="font-display rounded-2xl bg-ink px-4 py-3 h-fit font-black text-brand-soft text-sm whitespace-nowrap">{lang === 'ar' ? p.dateAr : p.dateEn}</span>
            <span>
              <span className="text-xs font-bold text-brand-deep uppercase tracking-wider">{p.tag}</span>
              <b className="font-display block text-lg text-ink">{lang === 'ar' ? p.titleAr : p.titleEn}</b>
              <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{lang === 'ar' ? p.descAr : p.descEn}</span>
            </span>
          </div>
        </article>))}</div>
    </div></div>
  );
}
