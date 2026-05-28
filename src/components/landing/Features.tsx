import type { ReactNode } from "react";

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
};

const ICON_CLASS = "h-5 w-5";

const FEATURES: Feature[] = [
  {
    title: "Pipeline funnel",
    body: "See exactly where apps die: applied → responded → interview → offer.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <path
          d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Resume A/B tracking",
    body: "Tag every app with the resume you used. Find out which one actually gets more callbacks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <path
          d="M7 3h7l4 4v14H7V3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 3v4h4M10 12h6M10 16h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Response timing",
    body: "Median reply time and ghost detection so you know when to follow up — or move on.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "One-click status",
    body: "Move apps through Applied → OA → Interview → Offer with a dropdown.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <path
          d="M5 7h14M5 12h14M5 17h9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="m16 15 3 3 3-3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Honest analytics",
    body: "Real response rate, interview rate, and offer rate — calculated from your own data.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <path
          d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Free forever",
    body: "No paywall on core tracking. No credit card to sign up.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
        <path
          d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-s font-semibold uppercase tracking-[0.18em] text-[#10B981]">
            Built around the funnel
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-4xl">
            Everything you need to debug your search.
          </h2>
          <p className="mt-4 text-base text-[#475569] sm:text-[17px]">
            A real tracker that turns your apps
            into numbers you can act on.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-[#EEF0F4] bg-white p-6 transition hover:border-[#D6DCEB] hover:shadow-[0_12px_32px_-18px_rgba(15,23,42,0.18)]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#D1FAE5] text-[#10B981]">
                {f.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#0F172A]">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
