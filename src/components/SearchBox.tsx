
type SearchBoxProps = {
    value: string
    onChange: (value: string) => void
}


export default function SearchBox({ value, onChange }: SearchBoxProps) {

  return (
    <div className="font-manrope">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍  Search company or role"
        className="bg-[#FFFFFF] border shadow-sm border-[#E5E7EB] rounded-[10px] w-96 h-12 text-sm max-w-[280px] py-[9px] mb-4 px-3"
      ></input>
        <button className="m-4 text-[#6B7280] border border-[#F0F0F0] shadow-sm bg-white rounded-[10px] w-12 h-8 text-center">All</button>
        <button className="m-4 text-[#6B7280] border border-[#F0F0F0] shadow-sm bg-white rounded-[10px] w-16 h-8 text-sm text-center">Applied</button>
        <button className="m-4 text-[#6B7280] border border-[#F0F0F0] shadow-sm bg-white rounded-[10px] w-16 h-8 text-sm text-center">Interview</button>
        <button className="m-4 text-[#6B7280] border border-[#F0F0F0] shadow-sm bg-white rounded-[10px] w-16 h-8 text-center">Offer</button>
        <button className="m-4 text-[#6B7280] border border-[#F0F0F0] shadow-sm bg-white rounded-[10px] w-16 h-8 text-sm text-center hover:bg-gray-600">Rejected</button>
    </div>
  );
}


