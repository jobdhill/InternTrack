import { useMemo } from "react";
import type { Application } from "../types/application";
import { EMPTY_STATUS } from "../types/application";

const NO_RESPONSE_STATUSES = new Set(["", EMPTY_STATUS, "Applied", "Ghosted"]);
const INTERVIEW_PLUS = new Set(["Interview", "Offer"]);

type Props = {
  applications: Application[];
};

function pct(part: number, whole: number): string {
  if (whole === 0) return "—";
  return `${Math.round((part / whole) * 100)}%`;
}

function parseAppliedDate(iso: string): Date | null {
  if (!iso.trim()) return null;
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function startOfWeek(d: Date): Date {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  r.setDate(r.getDate() - r.getDay());
  return r;
}

function addDays(d: Date, days: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + days);
  return r;
}

function fmtMD(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function DashboardCharts({ applications }: Props) {
  return (
    <div className="font-manrope grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
      <PipelineFunnel applications={applications} />
      <ApplicationsPerWeek applications={applications} />
      <ResumePerformance applications={applications} />
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#F0F0F0] shadow-sm bg-white px-4 py-3 flex flex-col min-h-[170px]">
      <p className="text-[10px] font-semibold tracking-widest text-[#9CA3AF] uppercase">
        {title}
      </p>
      <div className="mt-2 flex-1 flex flex-col">{children}</div>
    </div>
  );
}

function PipelineFunnel({ applications }: Props) {
  const stages = useMemo(() => {
    const applied = applications.length;
    const responded = applications.filter(
      (a) => !NO_RESPONSE_STATUSES.has(a.status),
    ).length;
    const interviewPlus = applications.filter((a) =>
      INTERVIEW_PLUS.has(a.status),
    ).length;
    const offer = applications.filter((a) => a.status === "Offer").length;

    return [
      {
        label: "Applied",
        value: applied,
        color: "#9BC4D0",
        percent: null as string | null,
      },
      {
        label: "Responded",
        value: responded,
        color: "#4F95A8",
        percent: pct(responded, applied),
      },
      {
        label: "Interview+",
        value: interviewPlus,
        color: "#2E6E84",
        percent: pct(interviewPlus, applied),
      },
      {
        label: "Offer",
        value: offer,
        color: "#3DB484",
        percent: pct(offer, applied),
      },
    ];
  }, [applications]);

  const maxValue = Math.max(stages[0].value, 1);
  const heightAt = (v: number) => Math.max(10, (v / maxValue) * 70);
  const heights = [
    heightAt(stages[0].value),
    heightAt(stages[1].value),
    heightAt(stages[2].value),
    heightAt(stages[3].value),
    Math.max(8, heightAt(stages[3].value) * 0.5),
  ];

  const W = 400;
  const H = 90;
  const cy = H / 2;
  const segW = W / 4;

  return (
    <ChartCard title="Pipeline funnel">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {stages.map((stage, i) => {
          const x1 = i * segW;
          const x2 = (i + 1) * segW;
          const points = `${x1},${cy - heights[i] / 2} ${x2},${
            cy - heights[i + 1] / 2
          } ${x2},${cy + heights[i + 1] / 2} ${x1},${cy + heights[i] / 2}`;
          return (
            <g key={stage.label}>
              <polygon points={points} fill={stage.color} />
              <text
                x={x1 + segW / 2}
                y={cy + 5}
                textAnchor="middle"
                fill="white"
                fontWeight="600"
                fontSize="14"
              >
                {stage.value}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 grid grid-cols-4 text-center">
        {stages.map((s) => (
          <div key={s.label}>
            <div className="text-[11px] font-medium text-[#374151]">
              {s.label}
            </div>
            <div className="text-[10px] text-[#9CA3AF] tabular-nums">
              {s.percent ?? "—"}
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

function ApplicationsPerWeek({ applications }: Props) {
  const weeks = useMemo(() => {
    const buckets = new Map<number, number>();
    applications.forEach((a) => {
      const d = parseAppliedDate(a.applied);
      if (!d) return;
      const wk = startOfWeek(d).getTime();
      buckets.set(wk, (buckets.get(wk) ?? 0) + 1);
    });

    const currentWeek = startOfWeek(new Date());
    const result: { date: Date; count: number }[] = [];
    for (let i = 9; i >= 0; i--) {
      const d = addDays(currentWeek, -7 * i);
      result.push({ date: d, count: buckets.get(d.getTime()) ?? 0 });
    }
    return result;
  }, [applications]);

  const maxCount = Math.max(...weeks.map((w) => w.count), 1);

  return (
    <ChartCard title="Applications per week">
      <div className="flex-1 flex flex-col">
        <div className="flex items-end gap-1 h-20">
          {weeks.map((w) => {
            const heightPct = (w.count / maxCount) * 100;
            return (
              <div
                key={w.date.getTime()}
                className="flex-1 flex flex-col items-center justify-end h-full min-w-0"
              >
                <div className="text-[10px] text-[#6B7280] font-medium tabular-nums leading-none mb-0.5 h-3">
                  {w.count > 0 ? w.count : ""}
                </div>
                <div
                  className="w-full bg-[#7C7BD0] rounded-t-sm"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-1 mt-1">
          {weeks.map((w) => (
            <div
              key={w.date.getTime()}
              className="flex-1 text-center text-[9px] text-[#9CA3AF] tabular-nums min-w-0 truncate"
            >
              {fmtMD(w.date)}
            </div>
          ))}
        </div>
        <div className="text-[10px] text-[#9CA3AF] mt-0.5">week starting</div>
      </div>
    </ChartCard>
  );
}

function ResumePerformance({ applications }: Props) {
  const resumes = useMemo(() => {
    const buckets = new Map<string, { total: number; interviews: number }>();
    applications.forEach((a) => {
      const name = a.resume.trim();
      if (!name) return;
      const bucket = buckets.get(name) ?? { total: 0, interviews: 0 };
      bucket.total += 1;
      if (INTERVIEW_PLUS.has(a.status)) bucket.interviews += 1;
      buckets.set(name, bucket);
    });
    return Array.from(buckets.entries())
      .map(([name, b]) => ({
        name,
        total: b.total,
        interviews: b.interviews,
        rate: b.total ? b.interviews / b.total : 0,
      }))
      .sort((a, b) => b.rate - a.rate || b.total - a.total)
      .slice(0, 5);
  }, [applications]);

  const palette = ["#34D399", "#7C7BD0", "#D1D5DB", "#D1D5DB", "#D1D5DB"];

  return (
    <ChartCard title="Resume performance · Interview rate">
      <div className="flex-1 flex flex-col justify-center gap-2.5">
        {resumes.length === 0 ? (
          <div className="text-xs text-[#9CA3AF] text-center py-4">
            Fill in the Resume column to track per-resume interview rate.
          </div>
        ) : (
          resumes.map((r, i) => {
            const pctNum = Math.round(r.rate * 100);
            const isTop = i === 0 && r.interviews > 0;
            return (
              <div key={r.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-3 shrink-0 text-center text-[13px] leading-none text-[#F59E0B]"
                  aria-hidden={!isTop}
                  title={isTop ? "Top performing resume" : undefined}
                >
                  {isTop ? "★" : ""}
                </span>
                <div className="w-20 shrink-0 truncate text-[#374151] font-medium">
                  {r.name}
                </div>
                <div className="flex-1 bg-[#F3F4F6] rounded h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${pctNum}%`,
                      backgroundColor: palette[i] ?? "#D1D5DB",
                    }}
                  />
                </div>
                <div className="text-[#6B7280] tabular-nums whitespace-nowrap">
                  {r.interviews}/{r.total}
                </div>
                <div className="text-[#9CA3AF] tabular-nums w-10 text-right">
                  {pctNum}%
                </div>
              </div>
            );
          })
        )}
      </div>
    </ChartCard>
  );
}
