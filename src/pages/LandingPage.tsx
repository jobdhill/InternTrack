import DashboardShowcase from "../components/landing/DashboardShowcase";
import Features from "../components/landing/Features";
import Hero from "../components/landing/Hero";
import LandingFooter from "../components/landing/LandingFooter";
import LandingNav from "../components/landing/LandingNav";
import SignUpCTA from "../components/landing/SignUpCTA";
import StatsBand from "../components/landing/StatsBand";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function LandingPage() {
  useDocumentMeta({
    title:
      "InternNEXT — Track every internship application & find your bottleneck",
    description:
      "Free internship application tracker. See your funnel from applied to offer, measure real response and interview rates, A/B test resumes, and find where your search is leaking.",
    path: "/",
  });

  return (
    <div className="font-manrope min-h-screen bg-white text-[#0F172A]">
      <LandingNav />
      <main>
        <Hero />
        <StatsBand />
        <Features />
        <DashboardShowcase />
        <SignUpCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
