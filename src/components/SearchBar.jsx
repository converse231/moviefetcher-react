import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <div className="flex items-center bg-zinc-100 py-2 px-4 rounded-full mt-3 mb-4">
      <input
        className="placeholder:italic placeholder:text-slate-400 block  w-full bg-transparent rounded-xl  sm:text-lg outline-none"
        placeholder="Search movie..."
        type="text"
        name="search"
      />
      <FiSearch className="text-2xl text-zinc-900" />
    </div>
  );
}

export default SearchBar;
