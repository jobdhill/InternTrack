import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";
import DashboardPreview from "./DashboardPreview";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen font-manrope bg-white grid lg:grid-cols-[minmax(420px,_42%)_1fr]">
      <div className="flex flex-col px-6 sm:px-14 lg:px-16 py-10 min-h-screen">
        <header className="mb-12">
          <Link to="/">
            <BrandMark />
          </Link>
        </header>

        <main className="flex-1 max-w-md w-full">{children}</main>

        <footer className="mt-12 flex items-center justify-between text-xs text-[#9CA3AF]">
          <span>© 2026 InternTrack</span>
          <div className="flex gap-5">
            <Link
              to="/terms"
              className="hover:text-[#374151] transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/terms"
              className="hover:text-[#374151] transition-colors"
            >
              Privacy
            </Link>
          </div>
        </footer>
      </div>

      <div className="hidden lg:block bg-[#F1F2F6] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#E8E9F8_0%,_transparent_60%)] pointer-events-none" />
        <div className="relative h-full flex items-center px-12 py-12">
          <DashboardPreview />
        </div>
      </div>
    </div>
  );
}
