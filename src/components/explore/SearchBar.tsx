import { useAppStore } from "../../store/useAppStore";
import { SearchIcon, XIcon } from "../icons";

export function SearchBar() {
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-zp-surface border border-zp-line px-4 py-3">
      <SearchIcon size={18} className="text-zp-sub shrink-0" />
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="행사, 장소, 지역, 카테고리 검색"
        className="flex-1 bg-transparent text-sm text-zp-text placeholder:text-zp-sub outline-none min-w-0"
      />
      {searchQuery && (
        <button onClick={() => setSearchQuery("")} className="text-zp-sub shrink-0">
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
}
