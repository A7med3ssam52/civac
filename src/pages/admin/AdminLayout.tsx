import { NavLink, Outlet, Link } from 'react-router-dom';

const activeCls = 'bg-brand text-[#15150F]';
const idleCls = 'text-white/85 hover:bg-white/10 hover:text-white';

function NavItem({ to, end, label }: { to: string; end?: boolean; label: string }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `block rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${isActive ? activeCls : idleCls}`
      }
    >
      {label}
    </NavLink>
  );
}

function SoonItem({ label }: { label: string }) {
  return (
    <span
      aria-disabled="true"
      className="flex cursor-not-allowed items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-white/35"
    >
      {label}
      <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] font-bold text-mist/70">
        قريباً
      </span>
    </span>
  );
}

export default function AdminLayout() {
  const logout = () => {
    try {
      sessionStorage.removeItem('civac-admin-auth');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  return (
    <div dir="rtl" className="min-h-screen bg-mist-bg text-ink">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-0 px-0 md:gap-6 md:px-5 md:py-6">
        {/* Sidebar */}
        <aside className="flex w-56 shrink-0 flex-col bg-ink-deep text-white md:rounded-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
            <span className="inline-block h-8 w-2 rounded-full bg-brand" />
            <div>
              <p className="font-display text-base font-extrabold leading-tight">
                CIVAC <span className="text-brand">.</span>
              </p>
              <p className="text-xs text-mist/80">لوحة الإدارة</p>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            <NavItem to="/admin" end label="لوحة التحكم" />
            <NavItem to="/admin/projects" label="المشاريع" />
            <NavItem to="/admin/messages" label="الرسائل" />
            <div className="my-2 border-t border-white/10" />
            <SoonItem label="الخدمات" />
            <SoonItem label="العملاء" />
            <SoonItem label="الأخبار" />
            <SoonItem label="النصوص" />
            <SoonItem label="الإعدادات" />
          </nav>
          <div className="border-t border-white/10 p-3">
            <button
              onClick={logout}
              className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold text-white/80 hover:border-brand hover:text-brand-soft"
            >
              تسجيل الخروج
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-mist bg-white px-5 py-4 md:rounded-2xl md:border">
            <h1 className="font-display text-lg font-extrabold">إدارة المحتوى</h1>
            <Link
              to="/"
              className="rounded-full border border-mist px-4 py-2 text-xs font-bold text-ink-soft hover:border-brand hover:text-ink"
            >
              العودة للموقع
            </Link>
          </header>
          <main className="flex-1 p-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
