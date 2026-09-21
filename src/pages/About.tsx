import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/ui';

export default function About() {
  const { t } = useTranslation();
  const values = t('values', { returnObjects: true }) as string[];
  const valuesBody = t('valuesBody', { returnObjects: true }) as string[];
  return (
    <div className="pt-[72px]">
      <section className="bg-ink-deep py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-xs font-bold tracking-[0.25em] text-brand-soft uppercase">{t('aboutPage.eyebrow')}</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl md:text-6xl font-black text-balance">{t('aboutPage.title')}</h1>
          <p className="mt-6 max-w-3xl text-lg text-mist">{t('aboutPage.body')}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-4 py-2">Est. 2008 — Cairo</span>
            <span className="rounded-full bg-white/10 px-4 py-2">51–200 engineers & staff</span>
            <span className="rounded-full bg-brand/20 border border-brand/40 px-4 py-2 text-brand-soft font-bold">ISO 9001 • 14001 • 45001</span>
          </div>
        </div>
      </section>
      <section className="bg-mist-bg py-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Core values" title="Our core values" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <div key={i} className="rounded-3xl bg-ink p-6 text-white card-hover">
                <span className="font-display text-3xl font-black text-brand">0{i + 1}</span>
                <p className="font-display mt-3 font-extrabold">{v}</p>
                {valuesBody?.[i] && <p className="mt-2 text-xs leading-relaxed text-mist/90">{valuesBody[i]}</p>}
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 text-sm">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10"><b className="font-display block">Our Strategy</b>{t('aboutPage.strategy')}</div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10"><b className="font-display block">Why Civac</b>{t('aboutPage.whyCivac')}</div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10"><b className="font-display block">Egypt — HQ</b>106 Nile Street, First Floor, Apartment 16, Dokki, Giza, Egypt<br />+20 106 727 1246 • +20 100 188 9992 • +20 100 891 3975<br />+20 2 3760 8366 • +20 2 3762 7066<br />civac@civac-eg.com • mech@civac-eg.com • elec@civac-eg.com • civil@civac-eg.com</div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10"><b className="font-display block">Saudi Arabia</b>7708 Thawban Al Nabawi St, Batha Quraysh District, Makkah — 5024 — 24352, Saudi Arabia<br />+966 566 855 589</div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10"><b className="font-display block">UAE</b>Business Center, Sharjah Publishing City Free Zone, Sharjah, UAE<br />+971 581 959 610<br />info@maf-fzc.com • M.aleraky@maf-fzc.com</div>
          </div>
          <div className="mt-10">
            <SectionHeading eyebrow="Office" title="Office Tour" />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=70&auto=format&fit=crop" alt="CIVAC office" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover ring-1 ring-ink/10" />
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=70&auto=format&fit=crop" alt="CIVAC office workspace" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover ring-1 ring-ink/10" />
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=70&auto=format&fit=crop" alt="CIVAC meeting room" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover ring-1 ring-ink/10" />
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-ink p-8 text-white">
            <p className="text-xs font-bold tracking-[0.25em] text-brand-soft uppercase">Org Chart</p>
            <h3 className="font-display mt-2 text-2xl font-extrabold">Our core departments</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {['Engineering', 'Projects', 'HSE', 'QA'].map((d) => (
                <div key={d} className="rounded-2xl bg-white/10 p-6 text-center ring-1 ring-white/10">
                  <span className="font-display block font-extrabold text-brand-soft">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
