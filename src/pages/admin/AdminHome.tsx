import { Link } from 'react-router-dom';

const steps = [
  {
    n: '1',
    title: 'عدّل المحتوى',
    desc: 'حدّث المشاريع أو راجع الرسائل من أقسام اللوحة.',
  },
  {
    n: '2',
    title: 'نزّل content.json',
    desc: 'بعد التعديل، نزّل ملف الحزمة من زر التنزيل في صفحة القسم.',
  },
  {
    n: '3',
    title: 'ارفعه على الهوست',
    desc: 'ارفع الملف إلى مجلد الموقع على الاستضافة ليظهر المحتوى الجديد.',
  },
];

export default function AdminHome() {
  return (
    <div>
      <div className="rounded-2xl bg-ink-deep p-6 text-white md:p-8">
        <h2 className="font-display text-2xl font-extrabold">
          مرحباً بك في لوحة تحكم <span className="text-brand-soft">CIVAC</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">
          لا توجد قاعدة بيانات — التعديل يتم محلياً ثم يُصدَّر كملف JSON ويُرفع على الاستضافة.
          اتبع الخطوات الثلاث التالية.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-mist bg-white p-5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-base font-extrabold text-[#15150F]">
              {s.n}
            </span>
            <h3 className="mt-3 font-display text-base font-extrabold">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-mute">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Link
          to="/admin/projects"
          className="group rounded-2xl border border-mist bg-white p-5 transition-shadow hover:shadow-lg"
        >
          <h3 className="font-display text-base font-extrabold group-hover:text-brand-deep">
            إدارة المشاريع ←
          </h3>
          <p className="mt-1 text-sm text-ink-mute">إضافة وتعديل وحذف المشاريع ثم تنزيل content.json.</p>
        </Link>
        <Link
          to="/admin/messages"
          className="group rounded-2xl border border-mist bg-white p-5 transition-shadow hover:shadow-lg"
        >
          <h3 className="font-display text-base font-extrabold group-hover:text-brand-deep">
            إدارة الرسائل ←
          </h3>
          <p className="mt-1 text-sm text-ink-mute">مراجعة رسائل التواصل وطلبات الأسعار وتغييـر حالتها.</p>
        </Link>
      </div>
    </div>
  );
}
