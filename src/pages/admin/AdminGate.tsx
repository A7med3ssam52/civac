import { useState, type FormEvent, type ReactNode } from 'react';

const SESSION_KEY = 'civac-admin-auth';
// IMPORTANT: change this default password before production use (single admin only).
const DEFAULT_PASSWORD = 'civac-admin-2026';

export default function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  if (authed) return <>{children}</>;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value === DEFAULT_PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // sessionStorage unavailable — keep in-memory auth only
      }
      setAuthed(true);
      setError('');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-mist-bg px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-mist bg-white p-8 shadow-xl"
      >
        <div className="mb-1 flex items-center gap-2">
          <span className="inline-block h-8 w-2 rounded-full bg-brand" />
          <h1 className="font-display text-xl font-extrabold text-ink">لوحة تحكم CIVAC</h1>
        </div>
        <p className="mb-6 text-sm text-ink-mute">منطقة خاصة بالإدارة — أدخل كلمة المرور للمتابعة.</p>
        <label htmlFor="admin-pass" className="mb-2 block text-sm font-bold text-ink">
          كلمة المرور
        </label>
        <input
          id="admin-pass"
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-xl border border-mist bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {error && <p className="mt-2 text-sm font-semibold text-error">{error}</p>}
        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-[#15150F] transition-colors hover:bg-brand-dark"
        >
          دخول
        </button>
      </form>
    </div>
  );
}
