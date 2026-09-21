import { Building2, Factory, Fan, Paintbrush, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getServices } from '../lib/api';
import type { Service } from '../lib/api';
import { useLang, px } from '../hooks/useLang';
import { SectionHeading } from '../components/ui';
const icons: Record<string, any> = { building: Building2, paint: Paintbrush, fan: Fan, zap: Zap, factory: Factory };

export default function Services() {
  const { t } = useTranslation();
  const lang = useLang();
  const [services, setServices] = useState<Service[] | null>(null);
  useEffect(() => {
    getServices().then(setServices);
  }, []);
  return (
    <div className="pt-[72px] bg-mist-bg min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} sub={t('services.subtitle')} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services === null ? (
            [0, 1, 2].map((i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/60 ring-1 ring-ink/10" />)
          ) : (
          services.map((s) => {
            const Icon = icons[s.icon] ?? Factory;
            return (
              <div key={s.id} className="card-hover rounded-3xl bg-ink p-8 text-white">
                <div className="flex h-13 w-13 h-[52px] w-[52px] items-center justify-center rounded-2xl bg-brand text-[#15150F]"><Icon /></div>
                <h3 className="font-display mt-5 text-2xl font-extrabold">{lang === 'ar' ? s.titleAr : s.titleEn}</h3>
                <p className="mt-2 text-mist/85">{lang === 'ar' ? s.descAr : s.descEn}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-mist">{(lang === 'ar' ? s.pointsAr : s.pointsEn).map((pt) => <li key={pt}>• {pt}</li>)}</ul>
                <Link to={px(lang, `/services/${s.id}`)} className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-[#15150F]">{t('services.quote')}</Link>
              </div>
            );
          }))}
        </div>
      </div>
    </div>
  );
}
