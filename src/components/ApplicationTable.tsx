import type { Application } from "../types/application";
import { EMPTY_STATUS } from "../types/application";

type Props = {
  applications: Application[];
  onUpdate: (id: number, changes: Partial<Application>) => void;
  onAddRow: () => void;
};

export default function ApplicationTable({
  applications,
  onUpdate,
  onAddRow,
}: Props) {
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
            {applications.map((app) => (
              <tr key={app.id} className="bg-white border-[#F7F7F7]">
                <td className="p-1 border-b  text-center border-[#F0F0F0] ">
                  {app.id}
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
                    onChange={(e) =>
                      onUpdate(app.id, { applied: e.target.value })
                    }
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

                <td className="p-1 border-b  border-[#F0F0F0]">
                  <input
                    className="w-full p-1"
                    placeholder="---"
                    value={app.notes}
                    onChange={(e) =>
                      onUpdate(app.id, { notes: e.target.value })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={onAddRow}
        className="bg-[#F0F2F4] text-black rounded px-4 py-2 hover:bg-gray-300"
      >
        + Add Application
      </button>
    </div>
  );
}
