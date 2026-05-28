import { Link } from "react-router-dom";
import BrandMark from "../auth/BrandMark";

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#EEF0F4] bg-white/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="InternNEXT home">
          <BrandMark />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/login"
            className="rounded-full px-3 py-2 text-sm font-medium text-[#475569] transition hover:text-[#0F172A] sm:px-4"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-full bg-[#0F172A] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
          >
            Sign up free
          </Link>
        </nav>
      </div>
    </header>
  );
}
