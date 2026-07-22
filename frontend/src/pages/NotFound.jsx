import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-4">404</div>
      <h1 className="font-display text-4xl text-bay mb-4">This page hasn't been mapped yet.</h1>
      <p className="text-ink/60 mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-bay text-paper px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-vermillion transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
