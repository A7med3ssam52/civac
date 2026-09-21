import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

function useLang() {
  const { pathname } = useLocation();
  return pathname.startsWith('/ar') ? 'ar' : 'en';
}
function prefix(lang: string, path: string) {
  return lang === 'ar' ? `/ar${path === '/' ? '' : path}` : path;
}

export default function Layout() {
  const { t, i18n } = useTranslation();
  const lang = useLang();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang, i18n]);

  useEffect(() => {
    const f = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 700);
    };
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo({ top: 0 }); }, [pathname]);

  const links = [
    { to: prefix(lang, '/'), label: t('nav.home'), end: true },
    { to: prefix(lang, '/about'), label: t('nav.about') },
    { to: prefix(lang, '/services'), label: t('nav.services') },
    { to: prefix(lang, '/projects'), label: t('nav.projects') },
    { to: prefix(lang, '/contact'), label: t('nav.contact') },
  ];

  const switchLang = () => nav(lang === 'ar' ? '/' : '/ar');

  return (
    <div className="min-h-screen bg-white">
      <motion.div style={{ scaleX: progress }} className="fixed top-0 start-0 end-0 z-[60] h-1 origin-start bg-brand" />
      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'glass-dark shadow-xl !bg-ink-deep/90' : 'bg-gradient-to-b from-ink-deep/70 to-transparent'}`}>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link to={prefix(lang, '/')} className="flex items-center gap-3">
            <img src="/logo.svg" alt="CIVAC — Engineering and Contracting" className="h-11 w-auto rounded-lg" />
          </Link>
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-brand-soft' : 'text-white/85 hover:text-white'}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={switchLang} className="rounded-full border border-white/25 px-4 py-2 text-xs font-bold text-white hover:border-brand hover:text-brand-soft">{t('nav.lang')}</button>
            <Link to={prefix(lang, '/quote')} className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-[#15150F] hover:bg-brand-dark transition-colors">{t('nav.quote')}</Link>
          </div>
          <button className="lg:hidden text-white p-2" onClick={() => setOpen(true)} aria-label="menu"><Menu /></button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-ink-deep/97 backdrop-blur-xl">
            <div className="flex h-[72px] items-center justify-between px-5">
              <span className="font-display text-white font-extrabold text-xl">CIVAC<span className="text-brand">.</span></span>
              <button onClick={() => setOpen(false)} className="text-white p-2" aria-label="close"><X /></button>
            </div>
            <nav className="px-8 pt-6 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }}>
                  <NavLink to={l.to} end={l.end} className="font-display block py-3 text-3xl font-extrabold text-white hover:text-brand-soft">{l.label}</NavLink>
                </motion.div>
              ))}
              <div className="mt-6 flex gap-3">
                <Link to={prefix(lang, '/quote')} className="flex-1 rounded-2xl bg-brand py-4 text-center font-bold text-[#15150F]">{t('nav.quote')}</Link>
                <button onClick={switchLang} className="rounded-2xl border border-white/25 px-6 font-bold text-white">{t('nav.lang')}</button>
              </div>
              <a href="tel:+20237608366" className="mt-4 flex items-center justify-center gap-2 text-mist"><Phone size={16} /> +20 2 3760 8366</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main><Outlet /></main>

      <footer className="bg-ink-deep text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
          <div>
            <img src="/logo.svg" alt="CIVAC" className="h-11 rounded-lg" />
            <p className="mt-4 text-sm leading-relaxed text-mist/90">{t('footer.about')}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand/15 border border-brand/30 px-3 py-1.5 text-xs font-bold text-brand-soft">ISO 9001 • 14001 • 45001</div>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-mist">{t('footer.branches')}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex gap-2"><MapPin size={16} className="text-brand shrink-0 mt-0.5" /> 106 Nile Street, First Floor, Apartment 16, Dokki, Giza, Egypt</li>
              <li className="flex gap-2"><MapPin size={16} className="text-brand shrink-0 mt-0.5" /> 7708 Thawban Al Nabawi St, Batha Quraysh District, Makkah — 5024 — 24352, Saudi Arabia</li>
              <li className="flex gap-2"><MapPin size={16} className="text-brand shrink-0 mt-0.5" /> Business Center, Sharjah Publishing City Free Zone, Sharjah, UAE</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-mist">{t('footer.links')}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map((l) => <li key={l.to}><Link className="text-white/80 hover:text-brand-soft" to={l.to}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-mist">{t('footer.contact')}</h4>
            <div className="mt-4 space-y-4 text-sm text-white/80">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-mist/70">{lang === 'ar' ? 'مصر — موبايل' : 'Egypt — Mobiles'}</p>
                <div className="mt-1.5 flex flex-col gap-1.5" dir="ltr">
                  <a href="tel:+201067271246" className="flex items-center gap-2 hover:text-brand-soft"><Phone size={14} className="text-brand shrink-0" />+20 106 727 1246</a>
                  <a href="tel:+201001889992" className="flex items-center gap-2 hover:text-brand-soft"><Phone size={14} className="text-brand shrink-0" />+20 100 188 9992</a>
                  <a href="tel:+201008913975" className="flex items-center gap-2 hover:text-brand-soft"><Phone size={14} className="text-brand shrink-0" />+20 100 891 3975</a>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-mist/70">{lang === 'ar' ? 'مصر — أرضي / الخليج' : 'Landlines / Gulf'}</p>
                <div className="mt-1.5 flex flex-col gap-1.5" dir="ltr">
                  <a href="tel:+20237608366" className="hover:text-brand-soft">+20 2 3760 8366 <span className="text-white/50">(EG)</span></a>
                  <a href="tel:+20237627066" className="hover:text-brand-soft">+20 2 3762 7066 <span className="text-white/50">(EG)</span></a>
                  <a href="tel:+966566855589" className="hover:text-brand-soft">+966 566 855 589 <span className="text-white/50">(KSA)</span></a>
                  <a href="tel:+971581959610" className="hover:text-brand-soft">+971 581 959 610 <span className="text-white/50">(UAE)</span></a>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-mist/70">Email</p>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  <a href="mailto:civac@civac-eg.com" className="flex items-center gap-2 hover:text-brand-soft"><Mail size={14} className="text-brand shrink-0" />civac@civac-eg.com</a>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-white/60" dir="ltr">
                    <a href="mailto:mech@civac-eg.com" className="hover:text-brand-soft">mech@civac-eg.com</a>
                    <a href="mailto:elec@civac-eg.com" className="hover:text-brand-soft">elec@civac-eg.com</a>
                    <a href="mailto:civil@civac-eg.com" className="hover:text-brand-soft">civil@civac-eg.com</a>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-white/60" dir="ltr">
                    <a href="mailto:info@maf-fzc.com" className="hover:text-brand-soft">info@maf-fzc.com</a>
                    <a href="mailto:M.aleraky@maf-fzc.com" className="hover:text-brand-soft">M.aleraky@maf-fzc.com</a>
                  </div>
                </div>
              </div>
            </div>
            <Link to={prefix(lang, '/quote')} className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-[#15150F] hover:bg-brand-dark">{t('cta.btn1')}</Link>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-mist/70">{t('footer.rights')}</div>
      </footer>

      <a href="https://wa.me/201067271246" target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl hover:scale-105 transition-transform">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-.9c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.5 1.1Z" /></svg>
      </a>
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="top"
          className="fixed bottom-6 start-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-brand/40 bg-ink-deep text-brand-soft shadow-xl"><ArrowUp size={18} /></button>
      )}
    </div>
  );
}
