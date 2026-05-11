export type StatusFilter =
  | "All"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  onAddRow: () => void;
};

const FILTERS: { label: StatusFilter; activeClass: string }[] = [
  {
    label: "All",
    activeClass: "bg-[#111827] text-white border-[#111827]",
  },
  {
    label: "Applied",
    activeClass: "bg-[#F3F4F6] text-[#374151] border-[#D1D5DB]",
  },
  {
    label: "Interview",
    activeClass: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  },
  {
    label: "Offer",
    activeClass: "bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]",
  },
  {
    label: "Rejected",
    activeClass: "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]",
  },
];

export default function SearchBox({
  value,
  onChange,
  statusFilter,
  onStatusFilterChange,
  onAddRow,
}: SearchBoxProps) {
  return (
    <div className="font-manrope mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍  Search company or role"
        className="bg-white border shadow-sm border-[#E5E7EB] rounded-[10px] w-72 max-w-[280px] h-10 text-sm px-3"
      />
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const isActive = statusFilter === f.label;
          return (
            <button
              key={f.label}
              type="button"
              onClick={() => onStatusFilterChange(f.label)}
              className={`px-3 h-8 text-sm rounded-[10px] border shadow-sm transition-colors ${
                isActive
                  ? f.activeClass
                  : "bg-white text-[#6B7280] border-[#F0F0F0] hover:bg-[#F3F4F6] hover:text-[#374151]"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onAddRow}
        className="ml-auto bg-[#F0F2F4] text-black rounded px-4 py-2 hover:bg-gray-300"
      >
        + Add Application
      </button>
    </div>
  );
}
