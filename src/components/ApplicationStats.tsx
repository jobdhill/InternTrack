import { useMemo } from "react";
import type { Application } from "../types/application";
import { EMPTY_STATUS } from "../types/application";

const INITIAL_STATUSES = new Set(["", EMPTY_STATUS, "Applied"]);

const RESPONDED_STATUSES = new Set([
  "OA",
  "Interview",
  "Offer",
  "Rejected",
  "Ghosted",
]);

type Props = {
  applications: Application[];
};

function pct(part: number, whole: number): string {
  if (whole === 0) return "—";
  return `${((part / whole) * 100).toPrecision(3)}%`;
}

function parseAppliedDate(iso: string): Date | null {
  if (!iso.trim()) return null;
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ApplicationStats({ applications }: Props) {
  const stats = useMemo(() => {
    const total = applications.length;

    const movedPastApplied = applications.filter(
      (a) => !INITIAL_STATUSES.has(a.status),
    ).length;

    const interviews = applications.filter(
      (a) => a.status === "Interview",
    ).length;

    const rejections = applications.filter(
      (a) => a.status === "Rejected",
    ).length;

    const offers = applications.filter((a) => a.status === "Offer").length;

    const replySamples = applications
      .filter((a) => RESPONDED_STATUSES.has(a.status))
      .map((a) => parseAppliedDate(a.applied))
      .filter((d): d is Date => d !== null);

    const now = new Date();
    const avgReplyDays =
      replySamples.length === 0
        ? null
        : Math.round(
            replySamples.reduce((sum, d) => sum + daysBetween(d, now), 0) /
              replySamples.length,
          );

    return {
      total,
      responseRate: pct(movedPastApplied, total),
      interviewPercent: pct(interviews, total),
      offerPercent: pct(offers, total),
      avgReplyDays,
      rejections,
    };
  }, [applications]);

  return (
    <div className="font-manrope grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-6">
      <StatCard
        label="Total"
        value={String(stats.total)}
        after="Applications"
      />
      <StatCard label="Response rate" value={stats.responseRate} />
      <StatCard label="Interview" value={stats.interviewPercent} />
      <StatCard label="Offer" value={stats.offerPercent} />
      <StatCard
        label="Avg. Reply"
        value={stats.avgReplyDays === null ? "—" : `${stats.avgReplyDays} d`}
        hint="after applying"
      />
      <StatCard
        label="Rejections"
        value={stats.rejections.toString()}
        after="Applications"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  after,
  hint,
}: {
  label: string;
  value: string;
  after?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-[#F0F0F0] shadow-sm bg-[#FFFFFF] px-4 py-3">
      <p className="text-xs font-medium text-neutral-600">{label}</p>
      <p
        className={`mt-1 text-2xl font-semibold tabular-nums ${
          label === "Total"
            ? "text-[#111827]"
            : label === "Response rate"
              ? "text-[#0369A1]"
              : label === "Interview"
                ? "text-[#7C3AED]"
                : label === "Offer"
                  ? "text-[#065F46]"
                  : label === "Avg. Reply"
                    ? "text-[#78350F]"
                    : label === "Rejections"
                      ? "text-[#8B0000]"
                      : ""
        }`}
      >
        {value}
      </p>
      <p className="text-[12px]  text-[#D8D9D2]">{after}</p>
      {hint ? (
        <p className="mt-1 text-[11px] leading-snug text-neutral-500">{hint}</p>
      ) : null}
    </div>
  );
}
