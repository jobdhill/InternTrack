import { Link } from "react-router-dom";
import BrandMark from "../auth/BrandMark";

export default function LandingFooter() {
  return (
    <footer className="border-t border-[#EEF0F4] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-4">
          <BrandMark size="sm" />
          <span className="text-xs text-[#94A3B8]">© 2026 InternNEXT</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#475569]">
          <Link to="/login" className="hover:text-[#0F172A]">
            Sign in
          </Link>
          <Link to="/signup" className="hover:text-[#0F172A]">
            Sign up
          </Link>
          <Link to="/terms" className="hover:text-[#0F172A]">
            Privacy & Terms
          </Link>
          <a
            href="mailto:support@internnext.com"
            className="hover:text-[#0F172A]"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
