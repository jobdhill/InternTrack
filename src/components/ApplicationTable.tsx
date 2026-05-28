import type { Application } from "../types/application";
import { EMPTY_STATUS } from "../types/application";

type Props = {
  applications: Application[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onUpdate: (id: number, changes: Partial<Application>) => void;
  onAddRow: () => void;
};

export default function ApplicationTable({
  applications,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onUpdate,
  onAddRow,
}: Props) {
  const today = new Date().toLocaleDateString("en-CA");
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const rangeStart = totalCount === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(safePage * pageSize, totalCount);
  return (
    <div className="w-full h-full overflow-x-auto space-y-3">
      <div className="rounded-xl shadow-sm overflow-hidden bg-white border border-[#F0F0F0]">
        <table className="w-full border-collapse">
          <thead className="font-manrope text-[#9CA3AF]">
            <tr className=" h-0.5">
              <th className="p-2 text-left  border-b bg-[#FAFAFA] border-[#F0F0F0]">
                #
              </th>
              <th className="p-2 text-left border-b  bg-[#FAFAFA] border-[#F0F0F0]">
                COMPANY
              </th>
              <th className="p-2 text-left border-b  bg-[#FAFAFA] border-[#F0F0F0]">
                ROLE
              </th>
              <th className="p-2 text-left border-b  bg-[#FAFAFA] border-[#F0F0F0]">
                APPLIED
              </th>
              <th className="p-2 text-left border-b bg-[#FAFAFA] border-[#F0F0F0]">
                STATUS
              </th>
              <th className="p-2 text-left border-b bg-[#FAFAFA] border-[#F0F0F0]">
                LOCATION
              </th>
              <th className="p-2 text-left border-b bg-[#FAFAFA] border-[#F0F0F0]">
                RESUME
              </th>
              <th className="p-2 text-left border-b bg-[#FAFAFA] border-[#F0F0F0]">
                NOTES
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-sm text-[#9CA3AF]"
                >
                  No applications match your filters.
                </td>
              </tr>
            ) : null}
            {applications.map((app, idx) => (
              <tr key={app.id} className="bg-white border-[#F7F7F7]">
                <td className="p-1 border-b  text-center border-[#F0F0F0] ">
                  {rangeStart === 0 ? "" : rangeStart + idx}
                </td>

                <td className="p-1 border-b  border-[#F0F0F0]">
                  <input
                    className="w-full p-1"
                    placeholder="Company"
                    value={app.company}
                    onChange={(e) =>
                      onUpdate(app.id, { company: e.target.value })
                    }
                  />
                </td>

                <td className="p-1 border-b  border-[#F0F0F0]">
                  <input
                    className="w-full p-1"
                    placeholder="Role"
                    value={app.role}
                    onChange={(e) => onUpdate(app.id, { role: e.target.value })}
                  />
                </td>

                <td className="p-1 border-b border-[#F0F0F0]">
                  <input
                    type="date"
                    className="w-full p-1"
                    value={app.applied}
                    max={today}
                    onChange={(e) => {
                      const next = e.target.value;
                      if (next && next > today) return;
                      onUpdate(app.id, { applied: next });
                    }}
                  />
                </td>

                <td className="p-1 border-b  border-[#F0F0F0]">
                  <select
                    className={`w-full p-1 ${
                      app.status === "Offer"
                        ? "bg-[#D1FAE5] text-[#065F46]"
                        : app.status === "Rejected"
                          ? "bg-[#FEE2E2] text-[#991B1B]"
                          : app.status === "Applied"
                            ? "bg-[#F3F4F6] text-[#6B7280]"
                            : app.status === "OA"
                              ? "bg-[#FEF3C7] text-[#78350F]"
                              : app.status === "Interview"
                                ? "bg-[#E0F2FE] text-[#0369A1]"
                                : app.status === "Ghosted"
                                  ? "bg-[#FEF3C7] text-[#78350F]"
                                  : ""
                    }`}
                    value={app.status}
                    onChange={(e) =>
                      onUpdate(app.id, { status: e.target.value })
                    }
                  >
                    <option value="">{EMPTY_STATUS}</option>
                    <option>Applied</option>
                    <option>OA</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                    <option>Ghosted</option>
                  </select>
                </td>

                <td className="p-1 border-b  border-[#F0F0F0]">
                  <input
                    className="w-full p-1"
                    placeholder="Location"
                    value={app.location}
                    onChange={(e) =>
                      onUpdate(app.id, { location: e.target.value })
                    }
                  />
                </td>

                <td className="p-1 border-b  border-[#F0F0F0]">
                  <input
                    className="w-full p-1"
                    placeholder="Resume Name"
                    value={app.resume}
                    onChange={(e) =>
                      onUpdate(app.id, { resume: e.target.value })
                    }
                  />
                </td>

                <td className="p-1 border-b  border-[#F0F0F0] align-top">
                  <textarea
                    rows={1}
                    className="w-full p-1 resize-none overflow-y-auto leading-snug"
                    placeholder="---"
                    value={app.notes}
                    ref={(el) => {
                      if (el) {
                        const lineHeight = parseFloat(
                          getComputedStyle(el).lineHeight,
                        );
                        const maxHeight = lineHeight * 5 + 8;
                        el.style.height = "auto";
                        el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
                      }
                    }}
                    onChange={(e) => {
                      const el = e.target;
                      const lineHeight = parseFloat(
                        getComputedStyle(el).lineHeight,
                      );
                      const maxHeight = lineHeight * 5 + 8;
                      el.style.height = "auto";
                      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
                      onUpdate(app.id, { notes: el.value });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onAddRow}
          className="bg-[#F0F2F4] text-black rounded px-4 py-2 hover:bg-gray-300"
        >
          + Add Application
        </button>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
          <span className="tabular-nums">
            {totalCount === 0
              ? "0 applications"
              : `Showing ${rangeStart}\u2013${rangeEnd} of ${totalCount}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onPageChange(safePage - 1)}
              disabled={safePage <= 1}
              className="px-3 h-8 rounded-[10px] border border-[#F0F0F0] bg-white shadow-sm transition-colors hover:bg-[#F3F4F6] hover:text-[#374151] disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#6B7280] disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-2 tabular-nums">
              Page {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => onPageChange(safePage + 1)}
              disabled={safePage >= totalPages}
              className="px-3 h-8 rounded-[10px] border border-[#F0F0F0] bg-white shadow-sm transition-colors hover:bg-[#F3F4F6] hover:text-[#374151] disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#6B7280] disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
