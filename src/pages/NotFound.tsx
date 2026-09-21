import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="pt-[72px] bg-ink-deep min-h-screen text-center text-white py-24">
      <h1 className="font-display text-7xl font-black">404</h1>
      <p className="mt-3 text-mist">Page not found.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-brand px-8 py-3.5 font-bold text-[#15150F]">Home</Link>
    </div>
  );
}
